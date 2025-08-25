import Geolocation from '@react-native-community/geolocation';
import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  AppState,
  AppStateStatus,
} from 'react-native';
import {
  LocationData,
  LocationError,
  LocationOptions,
  LocationWatchOptions,
  LocationSuccessCallback,
  LocationErrorCallback,
  LocationUpdateCallback,
} from '../types/location';

interface LocationSubscription {
  id: string;
  callback: LocationUpdateCallback;
  options?: LocationWatchOptions;
}

class LocationManager {
  private static instance: LocationManager;
  private lastKnownLocation: LocationData | null = null;
  private watchId: number | null = null;
  private subscribers: LocationSubscription[] = [];
  private isWatching: boolean = false;
  private permissionGranted: boolean | null = null;
  private appStateSubscription: any = null;

  // Default options
  private readonly defaultOptions: LocationOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 10,
    interval: 10000,
    fastestInterval: 5000,
    showLocationDialog: true,
    forceRequestLocation: true,
  };

  private constructor() {
    this.initializeAppStateListener();
    this.loadCachedLocation();
  }

  public static getInstance(): LocationManager {
    if (!LocationManager.instance) {
      LocationManager.instance = new LocationManager();
    }
    return LocationManager.instance;
  }

  /**
   * Initialize app state listener to handle background/foreground transitions
   */
  private initializeAppStateListener(): void {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  /**
   * Handle app state changes
   */
  private handleAppStateChange = (nextAppState: AppStateStatus): void => {
    if (nextAppState === 'active' && this.subscribers.length > 0) {
      // Resume location updates when app becomes active
      this.resumeLocationUpdates();
    } else if (nextAppState === 'background' || nextAppState === 'inactive') {
      // You might want to implement background location tracking here
      // For now, we'll keep the current behavior
    }
  };

  /**
   * Load cached location from storage (you can implement AsyncStorage here)
   */
  private loadCachedLocation(): void {
    // TODO: Implement AsyncStorage to persist last known location
    // For now, this is a placeholder
  }

  /**
   * Save location to cache (you can implement AsyncStorage here)
   */
  private saveLocationToCache(location: LocationData): void {
    // TODO: Implement AsyncStorage to persist last known location
    // For now, just store in memory
    this.lastKnownLocation = location;
  }

  /**
   * Check and request location permissions
   */
  public async requestLocationPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs location access to provide better services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        this.permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
        return this.permissionGranted;
      } else {
        // For iOS, permissions are handled by the system when geolocation is first used
        this.permissionGranted = true;
        return true;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      this.permissionGranted = false;
      return false;
    }
  }

  /**
   * Show permission denied alert with option to open settings
   */
  private showPermissionDeniedAlert(): void {
    Alert.alert(
      'Location Permission Required',
      'This app needs location access to function properly. Please enable location permissions in settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  }

  /**
   * Get current location
   */
  public getCurrentLocation(options?: LocationOptions): Promise<LocationData> {
    return new Promise(async (resolve, reject) => {
      // Check permissions first
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        this.showPermissionDeniedAlert();
        reject({
          code: 1,
          message: 'Location permission denied',
          PERMISSION_DENIED: 1,
        } as LocationError);
        return;
      }

      const finalOptions = { ...this.defaultOptions, ...options };

      Geolocation.getCurrentPosition(
        position => {
          const locationData: LocationData = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitude: position.coords.altitude,
              accuracy: position.coords.accuracy,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              speed: position.coords.speed,
            },
            timestamp: position.timestamp,
          };

          this.saveLocationToCache(locationData);
          resolve(locationData);
        },
        error => {
          console.error('Error getting current location:', error);
          reject({
            code: error.code,
            message: error.message,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          } as LocationError);
        },
        finalOptions,
      );
    });
  }

  /**
   * Get last known location
   */
  public getLastKnownLocation(): LocationData | null {
    return this.lastKnownLocation;
  }

  /**
   * Start watching location updates
   */
  public watchLocation(
    callback: LocationUpdateCallback,
    options?: LocationWatchOptions,
  ): string {
    const subscriptionId = Date.now().toString() + Math.random().toString();

    this.subscribers.push({
      id: subscriptionId,
      callback,
      options,
    });

    this.startLocationWatch();
    return subscriptionId;
  }

  /**
   * Stop watching location for a specific subscription
   */
  public clearWatch(subscriptionId: string): void {
    this.subscribers = this.subscribers.filter(
      sub => sub.id !== subscriptionId,
    );

    if (this.subscribers.length === 0) {
      this.stopLocationWatch();
    }
  }

  /**
   * Stop all location watching
   */
  public clearAllWatches(): void {
    this.subscribers = [];
    this.stopLocationWatch();
  }

  /**
   * Start the actual location watching
   */
  private async startLocationWatch(): Promise<void> {
    if (this.isWatching || this.subscribers.length === 0) {
      return;
    }

    // Check permissions first
    const hasPermission = await this.requestLocationPermission();
    if (!hasPermission) {
      this.showPermissionDeniedAlert();
      return;
    }

    // Use the most restrictive options from all subscribers
    const mergedOptions = this.mergeWatchOptions();

    this.watchId = Geolocation.watchPosition(
      position => {
        const locationData: LocationData = {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
          },
          timestamp: position.timestamp,
        };

        this.saveLocationToCache(locationData);

        // Notify all subscribers
        this.subscribers.forEach(subscription => {
          subscription.callback(locationData);
        });
      },
      error => {
        console.error('Error watching location:', error);
        // You might want to retry or handle errors differently
      },
      mergedOptions,
    );

    this.isWatching = true;
  }

  /**
   * Stop location watching
   */
  private stopLocationWatch(): void {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.isWatching = false;
  }

  /**
   * Resume location updates (useful when app comes back to foreground)
   */
  private resumeLocationUpdates(): void {
    if (this.subscribers.length > 0 && !this.isWatching) {
      this.startLocationWatch();
    }
  }

  /**
   * Merge options from all subscribers to get the most appropriate settings
   */
  private mergeWatchOptions(): LocationWatchOptions {
    const merged = { ...this.defaultOptions };

    this.subscribers.forEach(subscription => {
      if (subscription.options) {
        // Use the highest accuracy requirement
        if (subscription.options.enableHighAccuracy) {
          merged.enableHighAccuracy = true;
        }

        // Use the shortest timeout
        if (
          subscription.options.timeout &&
          (!merged.timeout || subscription.options.timeout < merged.timeout)
        ) {
          merged.timeout = subscription.options.timeout;
        }

        // Use the shortest maximum age
        if (
          subscription.options.maximumAge &&
          (!merged.maximumAge ||
            subscription.options.maximumAge < merged.maximumAge)
        ) {
          merged.maximumAge = subscription.options.maximumAge;
        }

        // Use the smallest distance filter
        if (
          subscription.options.distanceFilter &&
          (!merged.distanceFilter ||
            subscription.options.distanceFilter < merged.distanceFilter)
        ) {
          merged.distanceFilter = subscription.options.distanceFilter;
        }
      }
    });

    return merged;
  }

  /**
   * Get the distance between two coordinates (Haversine formula)
   */
  public static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  /**
   * Check if location services are enabled
   */
  public isLocationEnabled(): Promise<boolean> {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false),
        { timeout: 1000, maximumAge: 0 },
      );
    });
  }

  /**
   * Get current location status
   */
  public getLocationStatus(): {
    hasPermission: boolean | null;
    isWatching: boolean;
    lastKnownLocation: LocationData | null;
    subscribersCount: number;
  } {
    return {
      hasPermission: this.permissionGranted,
      isWatching: this.isWatching,
      lastKnownLocation: this.lastKnownLocation,
      subscribersCount: this.subscribers.length,
    };
  }

  /**
   * Cleanup method to call when the app is being destroyed
   */
  public destroy(): void {
    this.clearAllWatches();
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }
  }
}

export default LocationManager;


# LocationManager Documentation

## Overview

The LocationManager is a singleton class that provides comprehensive location services for your React Native app. It handles permissions, location tracking, caching, and provides both imperative and React hook-based APIs.

## Features

- ✅ Singleton pattern - single instance across the app
- ✅ Get current location
- ✅ Get last known location (cached)
- ✅ Real-time location updates with subscriptions
- ✅ Automatic permission handling
- ✅ Background/foreground state management
- ✅ Error handling and user feedback
- ✅ Distance calculation utilities
- ✅ TypeScript support with comprehensive types
- ✅ React Hook for easy component integration

## Installation

The LocationManager uses `@react-native-community/geolocation` which should already be installed. The location permissions are already configured in your Android and iOS manifests.

## Basic Usage

### 1. Using the LocationManager Directly

```typescript
import LocationManager from '../utils/LocationManager';

const locationManager = LocationManager.getInstance();

// Get current location
try {
  const location = await locationManager.getCurrentLocation();
  console.log('Current location:', location);
} catch (error) {
  console.error('Location error:', error);
}

// Get last known location
const lastLocation = locationManager.getLastKnownLocation();

// Watch location updates
const watchId = locationManager.watchLocation(
  location => {
    console.log('Location update:', location);
  },
  {
    enableHighAccuracy: true,
    distanceFilter: 10, // meters
  },
);

// Stop watching
locationManager.clearWatch(watchId);
```

### 2. Using the React Hook

```typescript
import { useLocation } from '../hooks/useLocation';

const MyComponent = () => {
  const {
    location,
    lastKnownLocation,
    error,
    loading,
    getCurrentLocation,
    startWatching,
    stopWatching,
    isWatching,
  } = useLocation();

  return (
    <View>
      <Text>
        Current:{' '}
        {location
          ? `${location.coords.latitude}, ${location.coords.longitude}`
          : 'No location'}
      </Text>
      <Button
        title="Get Location"
        onPress={getCurrentLocation}
        disabled={loading}
      />
      <Button
        title={isWatching ? 'Stop Watching' : 'Start Watching'}
        onPress={isWatching ? stopWatching : startWatching}
      />
    </View>
  );
};
```

## API Reference

### LocationManager Methods

#### `getInstance(): LocationManager`

Returns the singleton instance of LocationManager.

#### `getCurrentLocation(options?: LocationOptions): Promise<LocationData>`

Gets the current location.

**Parameters:**

- `options` (optional): Configuration options for location request

**Returns:** Promise that resolves to LocationData

#### `getLastKnownLocation(): LocationData | null`

Returns the last known cached location.

#### `watchLocation(callback: LocationUpdateCallback, options?: LocationWatchOptions): string`

Starts watching for location updates.

**Parameters:**

- `callback`: Function called with each location update
- `options` (optional): Configuration options for watching

**Returns:** Subscription ID (string) for canceling the watch

#### `clearWatch(subscriptionId: string): void`

Stops watching for a specific subscription.

#### `clearAllWatches(): void`

Stops all location watching.

#### `requestLocationPermission(): Promise<boolean>`

Requests location permission from the user.

#### `isLocationEnabled(): Promise<boolean>`

Checks if location services are enabled.

#### `getLocationStatus()`

Returns current status including permissions, watching state, etc.

#### `static calculateDistance(lat1, lon1, lat2, lon2): number`

Calculates distance between two coordinates in kilometers.

### Types

#### LocationData

```typescript
interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
}
```

#### LocationOptions

```typescript
interface LocationOptions {
  enableHighAccuracy?: boolean; // Default: true
  timeout?: number; // Default: 15000ms
  maximumAge?: number; // Default: 10000ms
  distanceFilter?: number; // Default: 10m
  interval?: number; // Default: 10000ms
  fastestInterval?: number; // Default: 5000ms
  showLocationDialog?: boolean; // Default: true
  forceRequestLocation?: boolean; // Default: true
}
```

## Configuration Options

### High Accuracy vs Battery Life

```typescript
// High accuracy (uses GPS, more battery usage)
const highAccuracyOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 5000,
  distanceFilter: 5,
};

// Battery optimized (uses network/cell towers, less accurate)
const batteryOptimizedOptions = {
  enableHighAccuracy: false,
  timeout: 30000,
  maximumAge: 60000,
  distanceFilter: 50,
};
```

### Real-time Tracking

```typescript
// For real-time tracking (like during a ride)
const realTimeOptions = {
  enableHighAccuracy: true,
  distanceFilter: 5, // Update every 5 meters
  interval: 5000, // Update every 5 seconds
  fastestInterval: 2000, // But no faster than 2 seconds
};
```

### Background Location (Coming Soon)

Currently, the LocationManager handles foreground location tracking. Background location tracking can be added by implementing:

1. Background location permissions
2. Foreground service for Android
3. Background app refresh for iOS

## Error Handling

The LocationManager provides comprehensive error handling:

```typescript
try {
  const location = await locationManager.getCurrentLocation();
} catch (error) {
  switch (error.code) {
    case 1: // PERMISSION_DENIED
      // Handle permission denied
      break;
    case 2: // POSITION_UNAVAILABLE
      // Handle location unavailable
      break;
    case 3: // TIMEOUT
      // Handle timeout
      break;
  }
}
```

## Best Practices

1. **Request permissions early**: Call `requestLocationPermission()` when the app starts
2. **Handle errors gracefully**: Always wrap location calls in try-catch
3. **Clean up subscriptions**: Clear watches when components unmount
4. **Use appropriate accuracy**: Don't use high accuracy if not needed
5. **Cache locations**: Use `getLastKnownLocation()` for quick access
6. **Battery optimization**: Use larger distance filters for background tracking

## Permissions

### Android

The following permissions are already configured in `AndroidManifest.xml`:

- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`

### iOS

The following permissions are already configured in `Info.plist`:

- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`
- `NSLocationAlwaysUsageDescription`

## Troubleshooting

### Location not updating on Android

1. Ensure location services are enabled in device settings
2. Check that your app has location permissions
3. Try increasing the `timeout` value
4. Use `forceRequestLocation: true` in options

### High battery usage

1. Decrease location accuracy: `enableHighAccuracy: false`
2. Increase distance filter: `distanceFilter: 50` (meters)
3. Increase update intervals: `interval: 30000` (30 seconds)

### Permission denied

1. Check device location settings
2. Reinstall the app if permissions are permanently denied
3. Guide users to device settings to enable permissions

## Example Implementation

Check `/src/examples/LocationManagerExample.tsx` for a complete working example showing all features of the LocationManager.


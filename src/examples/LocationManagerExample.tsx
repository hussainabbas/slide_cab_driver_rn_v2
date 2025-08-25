import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import LocationManager from '../utils/LocationManager';
import { LocationData, LocationError } from '../types/location';

const LocationManagerExample: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null,
  );
  const [lastKnownLocation, setLastKnownLocation] =
    useState<LocationData | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [locationUpdates, setLocationUpdates] = useState<LocationData[]>([]);

  const locationManager = LocationManager.getInstance();

  useEffect(() => {
    // Get last known location on component mount
    const lastLocation = locationManager.getLastKnownLocation();
    setLastKnownLocation(lastLocation);

    // Cleanup on unmount
    return () => {
      if (watchId) {
        locationManager.clearWatch(watchId);
      }
    };
  }, []);

  const getCurrentLocation = async () => {
    try {
      const location = await locationManager.getCurrentLocation({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });

      setCurrentLocation(location);
      Alert.alert(
        'Current Location',
        `Lat: ${location.coords.latitude.toFixed(
          6,
        )}, Lng: ${location.coords.longitude.toFixed(6)}`,
      );
    } catch (error) {
      const locationError = error as LocationError;
      Alert.alert('Location Error', locationError.message);
    }
  };

  const startWatchingLocation = () => {
    if (isWatching) return;

    const id = locationManager.watchLocation(
      (location: LocationData) => {
        console.log('Location update received:', location);
        setLocationUpdates(prev => [...prev.slice(-4), location]); // Keep last 5 updates
        setCurrentLocation(location);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Minimum distance change (meters) to trigger update
        interval: 10000, // Update interval (milliseconds)
      },
    );

    setWatchId(id);
    setIsWatching(true);
  };

  const stopWatchingLocation = () => {
    if (!isWatching || !watchId) return;

    locationManager.clearWatch(watchId);
    setWatchId(null);
    setIsWatching(false);
  };

  const getLocationStatus = () => {
    const status = locationManager.getLocationStatus();
    Alert.alert(
      'Location Status',
      `Permission: ${status.hasPermission}\nWatching: ${status.isWatching}\nSubscribers: ${status.subscribersCount}`,
    );
  };

  const formatLocation = (location: LocationData | null) => {
    if (!location) return 'No location data';

    return `Lat: ${location.coords.latitude.toFixed(
      6,
    )}\nLng: ${location.coords.longitude.toFixed(
      6,
    )}\nAccuracy: ${location.coords.accuracy?.toFixed(2)}m\nTime: ${new Date(
      location.timestamp,
    ).toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Manager Example</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last Known Location:</Text>
        <Text style={styles.locationText}>
          {formatLocation(lastKnownLocation)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Location:</Text>
        <Text style={styles.locationText}>
          {formatLocation(currentLocation)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Get Current Location" onPress={getCurrentLocation} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={isWatching ? 'Stop Watching' : 'Start Watching'}
          onPress={isWatching ? stopWatchingLocation : startWatchingLocation}
          color={isWatching ? 'red' : 'green'}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Location Status"
          onPress={getLocationStatus}
          color="orange"
        />
      </View>

      {locationUpdates.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Updates:</Text>
          {locationUpdates.map((update, index) => (
            <Text key={index} style={styles.updateText}>
              {`${index + 1}. ${new Date(
                update.timestamp,
              ).toLocaleTimeString()} - ${update.coords.latitude.toFixed(
                4,
              )}, ${update.coords.longitude.toFixed(4)}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginVertical: 5,
  },
  updateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});

export default LocationManagerExample;


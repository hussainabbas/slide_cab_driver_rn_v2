import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { setOnlineStatus } from '../../redux/slices/driverSlice';
import { colors, dimensions } from '../../utils/resources';
import { useLocation } from '../../hooks/useLocation';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
  openDrawer?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, openDrawer }) => {
  const dispatch = useDispatch();
  const { isOnline, currentTrip } = useSelector(
    (state: RootState) => state.driver,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const { location, startWatching, stopWatching, isWatching } = useLocation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 55.8642,
    longitude: -4.2518, // Glasgow coordinates as default
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (isOnline && !isWatching) {
      startWatching({
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
      });
    } else if (!isOnline && isWatching) {
      stopWatching();
    }

    return () => {
      if (isWatching) {
        stopWatching();
      }
    };
  }, [isOnline, isWatching, startWatching, stopWatching]);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const toggleOnlineStatus = () => {
    if (!isOnline && !location) {
      Alert.alert(
        'Location Required',
        'Please enable location services to go online.',
        [{ text: 'OK' }],
      );
      return;
    }
    dispatch(setOnlineStatus(!isOnline));
  };

  const handleOpenDrawer = () => {
    if (openDrawer) {
      openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={isOnline}
        mapType="standard"
        customMapStyle={darkMapStyle}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor={isOnline ? colors.success : colors.error}
          />
        )}
      </MapView>

      {/* Top Header */}
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleOpenDrawer}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'D'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Online/Offline Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.onlineToggle,
            { backgroundColor: isOnline ? colors.success : colors.white },
          ]}
          onPress={toggleOnlineStatus}
        >
          <Text
            style={[
              styles.toggleText,
              { color: isOnline ? colors.white : colors.textPrimary },
            ]}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <View
            style={[
              styles.toggleSwitch,
              { backgroundColor: isOnline ? colors.white : colors.success },
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Cards */}
      {currentTrip && (
        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>Current Trip</Text>
          <Text style={styles.tripInfo}>Trip ID: {currentTrip.id}</Text>
          <Text style={styles.tripInfo}>
            Destination: {currentTrip.destination}
          </Text>
          <TouchableOpacity style={styles.tripButton}>
            <Text style={styles.tripButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {!currentTrip && isOnline && (
        <View style={styles.bottomCard}>
          <View style={styles.waitingContainer}>
            <View style={styles.pulseCircle} />
            <Text style={styles.waitingText}>Searching for rides...</Text>
          </View>
        </View>
      )}

      {!isOnline && (
        <View style={styles.bottomCard}>
          <Text style={styles.offlineText}>You're offline</Text>
          <Text style={styles.offlineSubtext}>
            Go online to start receiving trip requests
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  map: {
    width: width,
    height: height,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.lg,
    paddingTop: dimensions.spacing.md,
  },
  menuButton: {
    zIndex: 1001,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  toggleContainer: {
    position: 'absolute',
    top: 120,
    right: dimensions.spacing.lg,
    zIndex: 1000,
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.md,
    paddingVertical: dimensions.spacing.sm,
    borderRadius: 25,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 100,
    justifyContent: 'space-between',
  },
  toggleText: {
    fontSize: dimensions.fontSize.md,
    fontWeight: '600',
    marginRight: dimensions.spacing.sm,
  },
  toggleSwitch: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: dimensions.spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  cardTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: dimensions.spacing.sm,
    color: colors.textPrimary,
  },
  tripInfo: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.spacing.xs,
  },
  tripButton: {
    backgroundColor: colors.primary,
    padding: dimensions.spacing.md,
    borderRadius: dimensions.borderRadius.md,
    marginTop: dimensions.spacing.md,
    alignItems: 'center',
  },
  tripButtonText: {
    color: colors.white,
    fontSize: dimensions.fontSize.md,
    fontWeight: '600',
  },
  waitingContainer: {
    alignItems: 'center',
    paddingVertical: dimensions.spacing.md,
  },
  pulseCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.success,
    opacity: 0.3,
    marginBottom: dimensions.spacing.md,
  },
  waitingText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  offlineText: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: dimensions.spacing.sm,
  },
  offlineSubtext: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

// Dark map style for night mode
const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

export default HomeScreen;

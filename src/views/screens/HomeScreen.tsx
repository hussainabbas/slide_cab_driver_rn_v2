import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setOnlineStatus } from '../../redux/slices/driverSlice';
import { colors, dimensions } from '../../utils/resources';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { isOnline, status, currentTrip } = useSelector(
    (state: RootState) => state.driver,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleOnlineStatus = () => {
    dispatch(setOnlineStatus(!isOnline));
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return colors.online;
      case 'busy':
        return colors.busy;
      case 'offline':
        return colors.offline;
      default:
        return colors.idle;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'Driver'}!</Text>
        <View
          style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
        >
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.cardTitle}>Driver Status</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: isOnline ? colors.error : colors.success },
            ]}
            onPress={toggleOnlineStatus}
          >
            <Text style={styles.toggleButtonText}>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Text>
          </TouchableOpacity>
        </View>

        {currentTrip && (
          <View style={styles.tripCard}>
            <Text style={styles.cardTitle}>Current Trip</Text>
            <Text style={styles.tripInfo}>Trip ID: {currentTrip.id}</Text>
            <Text style={styles.tripInfo}>
              Destination: {currentTrip.destination}
            </Text>
          </View>
        )}

        {!currentTrip && isOnline && (
          <View style={styles.waitingCard}>
            <Text style={styles.waitingText}>Waiting for trip requests...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dimensions.spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  greeting: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: dimensions.spacing.md,
    paddingVertical: dimensions.spacing.xs,
    borderRadius: dimensions.borderRadius.round,
  },
  statusText: {
    color: colors.white,
    fontSize: dimensions.fontSize.xs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: dimensions.spacing.lg,
  },
  statusCard: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.spacing.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: dimensions.spacing.md,
    color: colors.textPrimary,
  },
  toggleButton: {
    height: dimensions.buttonHeight,
    borderRadius: dimensions.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: colors.white,
    fontSize: dimensions.fontSize.md,
    fontWeight: 'bold',
  },
  tripCard: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
    marginBottom: dimensions.spacing.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripInfo: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.spacing.xs,
  },
  waitingCard: {
    backgroundColor: colors.primaryLight,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
    alignItems: 'center',
  },
  waitingText: {
    fontSize: dimensions.fontSize.md,
    color: colors.primary,
    textAlign: 'center',
  },
});

export default HomeScreen;

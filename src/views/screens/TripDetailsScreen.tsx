import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../navigations/MainNavigator';
import { colors, dimensions } from '../../utils/resources';

type TripDetailsRouteProp = RouteProp<MainStackParamList, 'TripDetails'>;

const TripDetailsScreen: React.FC = () => {
  const route = useRoute<TripDetailsRouteProp>();
  const navigation = useNavigation();
  const { tripId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.tripCard}>
          <Text style={styles.cardTitle}>Trip Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Trip ID:</Text>
            <Text style={styles.value}>{tripId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>Completed</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Distance:</Text>
            <Text style={styles.value}>5.2 km</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>18 minutes</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fare:</Text>
            <Text style={[styles.value, styles.fare]}>$12.50</Text>
          </View>
        </View>

        <View style={styles.customerCard}>
          <Text style={styles.cardTitle}>Customer Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.value}>4.8 ⭐</Text>
          </View>
        </View>

        <View style={styles.routeCard}>
          <Text style={styles.cardTitle}>Route Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>123 Main St</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>456 Oak Ave</Text>
          </View>
        </View>
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
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  backButton: {
    fontSize: dimensions.fontSize.md,
    color: colors.primary,
    marginRight: dimensions.spacing.md,
  },
  headerTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: dimensions.spacing.lg,
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
  customerCard: {
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
  routeCard: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderRadius: dimensions.borderRadius.md,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.spacing.sm,
  },
  label: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
  },
  value: {
    fontSize: dimensions.fontSize.md,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  fare: {
    color: colors.success,
    fontWeight: 'bold',
  },
});

export default TripDetailsScreen;

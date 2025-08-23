import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { resetDriverState } from '../../redux/slices/driverSlice';
import { colors, dimensions } from '../../utils/resources';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          dispatch(resetDriverState());
        },
      },
    ]);
  };

  const ProfileItem: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <View style={styles.profileItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Driver Information</Text>
          <ProfileItem label="Name" value={user?.name || 'N/A'} />
          <ProfileItem label="Email" value={user?.email || 'N/A'} />
          <ProfileItem label="Phone" value={user?.phone || 'N/A'} />
          <ProfileItem
            label="License Number"
            value={user?.licenseNumber || 'N/A'}
          />
        </View>

        <View style={styles.actionCard}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Vehicle Information</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Documents</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.actionButtonText, styles.logoutText]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  headerTitle: {
    fontSize: dimensions.fontSize.title,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: dimensions.spacing.lg,
  },
  profileCard: {
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
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: dimensions.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
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
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: dimensions.borderRadius.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButton: {
    padding: dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  actionButtonText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textPrimary,
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: colors.error,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { colors, dimensions } from '../utils/resources';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isOnline, status } = useSelector((state: RootState) => state.driver);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const menuItems = [
    { label: 'Home', icon: '🏠', route: 'Home' },
    { label: 'Earnings', icon: '💰', route: 'Earnings' },
    { label: 'Trip History', icon: '📋', route: 'TripHistory' },
    { label: 'Profile', icon: '👤', route: 'Profile' },
    { label: 'Settings', icon: '⚙️', route: 'Settings' },
    { label: 'Help & Support', icon: '❓', route: 'Support' },
  ];

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return colors.success;
      case 'busy':
        return colors.warning;
      case 'offline':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'D'}
              </Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor() },
              ]}
            />
          </View>
          <Text style={styles.userName}>{user?.name || 'Driver Name'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+1234567890'}</Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {isOnline ? '● Online' : '● Offline'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.route === 'Home') {
                  props.navigation.closeDrawer();
                } else {
                  props.navigation.navigate(item.route as any);
                }
              }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileSection: {
    padding: dimensions.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: dimensions.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.white,
  },
  userName: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: dimensions.spacing.xs,
  },
  userPhone: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.spacing.sm,
  },
  statusContainer: {
    paddingHorizontal: dimensions.spacing.md,
    paddingVertical: dimensions.spacing.xs,
    backgroundColor: colors.backgroundLight,
    borderRadius: dimensions.borderRadius.md,
  },
  statusText: {
    fontSize: dimensions.fontSize.sm,
    fontWeight: '600',
  },
  menuSection: {
    flex: 1,
    paddingTop: dimensions.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.xl,
    paddingVertical: dimensions.spacing.md,
    marginHorizontal: dimensions.spacing.md,
    borderRadius: dimensions.borderRadius.md,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: dimensions.spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: dimensions.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    padding: dimensions.spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dimensions.spacing.md,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: dimensions.spacing.md,
    width: 24,
    textAlign: 'center',
  },
  logoutText: {
    fontSize: dimensions.fontSize.md,
    color: colors.error,
    fontWeight: '500',
  },
});

export default DrawerContent;


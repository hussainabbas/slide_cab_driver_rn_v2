import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Modal } from 'react-native';
import HomeScreen from '../views/screens/HomeScreen';
import EarningsScreen from '../views/screens/EarningsScreen';
import ProfileScreen from '../views/screens/ProfileScreen';
import TripDetailsScreen from '../views/screens/TripDetailsScreen';
import DrawerContent from '../components/DrawerContent';

export type MainStackParamList = {
  Home: undefined;
  Earnings: undefined;
  Profile: undefined;
  TripHistory: undefined;
  Settings: undefined;
  Support: undefined;
  TripDetails: { tripId: string };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} openDrawer={openDrawer} />}
        </Stack.Screen>
        <Stack.Screen name="Earnings" component={EarningsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TripHistory" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={ProfileScreen} />
        <Stack.Screen name="Support" component={ProfileScreen} />
        <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      </Stack.Navigator>

      <Modal
        visible={drawerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDrawer}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '75%', backgroundColor: 'white' }}>
            <DrawerContent
              navigation={{
                navigate: (screen: string) => {
                  closeDrawer();
                  // Handle navigation here
                },
                closeDrawer,
              }}
            />
          </View>
          <View 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onTouchEnd={closeDrawer}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MainNavigator;

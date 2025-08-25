import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

// Firebase Cloud Messaging configuration
export const requestUserPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  return false;
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    }
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const setupNotificationListeners = () => {
  // Handle notification when app is in background
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Handle notification when app is in foreground
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    // You can show a local notification here or update app state
  });

  // Handle notification when app is opened from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });

  // Handle notification when app is opened from background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });
};

// Firebase Crashlytics configuration
export const setCrashlyticsUser = (userId: string) => {
  crashlytics().setUserId(userId);
};

export const logCrashlyticsEvent = (event: string, attributes?: object) => {
  crashlytics().log(event);
  if (attributes) {
    crashlytics().setAttributes(attributes);
  }
};

export const recordCrashlyticsError = (error: Error) => {
  crashlytics().recordError(error);
};



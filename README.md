# Slide Cab Driver App

A comprehensive React Native application for ride-hailing drivers built with modern technologies and best practices.

## 🏗️ Project Structure

```
src/
├── assets/
│   ├── fonts/           # Custom fonts
│   ├── images/          # Static images
│   └── svgs/           # SVG files
├── components/         # Reusable UI components
├── models/            # TypeScript interfaces and types
├── navigations/       # Navigation configuration
├── redux/
│   ├── api/           # RTK Query API slices
│   ├── slices/        # Redux Toolkit slices
│   └── store/         # Store configuration
├── utils/
│   └── resources/     # Colors, dimensions, constants
└── views/
    ├── popups/        # Modal/popup components
    └── screens/       # App screens
```

## 📱 Features

- **Authentication**: Login/Register screens with Redux state management
- **Driver Status**: Online/Offline toggle functionality
- **Real-time Location**: GPS tracking and location updates
- **Earnings**: Track daily and total earnings
- **Navigation**: Multi-level navigation with tabs and stacks
- **Firebase Integration**: Push notifications and crash reporting
- **Maps Integration**: Google Maps with location services
- **MQTT**: Real-time communication
- **Modern UI**: Responsive design with consistent styling

## 🚀 Technologies Used

- **React Native 0.81**
- **TypeScript**
- **Redux Toolkit** - State management
- **RTK Query** - API calls and caching
- **React Navigation** - Navigation solution
- **Firebase** - Push notifications, analytics, crashlytics
- **React Native Maps** - Map integration
- **React Native SVG** - SVG support
- **MQTT** - Real-time messaging
- **React Native Toast** - Toast notifications

## 📋 Prerequisites

- Node.js >= 16
- React Native development environment
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd slide_cab_driver_rn2
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   # Note: You may need to use arm64 architecture for M1/M2 Macs
   arch -arm64 pod install
   cd ..
   ```

## 🔧 Configuration

### Firebase Setup

1. **Android Configuration**

   - Add your `google-services.json` file to `android/app/`
   - Update `YOUR_GOOGLE_MAPS_API_KEY` in `android/app/src/main/AndroidManifest.xml`

2. **iOS Configuration**
   - Add your `GoogleService-Info.plist` file to `ios/slide_cab_driver_rn2/`
   - Update Google Maps API key in iOS configuration

### Google Maps API

1. Get API keys from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable required APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API
   - Directions API

### Environment Variables

Create a `.env` file in the root directory:

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
API_BASE_URL=https://your-api-url.com
```

## 🏃‍♂️ Running the App

### Development

```bash
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

### Production Build

```bash
# Android
cd android
./gradlew assembleRelease

# iOS
# Use Xcode to build for production
```

## 📱 App Screens

### Authentication Flow

- **LoginScreen**: Driver login
- **RegisterScreen**: Driver registration

### Main App Flow

- **HomeScreen**: Driver status and trip management
- **EarningsScreen**: View earnings and statistics
- **ProfileScreen**: Driver profile and settings
- **TripDetailsScreen**: Detailed trip information

## 🔑 Key Files to Modify

### API Configuration

- `src/redux/api/apiSlice.ts` - Update base URL and endpoints

### Firebase Configuration

- `src/utils/firebase.ts` - Firebase services setup

### Theme and Styling

- `src/utils/resources/colors.ts` - App color scheme
- `src/utils/resources/dimensions.ts` - Spacing and sizing

### Redux State

- `src/redux/slices/authSlice.ts` - Authentication state
- `src/redux/slices/driverSlice.ts` - Driver-specific state

## 🐛 Known Issues & Solutions

### iOS Pod Installation

If you encounter deployment target issues:

1. Update iOS deployment target to 14.0+ in Podfile
2. Use arm64 architecture for M1/M2 Macs:
   ```bash
   arch -arm64 pod install
   ```

### Firebase Version Compatibility

Firebase dependencies are automatically managed by React Native Firebase. Avoid manually adding Firebase pods to Podfile.

## 📱 Permissions

### Android Permissions (Already Added)

- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `INTERNET`
- `WAKE_LOCK`
- `RECEIVE_BOOT_COMPLETED`
- `VIBRATE`
- `FOREGROUND_SERVICE`
- `POST_NOTIFICATIONS`

### iOS Permissions (Already Added)

- Location services (when in use and always)
- Push notifications
- Camera access
- Photo library access

## 🔄 State Management

The app uses Redux Toolkit with the following structure:

- **Auth Slice**: User authentication state
- **Driver Slice**: Driver status, location, trips, earnings
- **API Slice**: RTK Query for server communication

## 🗺️ Navigation Structure

```
AppNavigator
├── AuthNavigator (when not authenticated)
│   ├── LoginScreen
│   └── RegisterScreen
└── MainNavigator (when authenticated)
    ├── MainTabs
    │   ├── HomeScreen
    │   ├── EarningsScreen
    │   └── ProfileScreen
    └── TripDetailsScreen
```

## 🚧 Next Steps

1. **Add Firebase Configuration Files**

   - `google-services.json` for Android
   - `GoogleService-Info.plist` for iOS

2. **Configure API Endpoints**

   - Update base URL in `src/redux/api/apiSlice.ts`
   - Add your actual API endpoints

3. **Customize UI/UX**

   - Update colors and branding
   - Add your app icons and splash screens

4. **Testing**
   - Run the app on both platforms
   - Test Firebase notifications
   - Test location services

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review React Native and Firebase documentation
3. Check individual library documentation for specific issues

## 📄 License

[Add your license information here]

---

**Built with ❤️ using React Native and modern mobile development practices**

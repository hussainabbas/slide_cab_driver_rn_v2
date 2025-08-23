import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dimensions = {
  // Screen dimensions
  screenWidth: width,
  screenHeight: height,

  // Common spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Border radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 50,
  },

  // Common heights
  buttonHeight: 48,
  inputHeight: 56,
  headerHeight: 56,
  tabBarHeight: 60,

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
    header: 32,
    subtitle: 18,
    body: 16,
    caption: 14,
    button: 18,
  },
};

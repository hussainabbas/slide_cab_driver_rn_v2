import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, dimensions } from '../utils/resources';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      ...styles.baseButton,
      ...styles[size],
    };

    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = colors.transparent;
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = colors.primary;
        break;
      case 'danger':
        baseStyle.backgroundColor = colors.error;
        break;
    }

    if (disabled) {
      baseStyle.backgroundColor = colors.grayLight;
      baseStyle.borderColor = colors.grayLight;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    let baseTextStyle: TextStyle = {
      ...styles.baseText,
      ...styles[`${size}Text` as keyof typeof styles],
    };

    switch (variant) {
      case 'outline':
        baseTextStyle.color = disabled ? colors.textDisabled : colors.primary;
        break;
      default:
        baseTextStyle.color = disabled ? colors.textDisabled : colors.white;
        break;
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: dimensions.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  small: {
    height: 36,
    paddingHorizontal: dimensions.spacing.md,
  },
  medium: {
    height: dimensions.buttonHeight,
    paddingHorizontal: dimensions.spacing.lg,
  },
  large: {
    height: 56,
    paddingHorizontal: dimensions.spacing.xl,
  },
  smallText: {
    fontSize: dimensions.fontSize.sm,
  },
  mediumText: {
    fontSize: dimensions.fontSize.md,
  },
  largeText: {
    fontSize: dimensions.fontSize.lg,
  },
});

export default Button;

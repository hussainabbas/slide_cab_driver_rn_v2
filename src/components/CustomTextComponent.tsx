import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors, dimensions } from '../utils/resources';
import { getFontFamily } from '../utils/fonts';

interface CustomTextProps extends TextProps {
  variant?: 'header' | 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600' | '700';
}

const CustomTextComponent: React.FC<CustomTextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  weight = 'normal',
  style,
  children,
  ...props
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    {
      textAlign: align,
      fontWeight: weight,
      color: color || styles[variant].color,
    },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: getFontFamily('normal'),
  },
  header: {
    fontSize: dimensions.fontSize.header,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: getFontFamily('bold'),
  },
  title: {
    fontSize: dimensions.fontSize.title,
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontFamily: getFontFamily('bold'),
  },
  subtitle: {
    fontSize: dimensions.fontSize.subtitle,
    color: colors.textSecondary,
    fontWeight: '600',
    fontFamily: getFontFamily('bold'),
  },
  body: {
    fontSize: dimensions.fontSize.body,
    color: colors.textPrimary,
    fontWeight: 'normal',
    fontFamily: getFontFamily('normal'),
  },
  caption: {
    fontSize: dimensions.fontSize.caption,
    color: colors.textSecondary,
    fontWeight: 'normal',
    fontFamily: getFontFamily('normal'),
  },
  button: {
    fontSize: dimensions.fontSize.button,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: getFontFamily('normal'),
  },
});

export default CustomTextComponent;

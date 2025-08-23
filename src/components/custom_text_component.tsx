import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { getFontFamily } from '../utils/fonts';

interface TextProps {
  text: string;
  style?: StyleProp<TextStyle>; // Accepts single or array of TextStyle
  numberOfLines?: number; // optional prop for max lines
}

const CustomTextComponent: React.FC<TextProps> = ({
  text,
  style,
  numberOfLines,
}) => {
  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={numberOfLines} // will be undefined if not passed
      ellipsizeMode="tail" // show "..." when truncated
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: getFontFamily('normal'),
    fontWeight: '400',
  },
});

export default CustomTextComponent;

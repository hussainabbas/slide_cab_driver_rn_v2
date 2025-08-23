import React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 60,
  height = 60,
  color = '#3F51B5',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80">
      {/* Car body */}
      <Rect x="15" y="35" width="50" height="20" rx="10" fill={color} />

      {/* Car windows */}
      <Rect x="25" y="25" width="30" height="15" rx="5" fill="#E3F2FD" />

      {/* Wheels */}
      <Circle cx="25" cy="55" r="8" fill="#212121" />
      <Circle cx="55" cy="55" r="8" fill="#212121" />

      {/* Wheel centers */}
      <Circle cx="25" cy="55" r="3" fill="#FFFFFF" />
      <Circle cx="55" cy="55" r="3" fill="#FFFFFF" />

      {/* Headlights */}
      <Circle cx="20" cy="40" r="3" fill="#FFD700" />
      <Circle cx="60" cy="40" r="3" fill="#FFD700" />
    </Svg>
  );
};

export default Logo;

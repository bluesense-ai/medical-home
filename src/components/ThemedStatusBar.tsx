import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface ThemedStatusBarProps extends StatusBarProps {
  variant?: 'primary' | 'secondary' | 'transparent';
}

const ThemedStatusBar: React.FC<ThemedStatusBarProps> = ({
  variant = 'primary',
  ...props
}) => {
  const theme = useTheme(state => state.theme);
  
  const getBarStyle = () => {
    if (theme === 'dark') {
      return 'light-content';
    } else {
      return 'dark-content';
    }
  };
  
  const getBackgroundColor = () => {
    if (variant === 'transparent') return 'transparent';
    
    if (theme === 'dark') {
      switch (variant) {
        case 'primary': return colors.base.darkGray;
        case 'secondary': return colors.alternativeDark.secondary;
        default: return colors.base.darkGray;
      }
    } else {
      switch (variant) {
        case 'primary': return colors.base.white;
        case 'secondary': return colors.alternativeLight.secondary;
        default: return colors.base.white;
      }
    }
  };

  return (
    <StatusBar
      barStyle={getBarStyle()}
      backgroundColor={getBackgroundColor()}
      translucent
      {...props}
    />
  );
};

export default ThemedStatusBar; 
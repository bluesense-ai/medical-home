import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface ThemedCardProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'outlined' | 'blank';
  elevation?: number;
}

const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  style,
  variant = 'primary',
  elevation = 2,
  ...props
}) => {
  const theme = useTheme(state => state.theme);
  
  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: 16,
      padding: 16,
      marginVertical: 8,
      shadowColor: colors.base.black,
      shadowOffset: {
        width: 0,
        height: elevation,
      },
      shadowOpacity: 0.1,
      shadowRadius: elevation * 2,
      elevation: elevation,
    };
    
    if (theme === 'dark') {
      switch (variant) {
        case 'primary':
          return { ...baseStyle, backgroundColor: colors.base.black };
        case 'secondary':
          return { ...baseStyle, backgroundColor: colors.alternativeDark.secondary };
        case 'blank':
          return { backgroundColor: 'transparent' };
        case 'outlined':
          return { 
            ...baseStyle, 
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.base.white,
            shadowOpacity: 0,
            elevation: 0,
          };
        default:
          return { ...baseStyle, backgroundColor: colors.base.black };
      }
    } else {
      switch (variant) {
        case 'primary':
          return { ...baseStyle, backgroundColor: colors.base.white };
        case 'secondary':
          return { ...baseStyle, backgroundColor: colors.alternativeLight.secondary };
        case 'blank':
          return { backgroundColor: 'transparent' };
        case 'outlined':
          return { 
            ...baseStyle, 
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.base.black,
            shadowOpacity: 0,
            elevation: 0,
          };
        default:
          return { ...baseStyle, backgroundColor: colors.base.white };
      }
    }
  };

  return (
    <View
      style={[
        getCardStyle(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedCard; 
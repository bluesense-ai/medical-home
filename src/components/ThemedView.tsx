import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'secondary' | 'card' | 'transparent';
  useSafeArea?: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  variant = 'primary',
  useSafeArea = false,
  ...props
}) => {
  const theme = useTheme(state => state.theme);
  
  const getBackgroundColor = () => {
    if (variant === 'transparent') return 'transparent';
    
    if (theme === 'dark') {
      switch (variant) {
        case 'primary': return colors.base.darkGray;
        case 'secondary': return colors.alternativeDark.secondary;
        case 'card': return colors.base.black;
        default: return colors.base.darkGray;
      }
    } else {
      switch (variant) {
        case 'primary': return colors.base.white;
        case 'secondary': return colors.alternativeLight.secondary;
        case 'card': return colors.base.white;
        default: return colors.base.white;
      }
    }
  };

  const backgroundColor = getBackgroundColor();
  
  return (
    <View
      style={[
        { backgroundColor },
        useSafeArea && styles.safeArea,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 50, // Approximate status bar height
  },
});

export default ThemedView; 
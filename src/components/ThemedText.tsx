import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface ThemedTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'header';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'lightGray';
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  variant = 'body',
  color = 'primary',
  ...props
}) => {
  const theme = useTheme(state => state.theme);
  
  const getTextColor = () => {
    if (theme === 'dark') {
      switch (color) {
        case 'primary': return colors.base.white;
        case 'secondary': return colors.alternativeLight.secondary;
        case 'error': return colors.main.error;
        case 'warning': return colors.main.warning;
        case 'success': return colors.main.success;
        case 'info': return colors.main.info;
        case 'lightGray': return colors.base.lightGray;
        default: return colors.base.white;
      }
    } else {
      switch (color) {
        case 'primary': return colors.base.black;
        case 'secondary': return colors.alternativeDark.secondary;
        case 'error': return colors.main.error;
        case 'warning': return colors.main.warning;
        case 'success': return colors.main.success;
        case 'info': return colors.main.info;
        case 'lightGray': return colors.base.lightGray;
        default: return colors.base.black;
      }
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'header':
        return styles.header;
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[
        getTextStyle(),
        { color: getTextColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default ThemedText; 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface WelcomeHeaderProps {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ title, subtitle, titleColor, subtitleColor }) => {
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: '8%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.base.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.base.black,
    fontWeight: "regular",
  },
});

export default WelcomeHeader; 
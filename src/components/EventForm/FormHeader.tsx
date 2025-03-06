import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

// Form header component props
export interface FormHeaderProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  theme: string;
}

// Form header component
const FormHeader: React.FC<FormHeaderProps> = ({ onCancel, onSubmit, isLoading, theme }) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const iconColor = theme === 'dark' ? colors.base.white : colors.base.black;
  
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={styles.monthText}>January</Text>
      </View>
      <View style={styles.headerRight}>
      </View>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.black,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerIcon: {
    padding: 8,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerIcon: {
    padding: 8,
  },
});

export default FormHeader; 
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
  const iconColor = colors.base.white;
  
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text style={styles.monthText}>January</Text>
      </View>
      <View style={styles.headerRight}>
        <Ionicons name="search" size={24} color={iconColor} />
        <Ionicons name="add" size={24} color={iconColor} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add Event Name</Text>
      </View>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'absolute',
    right: 20,
    top: 40,
  },
  headerIcon: {
    padding: 8,
  },
  titleContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.base.white,
  }
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
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
    position: 'absolute',
    right: 20,
    top: 40,
  },
  headerIcon: {
    padding: 8,
  },
  titleContainer: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.base.white,
  }
});

export default FormHeader; 
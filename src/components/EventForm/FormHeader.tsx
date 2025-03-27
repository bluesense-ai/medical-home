import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

/**
 * FormHeader component props interface
 * @property {Function} onCancel - Function to call when back button is pressed
 * @property {Function} onSubmit - Function to call when form is submitted
 * @property {boolean} isLoading - Whether the form is in loading state
 * @property {string} theme - Current theme ('dark' or 'light')
 * @property {Date} selectedDate - Selected date for the event (used for month display)
 */
export interface FormHeaderProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  theme: string;
  selectedDate?: Date;
}

/**
 * FormHeader component that matches the style of DashboardHeader
 * 
 * This component provides a consistent header with back button and month display
 */
const FormHeader: React.FC<FormHeaderProps> = ({ 
  onCancel, 
  theme,
  selectedDate = new Date()
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const currentMonth = moment(selectedDate).format('MMMM');
  
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.base.white} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}</Text>
      </View>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.main.primary,
    borderBottomWidth: 0
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  backButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.base.white,
    marginLeft: 8,
  }
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.base.darkGray,
    borderBottomWidth: 0
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  backButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.base.white,
    marginLeft: 8,
  }
});

export default FormHeader; 
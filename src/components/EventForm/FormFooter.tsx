import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

/**
 * Form footer component props interface
 * @property {Function} onCancel - Function to call when cancel button is pressed
 * @property {Function} onSubmit - Function to call when submit button is pressed
 * @property {boolean} isLoading - Whether the form is in loading state
 * @property {boolean} isDisabled - Whether the submit button should be disabled
 * @property {string} theme - Current theme ('dark' or 'light')
 */
export interface FormFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  theme: string;
}

/**
 * Form footer component with cancel and submit buttons
 * This component renders at the bottom of the form with two action buttons
 */
const FormFooter: React.FC<FormFooterProps> = ({ 
  onCancel, 
  onSubmit, 
  isLoading, 
  isDisabled, 
  theme 
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  
  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={onCancel}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.addButton, isDisabled && styles.addButtonDisabled]}
        onPress={onSubmit}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.addButtonText}>Add Event</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.main.error,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.main.secondary,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.main.error,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.main.primary,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FormFooter; 
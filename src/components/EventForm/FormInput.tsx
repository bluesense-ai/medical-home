import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

// Form input field props
export interface FormInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  multiline?: boolean;
  numberOfLines?: number;
  theme: string;
  sectionTitle?: string;
}

// Form input field component
const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default', 
  multiline = false, 
  numberOfLines = 1, 
  theme,
  sectionTitle
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const inputStyle = multiline ? [styles.input, styles.textArea] : styles.input;
  
  return (
    <View>
      {sectionTitle && (
        <Text style={[styles.sectionTitle, styles.marginTop]}>{sectionTitle}</Text>
      )}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor={theme === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.base.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    color: colors.base.black,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    color: colors.base.white,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
});

export default FormInput; 
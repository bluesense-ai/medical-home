import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FormInput from '../FormInput';
import { colors } from '../../../theme/colors';

/**
 * Props for PatientInfoSection component
 * @property {string} name - Patient name
 * @property {Function} onNameChange - Function to call when name changes
 * @property {string} email - Patient email
 * @property {Function} onEmailChange - Function to call when email changes
 * @property {string} phone - Patient phone number
 * @property {Function} onPhoneChange - Function to call when phone changes
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface PatientInfoSectionProps {
  name: string;
  onNameChange: (text: string) => void;
  email: string;
  onEmailChange: (text: string) => void;
  phone: string;
  onPhoneChange: (text: string) => void;
  theme: string;
}

/**
 * PatientInfoSection Component
 * 
 * This component provides the UI for managing patient information
 */
const PatientInfoSection: React.FC<PatientInfoSectionProps> = ({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  theme
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkTitle]}>
        Patient Information
      </Text>
      
      <FormInput
        value={name}
        onChangeText={onNameChange}
        placeholder="Patient name"
        theme={theme}
      />
      
      <View style={styles.row}>
        <View style={styles.halfField}>
          <FormInput
            value={email}
            onChangeText={onEmailChange}
            placeholder="Email address"
            keyboardType="email-address"
            theme={theme}
          />
        </View>
        
        <View style={styles.spacer} />
        
        <View style={styles.halfField}>
          <FormInput
            value={phone}
            onChangeText={onPhoneChange}
            placeholder="Phone number"
            keyboardType="phone-pad"
            theme={theme}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
    color: colors.base.black,
  },
  darkTitle: {
    color: colors.base.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    flex: 1,
  },
  spacer: {
    width: 16,
  }
});

export default PatientInfoSection; 
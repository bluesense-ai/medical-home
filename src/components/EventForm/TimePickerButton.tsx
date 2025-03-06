import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import ThemedText from '../ThemedText';
import moment from 'moment';

// Time picker button props
export interface TimePickerButtonProps {
  label: string;
  value: Date;
  onPress: () => void;
  theme: string;
}

// Time picker button component
const TimePickerButton: React.FC<TimePickerButtonProps> = ({ label, value, onPress, theme }) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const iconColor = theme === 'dark' ? colors.base.white : colors.base.black;
  
  return (
    <View style={styles.formGroup}>
      <ThemedText variant="subtitle">{label}</ThemedText>
      <TouchableOpacity 
        style={styles.dateTimeButton}
        onPress={onPress}
      >
        <Ionicons name="time-outline" size={20} color={iconColor} style={{ marginRight: 8 }} />
        <ThemedText variant="body">
          {moment(value).format('h:mm A')}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.base.lightGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: colors.base.white,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.base.darkGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: colors.base.darkGray,
  },
});

export default TimePickerButton; 
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

/**
 * Props for DateTimePicker component
 * @property {string} title - Title of the picker
 * @property {string} time - Selected time
 * @property {Function} onTimeChange - Function to call when time changes
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface DateTimePickerProps {
  title: string;
  time: string;
  onTimeChange: (time: string) => void;
  theme: string;
}

/**
 * DateTimePicker Component
 * 
 * This component provides a time picker interface for selecting
 * event start and end times
 */
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  title,
  time,
  onTimeChange,
  theme
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  
  const handlePress = () => {
    // In a real implementation, this would open the native time picker
    onTimeChange(time);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity 
        style={styles.pickerButton}
        onPress={handlePress}
      >
        <Text style={styles.timeText}>{time}</Text>
        <Ionicons name="time-outline" size={20} color={theme === 'dark' ? colors.base.white : colors.base.black} />
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 12,
    color: colors.base.black,
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  timeText: {
    color: colors.base.black,
    fontSize: 12,
  }
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 12,
    color: colors.base.white,
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeText: {
    color: colors.base.white,
    fontSize: 12,
  }
});

export default DateTimePicker; 
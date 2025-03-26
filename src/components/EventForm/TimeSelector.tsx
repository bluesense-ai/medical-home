import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import moment from 'moment';

// Time selector props
export interface TimeSelectorProps {
  label: string;
  value: Date;
  onPress: () => void;
  theme: string;
}

// Time selector component
const TimeSelector: React.FC<TimeSelectorProps> = ({ label, value, onPress, theme }) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const iconColor = theme === 'dark' ? "black" : "black";
  
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.timeButton}
        onPress={onPress}
      >
        <Text style={styles.timeText}>
          {moment(value).format('h:mm A')}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.base.black,
    marginBottom: 8,
  },
  timeButton: {
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    marginBottom: 12,
  },
  timeText: {
    color: colors.base.black,
    fontSize: 12,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
  },
  timeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.legacy.lightGray,
    marginBottom: 12,
  },
  timeText: {
    color: colors.base.black,
    fontSize: 16,
  },
});

export default TimeSelector; 
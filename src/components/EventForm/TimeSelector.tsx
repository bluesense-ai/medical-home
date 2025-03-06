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
  const iconColor = theme === 'dark' ? "white" : "black";
  
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
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
  },
  timeButton: {
    backgroundColor: colors.base.lightGray,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: colors.base.black,
    fontSize: 16,
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  timeButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: colors.base.white,
    fontSize: 16,
  },
});

export default TimeSelector; 
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TimeSelector from '../TimeSelector';

/**
 * Props for TimeDateSection component
 * @property {Date} startTime - Selected start time
 * @property {Function} onStartTimePress - Function to call when start time is pressed
 * @property {Date} endTime - Selected end time
 * @property {Function} onEndTimePress - Function to call when end time is pressed
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface TimeDateSectionProps {
  startTime: Date;
  onStartTimePress: () => void;
  endTime: Date;
  onEndTimePress: () => void;
  theme: string;
}

/**
 * TimeDateSection Component
 * 
 * This component handles the time selection portion of the form,
 * allowing users to select start and end times for the event
 */
const TimeDateSection: React.FC<TimeDateSectionProps> = ({
  startTime,
  onStartTimePress,
  endTime,
  onEndTimePress,
  theme
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Event Time</Text>
      
      <View style={styles.timeContainer}>
        <TimeSelector
          label="Start"
          value={startTime}
          onPress={onStartTimePress}
          theme={theme}
        />
        
        <TimeSelector
          label="End"
          value={endTime}
          onPress={onEndTimePress}
          theme={theme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,
  }
});

export default TimeDateSection; 
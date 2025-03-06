import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ThemedText from './ThemedText';
import ThemedCard from './ThemedCard';
import moment from 'moment';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface MonthCardProps {
  year: number;
  monthName: string;
  monthIndex: number;
  onPress: (year: number, monthIndex: number) => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MonthCard: React.FC<MonthCardProps> = ({ 
  year, 
  monthName, 
  monthIndex, 
  onPress 
}) => {
  const theme = useTheme(state => state.theme);
  const currentDate = moment();
  const isCurrentMonth = currentDate.month() === monthIndex && currentDate.year() === year;
  const currentDay = currentDate.date();
  
  const renderDays = () => {
    const days = [];
    const firstDay = moment(`${year}-${monthIndex + 1}-01`);
    const startDay = firstDay.day(); // 0 for Sunday, 1 for Monday, etc.
    const totalDays = firstDay.daysInMonth();
    
    // Add empty days at the start
    for (let i = 0; i < startDay; i++) {
      days.push(
        <ThemedText 
          key={`empty-${i}`} 
          style={styles.dayText}
        > </ThemedText>
      );
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      const isToday = isCurrentMonth && i === currentDay;
      days.push(
        <ThemedText 
          key={`day-${i}`} 
          style={[
            styles.dayText,
            isToday && styles.todayText
          ]}
          color={isToday ? 'primary' : 'primary'}
        >
          {i}
        </ThemedText>
      );
    }
    
    // Add empty days to complete the last week
    const remainingDays = 42 - (startDay + totalDays); // 6 weeks * 7 days = 42
    for (let i = 0; i < remainingDays; i++) {
      days.push(
        <ThemedText 
          key={`empty-end-${i}`} 
          style={styles.dayText}
        > </ThemedText>
      );
    }
    
    return days;
  };

  return (
    <TouchableOpacity onPress={() => onPress(year, monthIndex)}>
      <ThemedCard
        variant="blank"
        style={styles.container}
      >
        <ThemedText variant="subtitle" style={styles.monthName}>
          {monthName}
        </ThemedText>
        
        <View style={styles.calendarGrid}>
          <View style={styles.weekDaysRow}>
            {WEEKDAYS.map((day, index) => (
              <ThemedText 
                key={`weekday-${index}`} 
                style={styles.weekDayText}
                color="secondary"
              >
                {day}
              </ThemedText>
            ))}
          </View>
          
          <View style={styles.daysGrid}>
            {renderDays()}
          </View>
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 6,
  },
  monthName: {
    marginBottom: 12,
    textAlign: 'center',
  },
  calendarGrid: {
    width: '100%',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weekDayText: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
  },
  dayText: {
    width: '14%',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 12,
  },
  todayText: {
    fontWeight: 'bold',
  },
});

export default MonthCard; 
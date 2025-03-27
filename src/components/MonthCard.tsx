import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
        <Text 
          key={`empty-${i}`} 
          style={styles.dayText}
        > </Text>
      );
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      const isToday = isCurrentMonth && i === currentDay;
      days.push(
        <Text 
          key={`day-${i}`} 
          style={[
            styles.dayText,
            isToday && styles.todayText
          ]}
        >
          {i}
        </Text>
      );
    }
    
    // Add empty days to complete the last week
    const remainingDays = 42 - (startDay + totalDays); // 6 weeks * 7 days = 42
    for (let i = 0; i < remainingDays; i++) {
      days.push(
        <Text 
          key={`empty-end-${i}`} 
          style={styles.dayText}
        > </Text>
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
        <View style={styles.headerContainer}>
          <Text style={styles.monthName}>
            {monthName}
          </Text>
        </View>
        
        <View style={styles.calendarGrid}>
          <View style={styles.weekDaysRow}>
            {WEEKDAYS.map((day, index) => (
              <Text 
                key={`weekday-${index}`} 
                style={styles.weekDayText}
              >
                {day}
              </Text>
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
  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  monthName: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
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
    color: colors.base.white,
  },
  dayText: {
    width: '14%',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 12,
    color: colors.base.white,
  },
  todayText: {
    fontWeight: 'bold',
    color: colors.main.secondary,
  },
});

export default MonthCard; 
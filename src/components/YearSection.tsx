import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import MonthCard from './MonthCard';
import moment from 'moment';

interface YearSectionProps {
  year: number;
  onMonthSelect: (year: number, monthIndex: number) => void;
}

const YearSection: React.FC<YearSectionProps> = ({ year, onMonthSelect }) => {
  const getMonthsForYear = (year: number) => {
    return [
      { name: 'Jan', days: moment(`${year}-01-01`).daysInMonth() },
      { name: 'Feb', days: moment(`${year}-02-01`).daysInMonth() },
      { name: 'Mar', days: moment(`${year}-03-01`).daysInMonth() },
      { name: 'Apr', days: moment(`${year}-04-01`).daysInMonth() },
      { name: 'May', days: moment(`${year}-05-01`).daysInMonth() },
      { name: 'Jun', days: moment(`${year}-06-01`).daysInMonth() },
      { name: 'Jul', days: moment(`${year}-07-01`).daysInMonth() },
      { name: 'Aug', days: moment(`${year}-08-01`).daysInMonth() },
      { name: 'Sep', days: moment(`${year}-09-01`).daysInMonth() },
      { name: 'Oct', days: moment(`${year}-10-01`).daysInMonth() },
      { name: 'Nov', days: moment(`${year}-11-01`).daysInMonth() },
      { name: 'Dec', days: moment(`${year}-12-01`).daysInMonth() },
    ];
  };

  return (
    <View style={styles.container}>
      <ThemedText variant="header" style={styles.yearTitle}>
        {year}
      </ThemedText>
      
      <View style={styles.monthsGrid}>
        {getMonthsForYear(year).map((month, index) => (
          <View key={`month-${index}`} style={styles.monthItem}>
            <MonthCard
              year={year}
              monthName={month.name}
              monthIndex={index}
              onPress={onMonthSelect}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  yearTitle: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  monthItem: {
    width: '50%',
  },
});

export default YearSection; 
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import moment from 'moment';

type YearlyCalendarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const GRID_MARGIN = 16;
const GRID_GAP = 16;
const CARD_WIDTH = (width - (GRID_MARGIN * 2) - GRID_GAP) / 2;

const YearlyCalendarScreen: React.FC = () => {
  const navigation = useNavigation<YearlyCalendarScreenNavigationProp>();
  const currentYear = moment().year();

  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }, [currentYear]);

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

  const handleMonthSelect = (year: number, monthIndex: number) => {
    const selectedDate = moment(`${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`).format('YYYY-MM-DD');
    navigation.navigate('DashboardEventsScreen', { selectedDate });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.yearText}>Calendar</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMonth = (monthName: string, monthIndex: number, year: number) => {
    const firstDayOfMonth = moment(`${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`);
    const startDay = firstDayOfMonth.day();
    const totalDays = firstDayOfMonth.daysInMonth();
    const days = [];

    // Empty days at the start
    for (let i = 0; i < startDay; i++) {
      days.push(<Text key={`empty-${i}`} style={styles.dayText}> </Text>);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = moment(`${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
      const isToday = currentDate.isSame(moment(), 'day');
      days.push(
        <Text
          key={i}
          style={[
            styles.dayText,
            isToday && styles.todayText,
          ]}
        >
          {i}
        </Text>
      );
    }

    // Add empty days to complete the last week
    const remainingDays = 42 - (startDay + totalDays); // 6 weeks * 7 days = 42
    for (let i = 0; i < remainingDays; i++) {
      days.push(<Text key={`empty-end-${i}`} style={styles.dayText}> </Text>);
    }

    return (
      <TouchableOpacity 
        style={styles.monthContainer} 
        key={`${year}-${monthName}`}
        onPress={() => handleMonthSelect(year, monthIndex)}
      >
        <Text style={styles.monthName}>{monthName}</Text>
        <View style={styles.calendarGrid}>
          <View style={styles.weekDaysRow}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={`header-${index}`} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {days}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderYear = (year: number) => (
    <View key={year} style={styles.yearSection}>
      <Text style={styles.yearSectionTitle}>{year}</Text>
      <View style={styles.monthsGrid}>
        {getMonthsForYear(year).map((month, index) => 
          renderMonth(month.name, index, year)
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.base.darkGray}
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {renderHeader()}
          <ScrollView 
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {years.map(year => renderYear(year))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    flex: 1,
  },
  yearSection: {
    marginBottom: 32,
  },
  yearSectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingHorizontal: GRID_MARGIN,
    paddingVertical: 16,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GRID_MARGIN,
    gap: GRID_GAP,
  },
  monthContainer: {
    width: CARD_WIDTH,
    padding: 12,
  },
  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 16,
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
    justifyContent: 'flex-start',
  },
  weekDayText: {
    width: '14.28%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
  },
  dayText: {
    width: '14.28%',
    textAlign: 'center',
    color: colors.base.white,
    fontSize: 10,
    paddingVertical: 2,
  },
  todayText: {
    color: colors.main.error,
    fontWeight: 'bold',
  },
});

export default YearlyCalendarScreen; 
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, Dimensions, StatusBar, Alert, ActivityIndicator, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import EventForm from '../../components/EventForm';
import useCalendarStore, { Event, EventType } from '../../store/useCalendarStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

const EVENT_COLORS = {
  'urgent': colors.secondary.red,
  'regular': colors.secondary.gray,
  'check-up': colors.secondary.coral,
  'consultation': colors.secondary.lightRed,
} as const;

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    dots?: Array<{color: string}>;
  };
};

type DashboardEventsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type DashboardEventsScreenProps = {
  route?: {
    params?: {
      selectedDate?: string;
    };
  };
};

const DashboardEventsScreen: React.FC<DashboardEventsScreenProps> = ({ route }) => {
  const navigation = useNavigation<DashboardEventsScreenNavigationProp>();
  const [selectedDate, setSelectedDate] = useState<string>(
    route?.params?.selectedDate || moment().format('YYYY-MM-DD')
  );
  const [showEventForm, setShowEventForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { addEvent, getEventsForDate, deleteEvent, events } = useCalendarStore();

  const selectedYear = useMemo(() => moment(selectedDate).year(), [selectedDate]);
  const months = useMemo(() => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ], []);

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = moment(selectedDate).month(monthIndex);
    setSelectedDate(newDate.format('YYYY-MM-DD'));
  };

  const handleDayPress = useCallback((day: any) => {
    setSelectedDate(day.dateString);
  }, [setSelectedDate]);

  const handleCreateEvent = async (eventData: any) => {
    try {
      await addEvent({
        ...eventData,
        startDate: moment(selectedDate)
          .hour(moment(eventData.startDate).hour())
          .minute(moment(eventData.startDate).minute())
          .toDate(),
        endDate: moment(selectedDate)
          .hour(moment(eventData.endDate).hour())
          .minute(moment(eventData.endDate).minute())
          .toDate(),
      });
      setShowEventForm(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const formattedSelectedDate = useMemo(() => {
    return moment(selectedDate).format('YYYY-MM-DD');
  }, [selectedDate]);

  const filteredEvents = getEventsForDate(selectedDate);

  const getMarkedDates = useCallback(() => {
    const marked: any = {};
    events.forEach((event) => {
      const date = moment(event.startDate).format('YYYY-MM-DD');
      if (!marked[date]) {
        marked[date] = {
          dots: [],
          selected: date === selectedDate,
          selectedColor: colors.base.white,
          selectedTextColor: colors.base.black,
        };
      }
      marked[date].dots.push({
        color: event.color,
      });
    });

    // If there are no events on selected date, still show it as selected
    if (!marked[selectedDate]) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: colors.base.white,
        selectedTextColor: colors.base.black,
      };
    }


    return marked;
  }, [events, selectedDate]);

  const handleAddEvent = () => {
    if (!selectedDate) {
      Alert.alert(
        'Warning',
        'Please select a date from the calendar first.',
        [{ text: 'OK', onPress: () => {} }]
      );
      return;
    }
    setShowEventForm(true);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <View style={[styles.eventColor, { backgroundColor: EVENT_COLORS[item.type as EventType] }]} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        {item.notes && <Text style={styles.eventNotes}>Meeting details</Text>}
      </View>
      <View style={styles.eventTimeContainer}>
        <Text style={styles.eventTime}>
          {moment(item.startDate).format('h:mm A')}
        </Text>
        <Text style={styles.eventTime}>
          {moment(item.endDate).format('h:mm A')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('YearlyCalendar')}
          >
            <MaterialCommunityIcons name="view-grid-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleAddEvent}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
          
          <Text style={styles.monthTitle}>
            {moment(selectedDate).format('MMMM')}
          </Text>
          
          <Calendar
            current={formattedSelectedDate}
            onDayPress={handleDayPress}
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: 'rgba(255,255,255,0.5)',
              selectedDayBackgroundColor: '#33C213',
              selectedDayTextColor: colors.base.white,
              todayTextColor: '#33C213',
              dayTextColor: colors.base.white,
              textDisabledColor: 'rgba(255,255,255,0.3)',
              dotColor: colors.base.white,
              selectedDotColor: colors.base.black,
              arrowColor: colors.base.white,
              monthTextColor: colors.base.white,
              textDayFontSize: 12,
              textDayFontWeight: 'semibold',
              'stylesheet.calendar.main': {
                week: {
                  margin: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.base.white,
                  paddingVertical: 8,
                },
                dayContainer: {
                  flex: 1,
                  alignItems: 'center',
                }
              }
            }}
            markingType="multi-dot"
          />

          <View style={styles.eventsList}>
            <FlatList<Event>
              data={filteredEvents}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No events scheduled for this day</Text>
              }
              contentContainerStyle={styles.listContent}
            />
          </View>

          <Modal
            isVisible={showEventForm}
            onBackdropPress={() => setShowEventForm(false)}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <EventForm
                onSubmit={handleCreateEvent}
                onCancel={() => setShowEventForm(false)}
                initialDate={new Date(selectedDate)}
              />
            </View>
          </Modal>

          {isRefreshing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.base.white} />
            </View>
          )}
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
  monthTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  eventsList: {
    flex: 1,
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventColor: {
    width: 4,
    height: '80%',
    alignSelf: 'center',
    borderTopLeftRadius:24,
    borderTopRightRadius:24,
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
  },
  eventInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.base.white,
    marginBottom: 4,
  },
  eventNotes: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  eventTimeContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
  },
  eventTime: {
    fontSize: 14,
    color: colors.base.white,
    opacity: 0.8,
  },
  deleteButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    marginTop: 20,
  },
  listContent: {
    flexGrow: 1,
  },
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#272727',
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default DashboardEventsScreen; 
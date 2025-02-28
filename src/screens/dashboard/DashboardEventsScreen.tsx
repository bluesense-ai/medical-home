import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, StatusBar, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';
import useCalendar from '../../hooks/useCalendar';
import { Ionicons } from '@expo/vector-icons';
import EventForm from '../../components/EventForm';
import { useCalendarStore } from '../../store/calendarStore';

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: 'short' | 'meeting' | 'urgent' | 'regular';
  notes?: string;
}

interface EventFormData {
  title: string;
  patientName: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  assignedStaff: string;
  healthCardNumber: string;
  type: 'short' | 'meeting' | 'urgent' | 'regular';
}

const EVENT_COLORS = {
  short: '#E0E0E0',
  meeting: '#FF6B6B',
  urgent: '#FF0000',
  regular: '#FFB6C1',
} as const;

interface DayComponentProps {
  date: {
    day: number;
    dateString: string;
  };
  state: string;
}

interface EventDot {
  type: keyof typeof EVENT_COLORS;
  color: string;
}

interface DayObject {
  timestamp: number;
  dateString: string;
}

const DashboardEventsScreen: React.FC = () => {
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { events, isLoading, error, createEvent, deleteEvent, refreshEvents } = useCalendar();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formattedSelectedDate = useMemo(() => {
    return moment(selectedDate).format('YYYY-MM-DD');
  }, [selectedDate]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => moment(event.startDate).isSame(moment(selectedDate), 'day'));
  }, [events, selectedDate]);

  const getMarkedDates = useCallback(() => {
    const marked: any = {};
    events.forEach(event => {
      const dateStr = moment(event.startDate).format('YYYY-MM-DD');
      if (!marked[dateStr]) {
        marked[dateStr] = {
          dots: [{
            color: EVENT_COLORS[event.type],
          }],
        };
      } else {
        marked[dateStr].dots.push({
          color: EVENT_COLORS[event.type],
        });
      }
    });

    const selectedDateStr = moment(selectedDate).format('YYYY-MM-DD');
    marked[selectedDateStr] = {
      ...marked[selectedDateStr],
      selected: true,
      selectedColor: colors.base.white,
      selectedTextColor: colors.base.black,
      dots: marked[selectedDateStr]?.dots || [],
    };

    return marked;
  }, [events, selectedDate]);

  const handleDateSelect = (day: DayObject) => {
    setSelectedDate(new Date(day.timestamp));
  };

  const handleAddEvent = () => {
    if (!selectedDate) {
      // Show error message if no date is selected
      Alert.alert(
        'Select Date',
        'Please select a date from the calendar first.',
        [{ text: 'OK', onPress: () => {} }]
      );
      return;
    }
    setIsModalVisible(true);
  };

  const handleCreateEvent = async (formData: EventFormData) => {
    try {
      if (!selectedDate) {
        throw new Error('Please select a date first');
      }

      await createEvent({
        ...formData,
        startDate: moment(formData.startDate)
          .year(selectedDate.getFullYear())
          .month(selectedDate.getMonth())
          .date(selectedDate.getDate())
          .toDate(),
        endDate: moment(formData.endDate)
          .year(selectedDate.getFullYear())
          .month(selectedDate.getMonth())
          .date(selectedDate.getDate())
          .toDate(),
      });
      setIsModalVisible(false);
      refreshEvents();
    } catch (e) {
      Alert.alert(
        'Error',
        'An error occurred while creating the event. Please try again.',
        [{ text: 'OK', onPress: () => {} }]
      );
      console.error('Error creating event:', e);
    }
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <View style={[styles.eventColor, { backgroundColor: EVENT_COLORS[item.type] }]} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventTime}>
          {moment(item.startDate).format('HH:mm')} - {moment(item.endDate).format('HH:mm')}
        </Text>
        {item.notes && <Text style={styles.eventNotes}>{item.notes}</Text>}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEvent(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.yearText}>2025</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerIcon} 
            onPress={handleAddEvent}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#247401" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {renderHeader()}
        
        <Text style={styles.monthTitle}>January</Text>
        
        <Calendar
          current={formattedSelectedDate}
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: 'rgba(255,255,255,0.5)',
            selectedDayBackgroundColor: colors.base.white,
            selectedDayTextColor: colors.base.black,
            todayTextColor: colors.base.white,
            dayTextColor: colors.base.white,
            textDisabledColor: 'rgba(255,255,255,0.3)',
            dotColor: colors.base.white,
            selectedDotColor: colors.base.black,
            arrowColor: 'transparent',
            monthTextColor: 'transparent',
            textMonthFontSize: 0,
            textDayFontSize: 16,
            textDayFontWeight: '400',
            'stylesheet.calendar.main': {
              week: {
                marginTop: 0,
                marginBottom: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.1)',
                paddingVertical: 12,
              },
            },
            'stylesheet.calendar.header': {
              header: {
                display: 'none',
              },
              dayHeader: {
                color: 'rgba(255,255,255,0.5)',
                fontWeight: '400',
                fontSize: 14,
                marginBottom: 10,
              },
            },
          }}
          markingType="multi-dot"
        />

        <View style={styles.eventsList}>
          {error ? (
            <Text style={styles.errorText}>An error occurred while loading events. Please try again.</Text>
          ) : (
            <FlatList<Event>
              data={filteredEvents}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No events scheduled for this day</Text>
              }
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <EventForm
              onSubmit={handleCreateEvent}
              onCancel={() => setIsModalVisible(false)}
              initialDate={selectedDate}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 8,
  },
  yearText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerIcon: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  dayContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  selectedDayContainer: {
    backgroundColor: colors.base.white,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: colors.base.white,
    marginBottom: 4,
  },
  selectedDayText: {
    color: colors.base.black,
    fontWeight: '600',
  },
  disabledDayText: {
    color: 'rgba(255,255,255,0.3)',
  },
  eventDotsContainer: {
    flexDirection: 'row',
    gap: 2,
    position: 'absolute',
    bottom: 2,
  },
  eventDot: {
    width: 8,
    height: 3,
    borderRadius: 1.5,
  },
  eventsList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 10,
  },
  eventColor: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.base.white,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  eventNotes: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  deleteButton: {
    padding: 8,
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272727',
  },
  loadingText: {
    color: colors.base.white,
    marginTop: 16,
    fontSize: 16,
  },
});

export default DashboardEventsScreen; 
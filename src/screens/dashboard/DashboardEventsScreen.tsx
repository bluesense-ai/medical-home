import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SerializableEvent } from '../../navigation/types';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import useCalendarStore, { Event } from '../../store/useCalendarStore';
import { useTheme } from '../../store/useTheme';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedStatusBar from '../../components/ThemedStatusBar';
import DashboardHeader from '../../components/DashboardHeader';
import EventItem from '../../components/EventItem';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    dots?: Array<{color: string}>;
  };
};

type DashboardEventsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type DashboardEventsScreenRouteProp = RouteProp<RootStackParamList, 'DashboardEventsScreen'>;

const DashboardEventsScreen: React.FC = () => {
  const theme = useTheme(state => state.theme);
  const navigation = useNavigation<DashboardEventsScreenNavigationProp>();
  const route = useRoute<DashboardEventsScreenRouteProp>();
  
  const initialDate = route.params?.selectedDate 
    ? moment(route.params.selectedDate).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD');
    
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');
  
  const { events, addEvent } = useCalendarStore();
  
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };
  
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = moment(selectedDate).month(monthIndex).format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };
  
  const handleCreateEvent = async (eventData: any) => {
    try {
      await addEvent(eventData);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  
  const filteredEvents = useCallback(() => {
    return events.filter(event => 
      moment(event.startDate).format('YYYY-MM-DD') === formattedSelectedDate
    );
  }, [events, formattedSelectedDate]);
  
  const getMarkedDates = useCallback((): MarkedDates => {
    const markedDates: MarkedDates = {};
    
    // Mark the selected date
    markedDates[formattedSelectedDate] = {
      selected: true,
      selectedColor: theme === 'dark' ? colors.base.white : colors.base.lightGray,
      selectedTextColor: colors.base.black
    };
    
    // Mark dates with events
    events.forEach(event => {
      const eventDate = moment(event.startDate).format('YYYY-MM-DD');
      
      if (markedDates[eventDate]) {
        // If the date is already marked (could be the selected date)
        if (!markedDates[eventDate].dots) {
          markedDates[eventDate].dots = [];
        }
        markedDates[eventDate].dots?.push({
          color: getEventColor(event),
        });
      } else {
        // If the date is not yet marked
        markedDates[eventDate] = {
          dots: [{
            color: getEventColor(event),
          }],
        };
      }
    });
    
    return markedDates;
  }, [events, formattedSelectedDate, theme]);
  
  const getEventColor = (event: Event) => {
    switch (event.type) {
      case 'urgent': return colors.main.error;
      case 'regular': return colors.legacy.gray;
      case 'check-up': return colors.main.warning;
      case 'consultation': return colors.alternativeLight.error;
      default: return colors.main.primary;
    }
  };
  
  const handleAddEvent = () => {
    // Navigate to EventForm screen with the selected date
    navigation.navigate('EventForm', { selectedDate });
  };
  
  const handleEventPress = (event: Event) => {
    // Tarih nesnelerini string formatına dönüştür
    const serializedEvent: SerializableEvent = {
      ...event,
      startDate: event.startDate ? event.startDate.toISOString() : null,
      endDate: event.endDate ? event.endDate.toISOString() : null,
    };
    
    navigation.navigate('EventDetail', { event: serializedEvent });
  };
  
  const handleYearlyCalendarPress = () => {
    navigation.navigate('YearlyCalendar');
  };

  return (
    <ThemedView style={{ flex: 1 }} useSafeArea>
      <ThemedStatusBar />
      
      <View style={{ paddingBottom: 16 }}>
        <DashboardHeader
          title={moment(selectedDate).format('MMMM')}
          showBackButton
          onBackPress={() => navigation.goBack()}
          showSearch
          showAdd
          onSearchPress={() => {}}
          onAddPress={handleAddEvent}
          rightIcons={[
            {
              icon: 'calendar-outline',
              iconFamily: 'Ionicons',
              onPress: handleYearlyCalendarPress
            }
          ]}
        />
      </View>
      
      <Calendar
        current={formattedSelectedDate}
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        markingType="multi-dot"
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          selectedDayBackgroundColor: theme === 'dark' ? colors.base.white : colors.base.lightGray,
          selectedDayTextColor: theme === 'dark' ? colors.base.black : colors.base.white,
          todayTextColor: colors.main.secondary,
          dayTextColor: theme === 'dark' ? colors.base.white : colors.base.black,
          textDisabledColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          dotColor: colors.main.primary,
          selectedDotColor: colors.main.primary,
          arrowColor: theme === 'dark' ? colors.base.white : colors.base.black,
          monthTextColor: theme === 'dark' ? colors.base.white : colors.base.black,
          textMonthFontWeight: 'bold',
          textDayFontSize: 14,
          textMonthFontSize: 16,
        }}
      />
      
      <View style={{ flex: 1, padding: 16 }}>
        <ThemedText variant="subtitle" style={{ marginBottom: 16 }}>
          {filteredEvents().length > 0 
            ? `Events for ${moment(selectedDate).format('MMMM D, YYYY')}` 
            : `No events for ${moment(selectedDate).format('MMMM D, YYYY')}`}
        </ThemedText>
        
        <FlatList
          data={filteredEvents()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem event={item} onPress={handleEventPress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ThemedView>
  );
};

export default DashboardEventsScreen; 
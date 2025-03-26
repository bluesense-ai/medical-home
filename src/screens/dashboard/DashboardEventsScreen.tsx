import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SerializableEvent } from '../../navigation/types';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import useCalendarStore, { Event } from '../../store/useCalendarStore';
import { useTheme } from '../../store/useTheme';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import DashboardHeader from '../../components/DashboardHeader';
import EventItem from '../../components/EventItem';
import { colors } from '../../theme/colors';

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
    dots?: Array<{color: string; key?: string}>;
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
  
  const getEventColor = (event: Event) => {
    switch (event.type) {
      case 'urgent': return colors.main.error;
      case 'regular': return colors.base.white;
      case 'check-up': return colors.main.warning;
      case 'consultation': return colors.main.error;
      default: return colors.main.primary;
    }
  };
  
  const getMarkedDates = useCallback((): MarkedDates => {
    const markedDates: MarkedDates = {};
    
    // Mark dates with events 
    events.forEach(event => {
      const eventDate = moment(event.startDate).format('YYYY-MM-DD');
      
      // Skip dots for selected date
      if (eventDate === formattedSelectedDate) {
        return;
      }
      
      const eventDot = {
        color: getEventColor(event),
        key: event.id
      };
      
      if (markedDates[eventDate]) {
        // If the date is already marked
        if (!markedDates[eventDate].dots) {
          markedDates[eventDate].dots = [];
        }
        markedDates[eventDate].dots?.push(eventDot);
      } else {
        // If the date is not yet marked
        markedDates[eventDate] = {
          dots: [eventDot],
        };
      }
    });
    
    // Now mark the selected date without dots
    markedDates[formattedSelectedDate] = {
      selected: true,
      selectedColor: "#32CD32",
      selectedTextColor: colors.base.black,
      dots: [] // Empty array for no dots
    };
    
    return markedDates;
  }, [events, formattedSelectedDate]);
  
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
    <ThemedView style={{ flex: 1, backgroundColor: theme === 'dark' ? colors.base.darkGray : colors.main.primary }} useSafeArea>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.main.primary} 
      />
      
      <View style={{ paddingBottom: 16 }}>
        <DashboardHeader
          title={moment(selectedDate).format('YYYY')}
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

      <ThemedText 
        style={{ 
          fontSize: 24, 
          color: colors.base.white,
          fontWeight: '600', 
          marginBottom: 20,
          paddingHorizontal: 16 
        }}
      >
        {moment(selectedDate).format('MMMM')}
      </ThemedText>

      <View style={{ 
        marginBottom: 0, 
        paddingBottom: 0, 
        borderBottomWidth: 0
      }}>
        <Calendar
          current={formattedSelectedDate}
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType="multi-dot"
          hideArrows={true}
          hideDayNames={false}
          hideMonthYearHeaders={true}
          renderHeader={() => null}
          style={{
            marginBottom: 0,
            paddingBottom: 0
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: "transparent",
            textSectionTitleColor: colors.base.white,
            selectedDayBackgroundColor: "#32CD32",
            selectedDayTextColor: colors.base.black,
            todayTextColor: colors.main.secondary,
            dayTextColor: colors.base.white,
            textDisabledColor: 'rgba(255,255,255,0.4)',
            dotColor: colors.main.error,
            selectedDotColor: colors.main.error,
            arrowColor: colors.base.white,
            monthTextColor: colors.base.white,
            textMonthFontWeight: 'bold',
            textDayFontSize: 12,
            textDayFontWeight: '600',
            textMonthFontSize: 16,
            'stylesheet.calendar.main': {
              week: {
                marginTop: 0,
                marginBottom: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.2)',
                paddingBottom: 4,
                paddingTop: 4
              },
              day: {
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 7
              }
            },
            'stylesheet.day.basic': {
              selected: {
                backgroundColor: "#32CD32",
                borderRadius: 8,
                width: 25,
                height: 25
              },
              today: {
                backgroundColor: 'transparent',
                borderRadius: 4,
              },
              dot: {
                width: 4,
                height: 4,
                marginTop: 1
              },
              base: {
                width: 32,
                height: 32,
                alignItems: 'center'
              },
              dots: {
                flexDirection: 'row',
                justifyContent: 'center'
              },
              selectedDot: {
                backgroundColor: colors.main.error
              }
            }
          }}
          dayNamesShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        />
      </View>
      
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <FlatList
          style={{ flex: 1 }}
          data={filteredEvents()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem event={item} onPress={handleEventPress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20, paddingTop: 16 }}
        />
      </View>
    </ThemedView>
  );
};

export default DashboardEventsScreen; 
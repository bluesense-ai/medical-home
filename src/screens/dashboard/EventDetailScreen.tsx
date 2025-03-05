import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Pressable, Animated, StatusBar, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SerializableEvent } from '../../navigation/types';
import moment from 'moment';
import { mockEvents, BUSINESS_HOURS } from '../../data/mockEvents';
import { Event, EventType } from '../../store/useCalendarStore';
import DashboardHeader from '../../components/DashboardHeader';

type EventDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;
type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

// Generate hours array from business hours
const HOURS = Array.from(
  { length: BUSINESS_HOURS.end - BUSINESS_HOURS.start + 1 },
  (_, i) => {
    const hour = i + BUSINESS_HOURS.start;
    return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
  }
);

const EVENT_COLORS = {
  'urgent': colors.main.error,
  'regular': colors.legacy.gray,
  'check-up': colors.main.warning,
  'consultation': colors.alternativeLight.error,
} as const;

const EventDetailScreen = () => {
  const navigation = useNavigation<EventDetailScreenNavigationProp>();
  const route = useRoute<EventDetailScreenRouteProp>();
  const serializedEvent = route.params.event;
  
  // String tarihlerini Date nesnelerine dönüştür
  const event: Event = {
    ...serializedEvent,
    startDate: serializedEvent.startDate ? new Date(serializedEvent.startDate) : new Date(),
    endDate: serializedEvent.endDate ? new Date(serializedEvent.endDate) : new Date(),
  };

  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(100)).current;

  const eventStartHour = moment(event.startDate).format('h A');
  const eventDuration = moment(event.endDate).diff(moment(event.startDate), 'hours');

  // Filter events for the same day
  const dayEvents = mockEvents.filter(e => 
    moment(e.startDate).isSame(moment(event.startDate), 'day') && 
    e.id !== event.id
  );

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isTimelineExpanded ? 600 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isTimelineExpanded]);

  const renderTimeline = () => {
    if (!isTimelineExpanded) {
      // Show only the selected event's time slot
      return (
        <View style={styles.timelineHour}>
          <Text style={styles.hourText}>{eventStartHour}</Text>
          <View style={styles.hourLine} />
          <View 
            style={[
              styles.eventIndicator, 
              { 
                backgroundColor: EVENT_COLORS[event.type as EventType],
                height: eventDuration * 40,
                top: 0
              }
            ]}
          >
            <Text style={styles.eventLabel}>{event.title}</Text>
          </View>
        </View>
      );
    }

    // Show all hours and events
    return HOURS.map((hour) => {
      const currentEvents = [event, ...dayEvents].filter(e => 
        moment(e.startDate).format('h A') === hour
      );
      
      return (
        <View key={hour} style={styles.timelineHour}>
          <Text style={styles.hourText}>{hour}</Text>
          <View style={styles.hourLine} />
          {currentEvents.map(evt => {
            const duration = moment(evt.endDate).diff(moment(evt.startDate), 'hours');
            return (
              <View
                key={evt.id}
                style={[
                  styles.eventIndicator,
                  {
                    backgroundColor: EVENT_COLORS[evt.type as EventType],
                    height: duration * 40,
                    top: 0
                  }
                ]}
              >
                <Text style={styles.eventLabel}>{evt.title}</Text>
              </View>
            );
          })}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <DashboardHeader
          title={moment(event.startDate).format('MMMM')}
          showBackButton
          onBackPress={() => navigation.goBack()}
          showSearch
          showAdd
          onSearchPress={() => {}}
          onAddPress={() => {}}
        />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.mainCard}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>
              {moment(event.startDate).format('dddd, MMM D, YYYY')}
            </Text>
            <Text style={styles.timeText}>
              from {moment(event.startDate).format('h:mm A')} to {moment(event.endDate).format('h:mm A')}
            </Text>
            <Text style={styles.repeatText}>
              Repeats every weekday
            </Text>
          </View>

          <Pressable onPress={() => setIsTimelineExpanded(!isTimelineExpanded)}>
            <Animated.View style={[styles.timelineCard, { height: heightAnim }]}>
              {renderTimeline()}
            </Animated.View>
          </Pressable>
        </View>

        <View style={styles.participantsCard}>
          <View style={styles.participant}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>D</Text>
            </View>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>Dami Egbeyemi</Text>
            </View>
          </View>

          <View style={styles.participant}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>Santiago Silva</Text>
            </View>
          </View>

          <View style={styles.participantIcons}>
            <View style={styles.iconGroup}>
              <MaterialCommunityIcons name="pencil-outline" size={12} color={colors.base.white} style={styles.participantIcon} />
              <Text style={styles.participantIconText}>Edit</Text>
            </View>
            <View style={styles.iconGroup}>
              <MaterialCommunityIcons name="video-outline" size={12} color={colors.base.white} style={styles.participantIcon} />
              <Text style={styles.participantIconText}>Consult</Text>
            </View>
            <View style={styles.iconGroup}>
              <MaterialCommunityIcons name="file-document-outline" size={12} color={colors.base.white} style={styles.participantIcon} />
              <Text style={styles.participantIconText}>History</Text>
            </View>
            <View style={styles.iconGroup}>
              <MaterialCommunityIcons name="phone-outline" size={12} color={colors.base.white} style={styles.participantIcon} />
              <Text style={styles.participantIconText}>Contact</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    width: '100%',
    backgroundColor: colors.base.darkGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainCard: {
    backgroundColor: 'transparent',
    marginBottom: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 24,
  },
  dateSection: {
    marginBottom: 32,
  },
  dateText: {
    fontSize: 18,
    color: colors.base.white,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    color: colors.base.white,
    marginBottom: 8,
  },
  repeatText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  timelineCard: {
    backgroundColor: colors.base.black,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    overflow: 'hidden',
  },
  timelineHour: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    minHeight: 40,
    position: 'relative',
  },
  hourText: {
    width: 50,
    fontSize: 16,
    color: colors.base.white,
    opacity: 0.7,
  },
  hourLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 12,
  },
  eventIndicator: {
    position: 'absolute',
    left: 60,
    right: 0,
    minHeight: 40,
    borderRadius: 6,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  eventLabel: {
    color: colors.base.white,
    fontSize: 16,
  },
  participantsCard: {
    backgroundColor: colors.base.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.base.white,
    fontSize: 18,
    fontWeight: '500',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
  participantIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantIcon: {
    marginRight: 4,
  },
  participantIconText: {
    color: colors.base.white,
    fontSize: 12,
    opacity: 0.7,
  },
});

export default EventDetailScreen; 
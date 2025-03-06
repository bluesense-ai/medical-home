import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, StatusBar, Platform, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SerializableEvent } from '../../navigation/types';
import moment from 'moment';
import { BUSINESS_HOURS, mockEvents } from '../../data/mockEvents';
import { Event, EventType } from '../../store/useCalendarStore';
import DashboardHeader from '../../components/DashboardHeader';
import { useTheme } from '../../store/useTheme';
import { colors } from '../../theme/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

// Event color mapping
const EVENT_COLORS = {
  'urgent': colors.main.error,
  'regular': colors.legacy.gray,
  'check-up': colors.main.warning,
  'consultation': colors.alternativeLight.error,
} as const;

// Participant component props
interface ParticipantProps {
  name: string;
  initial: string;
  theme: string;
}

// Participant component for displaying event participants
const Participant: React.FC<ParticipantProps> = ({ name, initial, theme }) => {
  return (
    <View style={styles.participant}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.participantInfo}>
        <Text style={[styles.participantName, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
          {name}
        </Text>
      </View>
    </View>
  );
};

// Action icon component props
interface ActionIconProps {
  icon: string;
  label: string;
}

// Action icon component
const ActionIcon: React.FC<ActionIconProps> = ({ icon, label }) => {
  return (
    <View style={styles.iconGroup}>
      <MaterialCommunityIcons 
        name={icon as any} 
        size={12} 
        color={colors.base.white} 
        style={styles.participantIcon} 
      />
      <Text style={styles.participantIconText}>
        {label}
      </Text>
    </View>
  );
};

// Timeline hour component props
interface TimelineHourProps {
  hour: string;
  events: Event[];
  expanded: boolean;
  theme: string;
}

// Timeline hour component
const TimelineHour: React.FC<TimelineHourProps> = ({ hour, events, expanded, theme }) => {
  return (
    <View style={styles.timelineHour}>
      <Text style={[
        styles.hourText, 
        { color: theme === 'dark' ? colors.base.white : colors.base.black }
      ]}>
        {hour}
      </Text>
      <View style={[
        styles.hourLine, 
        { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
      ]} />
      {events.map(evt => {
        const duration = moment(evt.endDate).diff(moment(evt.startDate), 'hours');
        return (
          <View
            key={evt.id}
            style={[
              styles.eventIndicator,
              {
                backgroundColor: EVENT_COLORS[evt.type as EventType],
                height: Math.max(duration * 40, 40), // Ensure minimum height
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
};

const EventDetailScreen = () => {
  const theme = useTheme(state => state.theme);
  const navigation = useNavigation<EventDetailScreenNavigationProp>();
  const route = useRoute<EventDetailScreenRouteProp>();
  
  const { event: serializedEvent } = route.params;
  
  // Deserialize event dates
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

  // Render timeline based on expanded state
  const renderTimeline = () => {
    if (!isTimelineExpanded) {
      // Show only the selected event's time slot
      return (
        <TimelineHour 
          hour={eventStartHour} 
          events={[event]} 
          expanded={false} 
          theme={theme} 
        />
      );
    }

    // Show all hours regardless of events
    return HOURS.map((hour) => {
      const currentEvents = [event, ...dayEvents].filter(e => 
        moment(e.startDate).format('h A') === hour
      );
      
      return (
        <TimelineHour 
          key={hour} 
          hour={hour} 
          events={currentEvents} 
          expanded={true} 
          theme={theme} 
        />
      );
    });
  };

  // Action handlers
  const handleEdit = () => {
    console.log('Edit event');
  };
  
  const handleConsult = () => {
    console.log('Consult');
  };
  
  const handleHistory = () => {
    console.log('View history');
  };
  
  const handleContact = () => {
    console.log('Contact patient');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? colors.base.darkGray : colors.base.white }]}>
      <StatusBar
        barStyle={theme === 'dark' ? "light-content" : "dark-content"}
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
          <Text style={[styles.title, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
            {event.title}
          </Text>
          
          <View style={styles.dateSection}>
            <Text style={[styles.dateText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              {moment(event.startDate).format('dddd, MMM D, YYYY')}
            </Text>
            <Text style={[styles.timeText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              from {moment(event.startDate).format('h:mm A')} to {moment(event.endDate).format('h:mm A')}
            </Text>
            <Text style={styles.repeatText}>
              Repeats every weekday
            </Text>
          </View>

          <Pressable onPress={() => setIsTimelineExpanded(!isTimelineExpanded)}>
            <Animated.View 
              style={[
                styles.timelineCard, 
                { 
                  height: heightAnim,
                  backgroundColor: theme === 'dark' ? colors.base.black : colors.alternativeLight.secondary 
                }
              ]}
            >
              {renderTimeline()}
            </Animated.View>
          </Pressable>
        </View>

        <View 
          style={[
            styles.participantsCard, 
            { backgroundColor: theme === 'dark' ? colors.base.black : colors.main.secondary}
          ]}
        >
          <Participant 
            name={event.patientName} 
            initial={event.patientName.charAt(0).toUpperCase()} 
            theme={theme} 
          />

          <Participant 
            name={event.assignedStaff} 
            initial={event.assignedStaff.charAt(0).toUpperCase()} 
            theme={theme} 
          />

          <View style={[
            styles.participantIcons, 
            { 
              borderTopColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
            }
          ]}>
            <TouchableOpacity>
              <ActionIcon icon="pencil-outline" label="Edit" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ActionIcon icon="video-outline" label="Consult" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ActionIcon icon="file-document-outline" label="History" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ActionIcon icon="phone-outline" label="Contact" />
            </TouchableOpacity>
          </View>
        </View>
        
        {event.notes && (
          <View 
            style={[
              styles.participantsCard, 
              { backgroundColor: theme === 'dark' ? colors.base.black : colors.base.white }
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              Notes
            </Text>
            <Text style={[styles.noteText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              {event.notes}
            </Text>
          </View>
        )}
        
        {event.meetingDetails && (
          <View 
            style={[
              styles.participantsCard, 
              { backgroundColor: theme === 'dark' ? colors.base.black : colors.base.white }
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              Meeting Details
            </Text>
            <Text style={[styles.noteText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
              {event.meetingDetails}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    width: '100%',
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
    marginBottom: 24,
  },
  dateSection: {
    marginBottom: 32,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  repeatText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  timelineCard: {
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
    opacity: 0.7,
  },
  hourLine: {
    flex: 1,
    height: 1,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default EventDetailScreen; 
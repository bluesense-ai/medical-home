import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, StatusBar, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SerializableEvent } from '../../navigation/types';
import moment from 'moment';
import { mockEvents } from '../../data/mockEvents';
import { Event } from '../../store/useCalendarStore';
import DashboardHeader from '../../components/DashboardHeader';
import { useTheme } from '../../store/useTheme';
import { colors } from '../../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParticipantCard from '../../components/Dashboard/ParticipantCard';
import TimelineView from '../../components/Dashboard/TimelineView';
import ThemedView from '../../components/ThemedView';

type EventDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;
type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

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

  return (
    <ThemedView style={{ flex: 1, backgroundColor: theme === 'dark' ? colors.base.darkGray : colors.main.primary }} useSafeArea>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.main.primary} 
      />
      
      <View style={{ paddingBottom: 16 }}>
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
        <Text style={[styles.title, { color: colors.base.white }]}>
          {event.title}
        </Text>
        
        <View style={styles.separator} />
        
        <View style={styles.dateSection}>
          <Text style={[styles.dateText, { color: colors.base.white }]}>
            {moment(event.startDate).format('dddd, MMM D, YYYY')}
          </Text>
          <Text style={[styles.timeText, { color: colors.base.white }]}>
            from {moment(event.startDate).format('h:mm A')} to {moment(event.endDate).format('h:mm A')}
          </Text>
          <Text style={styles.repeatText}>
            Repeats every weekday
          </Text>
        </View>

        {/* Timeline Card */}
        <Pressable onPress={() => setIsTimelineExpanded(!isTimelineExpanded)}>
          <Animated.View 
            style={[
              styles.timelineCard, 
              { 
                height: heightAnim,
                backgroundColor: 'rgba(255, 255, 255, 0.5)' 
              }
            ]}
          >
            <TimelineView 
              event={event} 
              dayEvents={dayEvents} 
              isExpanded={isTimelineExpanded} 
            />
            
            {isTimelineExpanded && (
              <View style={styles.expandCollapseButton}>
                <MaterialCommunityIcons 
                  name="chevron-down" 
                  size={24} 
                  color={colors.base.white} 
                />
              </View>
            )}
          </Animated.View>
        </Pressable>

        {/* Participants Card */}
        <ParticipantCard 
          event={event} 
          theme={theme}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  separator: {
    height: 1,
    backgroundColor: colors.base.white,
    marginBottom: 24,
  },
  dateSection: {
    marginBottom: 18,
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
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    overflow: 'hidden',
  },
  expandCollapseButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
});

export default EventDetailScreen; 
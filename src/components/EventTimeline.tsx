import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ThemedText from './ThemedText';
import ThemedCard from './ThemedCard';
import { Event } from '../store/useCalendarStore';
import { colors } from '../theme/colors';
import moment from 'moment';

interface EventTimelineProps {
  event: Event;
  expanded: boolean;
  heightAnim: Animated.Value;
}

const BUSINESS_HOURS = {
  start: 8,
  end: 18,
};

const HOURS = Array.from(
  { length: BUSINESS_HOURS.end - BUSINESS_HOURS.start + 1 },
  (_, i) => {
    const hour = i + BUSINESS_HOURS.start;
    return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
  }
);

const EventTimeline: React.FC<EventTimelineProps> = ({ 
  event, 
  expanded, 
  heightAnim 
}) => {
  const renderTimelineHours = () => {
    return HOURS.map((hour, index) => {
      const hourNumber = index + BUSINESS_HOURS.start;
      const eventStartHour = moment(event.startDate).hour();
      const eventEndHour = moment(event.endDate).hour();
      const isEventHour = hourNumber >= eventStartHour && hourNumber <= eventEndHour;
      
      return (
        <View key={`hour-${index}`} style={styles.timelineHour}>
          <ThemedText variant="caption" color="secondary" style={styles.hourText}>
            {hour}
          </ThemedText>
          
          <View style={styles.hourLine}>
            {isEventHour && (
              <View 
                style={[
                  styles.eventIndicator,
                  { backgroundColor: getEventColor(event) }
                ]} 
              />
            )}
          </View>
        </View>
      );
    });
  };
  
  const getEventColor = (event: Event) => {
    switch (event.type) {
      case 'urgent': return colors.main.error;
      case 'regular': return colors.legacy.gray;
      case 'check-up': return colors.main.warning;
      case 'consultation': return colors.alternativeLight.error;
      default: return colors.main.primary;
    }
  };

  return (
    <Animated.View style={[styles.container, { height: heightAnim }]}>
      <ThemedText variant="subtitle" style={styles.title}>
        Timeline
      </ThemedText>
      
      <View style={styles.timelineContainer}>
        {renderTimelineHours()}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  title: {
    marginBottom: 16,
  },
  timelineContainer: {
    paddingHorizontal: 8,
  },
  timelineHour: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    minHeight: 40,
    position: 'relative',
  },
  hourText: {
    width: 60,
    marginRight: 16,
  },
  hourLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.base.lightGray,
    marginTop: 10,
  },
  eventIndicator: {
    position: 'absolute',
    top: -4,
    left: 0,
    right: 0,
    height: 10,
    borderRadius: 5,
  },
});

export default EventTimeline; 
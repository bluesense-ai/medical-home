import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { Event, EventType } from '../../store/useCalendarStore';
import { colors } from '../../theme/colors';

// Generate hours array from business hours
const HOURS = Array.from(
  { length: 14 }, // 7 AM to 8 PM (14 hours)
  (_, i) => {
    const hour = i + 7; // Start from 7 AM
    return hour < 12 ? `${hour} AM` : hour === 12 ? `${hour} PM` : `${hour - 12} PM`;
  }
);

// Event color mapping
const EVENT_COLORS = {
  'urgent': colors.main.error,
  'regular': colors.legacy.gray,
  'check-up': colors.main.warning,
  'consultation': colors.alternativeLight.error,
} as const;

// Timeline hour component props
interface TimelineHourProps {
  hour: string;
  events: Event[];
  expanded: boolean;
}

// Timeline hour component
const TimelineHour: React.FC<TimelineHourProps> = ({ hour, events, expanded }) => {
  return (
    <View style={styles.timelineHour}>
      <Text style={styles.hourText}>
        {hour}
      </Text>
      <View style={styles.hourLine} />
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

interface TimelineViewProps {
  event: Event;
  dayEvents: Event[];
  isExpanded: boolean;
}

const TimelineView: React.FC<TimelineViewProps> = ({ event, dayEvents, isExpanded }) => {
  const eventStartHour = moment(event.startDate).format('h A');

  if (!isExpanded) {
    // Show only the selected event's time slot
    return (
      <TimelineHour 
        hour={eventStartHour} 
        events={[event]} 
        expanded={false} 
      />
    );
  }

  // Show all hours regardless of events
  return (
    <>
      {HOURS.map((hour) => {
        const currentEvents = [event, ...dayEvents].filter(e => 
          moment(e.startDate).format('h A') === hour
        );
        
        return (
          <TimelineHour 
            key={hour} 
            hour={hour} 
            events={currentEvents} 
            expanded={true} 
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  timelineHour: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
    minHeight: 40,
    paddingRight: 12,
    position: 'relative',
  },
  hourText: {
    fontSize: 16,
    fontWeight: '500',
    paddingRight: 12,
    color: colors.base.white,
    opacity: 0.8,
  },
  hourLine: {
    flex: 1,
    height: 1,
    marginTop: 12,
    backgroundColor: 'rgba(47, 47, 47, 1)'
  },
  eventIndicator: {
    position: 'absolute',
    left: 60,
    right: 0,
    minHeight: 40,
    borderRadius: 2,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  eventLabel: {
    color: colors.base.black,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TimelineView; 
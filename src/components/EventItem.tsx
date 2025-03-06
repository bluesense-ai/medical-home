import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../store/useCalendarStore';
import ThemedText from './ThemedText';
import ThemedCard from './ThemedCard';
import moment from 'moment';
import { useTheme } from '../store/useTheme';
import { colors } from '../theme/colors';

interface EventItemProps {
  event: Event;
  onPress: (event: Event) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onPress }) => {
  const theme = useTheme(state => state.theme);
  
  const getEventColor = () => {
    switch (event.type) {
      case 'urgent': return colors.main.error;
      case 'regular': return colors.legacy.gray;
      case 'check-up': return colors.main.warning;
      case 'consultation': return colors.alternativeLight.error;
      default: return colors.main.primary;
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(event)}>
      <ThemedCard
        variant="blank"
        style={styles.container}
      >
        <View style={[styles.colorIndicator, { backgroundColor: getEventColor() }]} />
        
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <ThemedText variant="subtitle">{event.title}</ThemedText>
            {event.meetingDetails && (
              <ThemedText variant="caption" color="gray" numberOfLines={1} ellipsizeMode="tail">
                {event.meetingDetails}
              </ThemedText>
            )}
          </View>
          
          <View style={styles.timeContainer}>
            <ThemedText variant="caption" color="primary">
              {moment(event.startDate).format('h:mm A')}
            </ThemedText>
            <ThemedText variant="caption" color="gray">
              {moment(event.endDate).format('h:mm A')}
            </ThemedText>
          </View>
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    marginVertical: 8,
  },
  colorIndicator: {
    width: 4,
    height: '80%',
    alignSelf: 'center',
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 8,
  },
});

export default EventItem; 
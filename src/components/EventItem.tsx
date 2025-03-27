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
      case 'regular': return colors.base.white;
      case 'check-up': return colors.main.warning;
      case 'consultation': return colors.main.error;
      default: return colors.main.primary;
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(event)} style={styles.touchable}>
      <View style={styles.container}>
        <View style={[styles.colorIndicator, { backgroundColor: getEventColor() }]} />
        
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <ThemedText 
              style={styles.titleText}
            >
              {event.title}
            </ThemedText>
            {event.meetingDetails && (
              <ThemedText 
                style={styles.detailsText} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {event.meetingDetails}
              </ThemedText>
            )}
          </View>
          
          <View style={styles.timeContainer}>
            <ThemedText 
              style={styles.startTimeText}
            >
              {moment(event.startDate).format('h:mm A')}
            </ThemedText>
            <ThemedText 
              style={styles.endTimeText}
            >
              {moment(event.endDate).format('h:mm A')}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8,
  },
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent:"center",
    alignItems:"center"
  },
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
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
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.base.white,
  },
  detailsText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.legacy.lightGray,
  },
  startTimeText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.base.white,
  },
  endTimeText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(255,255,255,0.6)',
  }
});

export default EventItem; 
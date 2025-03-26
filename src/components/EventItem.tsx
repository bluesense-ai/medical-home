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
              variant="subtitle" 
              style={{ color: theme === 'dark' ? colors.base.white : colors.base.white }}
            >
              {event.title}
            </ThemedText>
            {event.meetingDetails && (
              <ThemedText 
                variant="caption" 
                style={{ color: 'rgba(255,255,255,0.6)' }} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                Meeting details
              </ThemedText>
            )}
          </View>
          
          <View style={styles.timeContainer}>
            <ThemedText 
              variant="caption" 
              style={{ color: colors.base.white }}
            >
              {moment(event.startDate).format('h:mm A')}
            </ThemedText>
            <ThemedText 
              variant="caption" 
              style={{ color: 'rgba(255,255,255,0.6)' }}
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
  },
  colorIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
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
});

export default EventItem; 
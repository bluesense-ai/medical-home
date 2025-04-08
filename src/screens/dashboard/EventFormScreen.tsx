import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import EventForm from '../../components/EventForm';
import { EventFormData } from '../../components/EventForm/index';
import useCalendarStore from '../../store/useCalendarStore';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type EventFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventForm'>;
type EventFormScreenRouteProp = RouteProp<RootStackParamList, 'EventForm'>;

const EventFormScreen: React.FC = () => {
  const navigation = useNavigation<EventFormScreenNavigationProp>();
  const route = useRoute<EventFormScreenRouteProp>();
  const { addEvent } = useCalendarStore();
  const insets = useSafeAreaInsets();
  
  // Get the selected date from route params or use current date
  const selectedDate = route.params?.selectedDate 
    ? new Date(route.params.selectedDate)
    : new Date();
  
  // Handle form submission
  const handleSubmit = async (data: EventFormData) => {
    try {
      console.log('Submitting event data:', data);
      
      // Make sure meetingDetails is included
      const eventData = {
        ...data,
        startDate: data.startDate,
        endDate: data.endDate,
        meetingDetails: data.meetingDetails || '',
        color: data.color || '#fff', // Ensure color is always defined
        title: data.title || `Appointment with ${data.patientName}`, // Ensure title is always defined
      };
      
      // Add the event to the store
      await addEvent(eventData);
      
      // Navigate back to the events screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  
  // Handle form cancellation
  const handleCancel = () => {
    navigation.goBack();
  };

  // Bottom padding for avoiding the tab bar
  const bottomPadding = Platform.OS === 'ios' ? 120 + insets.bottom : 100;
  
  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.main.primary} 
      />
      <View style={styles.separator} />
      <EventForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialDate={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.legacy.lightGray,
    marginTop: 5,
  }
});

export default EventFormScreen; 
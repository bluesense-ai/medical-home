import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import EventForm from '../../components/EventForm';
import { EventFormData } from '../../components/EventForm/index';
import useCalendarStore from '../../store/useCalendarStore';

type EventFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventForm'>;
type EventFormScreenRouteProp = RouteProp<RootStackParamList, 'EventForm'>;

const EventFormScreen: React.FC = () => {
  const navigation = useNavigation<EventFormScreenNavigationProp>();
  const route = useRoute<EventFormScreenRouteProp>();
  const { addEvent } = useCalendarStore();
  
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
  
  return (
    <EventForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      initialDate={selectedDate}
    />
  );
};

export default EventFormScreen; 
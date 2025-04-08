import React, { useState } from 'react';
import { Alert, Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { EventType } from '../../store/useCalendarStore';
import { BUSINESS_HOURS } from '../../data/mockEvents';
import { useTheme } from '../../store/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { colors } from '../../theme/colors';

// Import FormLayout and components
import FormLayout from './FormLayout';
import PatientInfoSection from './components/PatientInfoSection';
import TimeDateSection from './components/TimeDateSection';
import StaffSelector from './StaffSelector';
import FormInput from './FormInput';

// Array of random colors for events
const EVENT_COLORS = [
  '#FF5252', // Red
  '#FF9800', // Orange
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#673AB7', // Purple
  '#F06292', // Pink
];

// Event form data interface
export interface EventFormData {
  title?: string;
  color?: string;
  patientName: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  assignedStaff: string;
  healthCardNumber: string;
  meetingDetails: string;
  type: EventType;
}

// Event form props interface
export interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialDate?: Date;
}

/**
 * EventForm Component
 * 
 * This is the main form component for creating and editing events
 * It manages form state and validation, while delegating UI rendering to sub-components
 */
const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialDate = new Date() }) => {
  const theme = useTheme(state => state.theme);
  
  // Randomly select a color for the event
  const randomColor = EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)];
  
  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    title: undefined,
    color: randomColor,
    patientName: '',
    email: '',
    phone: '',
    startDate: initialDate,
    endDate: moment(initialDate).add(1, 'hour').toDate(),
    assignedStaff: 'Dami Egbeyemi',
    healthCardNumber: '',
    meetingDetails: '',
    type: 'short' as EventType,
  });

  // Time picker state
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.patientName) {
      Alert.alert('Error', 'Please enter patient name');
      return;
    }

    // If title is empty, use patient name as the title
    if (!formData.title) {
      setFormData(prev => ({ ...prev, title: `Appointment with ${formData.patientName}` }));
    }

    setIsLoading(true);
    try {
      // Generate a new copy of formData for submission
      const submissionData: EventFormData = {
        ...formData,
        // Ensure title is a string
        title: formData.title || `Appointment with ${formData.patientName}`
      };
      await onSubmit(submissionData);
    } catch (error) {
      Alert.alert('Error', 'Failed to add event');
    } finally {
      setIsLoading(false);
    }
  };

  // Validate time selection
  const validateTime = (time: Date, isStartTime: boolean): boolean => {
    const hour = time.getHours();
    const isValidHour = hour >= BUSINESS_HOURS.start && hour <= BUSINESS_HOURS.end;
    
    if (!isValidHour) {
      Alert.alert(
        'Invalid Time',
        `Please select a time between ${BUSINESS_HOURS.start}:00 AM and ${BUSINESS_HOURS.end > 12 ? BUSINESS_HOURS.end - 12 : BUSINESS_HOURS.end}:00 ${BUSINESS_HOURS.end >= 12 ? 'PM' : 'AM'}`
      );
      return false;
    }

    if (!isStartTime && time <= formData.startDate) {
      Alert.alert('Invalid Time', 'End time must be after start time');
      return false;
    }

    return true;
  };

  // Handle time change
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (showStartPicker) {
      setShowStartPicker(Platform.OS === 'ios');
      if (selectedTime && validateTime(selectedTime, true)) {
        const newStartDate = new Date(formData.startDate);
        newStartDate.setHours(selectedTime.getHours());
        newStartDate.setMinutes(selectedTime.getMinutes());
        
        setFormData(prev => ({ ...prev, startDate: newStartDate }));
        
        // Automatically set end time to start time + 1 hour
        const newEndDate = new Date(newStartDate);
        newEndDate.setHours(newEndDate.getHours() + 1);
        if (validateTime(newEndDate, false)) {
          setFormData(prev => ({ ...prev, endDate: newEndDate }));
        }
      }
    }
    
    if (showEndPicker) {
      setShowEndPicker(Platform.OS === 'ios');
      if (selectedTime && validateTime(selectedTime, false)) {
        const newEndDate = new Date(formData.endDate);
        newEndDate.setHours(selectedTime.getHours());
        newEndDate.setMinutes(selectedTime.getMinutes());
        
        setFormData(prev => ({ ...prev, endDate: newEndDate }));
      }
    }
  };

  // Handle patient information change
  const handlePatientChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <FormLayout
        onCancel={onCancel}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isDisabled={!formData.patientName}
        theme={theme}
        selectedDate={formData.startDate}
      >
        {/* Patient Information Section */}
        <PatientInfoSection
          name={formData.patientName}
          onNameChange={(text: string) => handlePatientChange('patientName', text)}
          email={formData.email}
          onEmailChange={(text: string) => handlePatientChange('email', text)}
          phone={formData.phone}
          onPhoneChange={(text: string) => handlePatientChange('phone', text)}
          theme={theme}
        />
        
        {/* Event Time Section */}
        <TimeDateSection
          startTime={formData.startDate}
          onStartTimePress={() => setShowStartPicker(true)}
          endTime={formData.endDate}
          onEndTimePress={() => setShowEndPicker(true)}
          theme={theme}
        />
        
        {/* Assigned Staff Section */}
        <StaffSelector
          staffName={formData.assignedStaff}
          onStaffChange={(name: string) => setFormData(prev => ({ ...prev, assignedStaff: name }))}
          theme={theme}
        />
        
        {/* Health Card Number */}
        <FormInput
          sectionTitle="Health Card Number"
          placeholder="123456789"
          value={formData.healthCardNumber}
          onChangeText={(text: string) => setFormData(prev => ({ ...prev, healthCardNumber: text }))}
          keyboardType="number-pad"
          theme={theme}
        />
      </FormLayout>
      
      {/* Start Time Picker */}
      {showStartPicker && (
        <DateTimePicker
          value={formData.startDate}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
      
      {/* End Time Picker */}
      {showEndPicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </>
  );
};

export default EventForm; 
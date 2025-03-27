import React, { useState } from 'react';
import { Alert } from 'react-native';
import moment from 'moment';
import { EventType } from '../../store/useCalendarStore';
import { BUSINESS_HOURS } from '../../data/mockEvents';
import { useTheme } from '../../store/useTheme';

// Import FormLayout and components
import FormLayout from './FormLayout';
import EventDetailsSection from './components/EventDetailsSection';
import PatientInfoSection from './components/PatientInfoSection';
import TimeDateSection from './components/TimeDateSection';
import TimePickerModal from './TimePickerModal';
import StaffSelector from './StaffSelector';
import { EVENT_TYPES } from './EventTypeSelector';
import FormInput from './FormInput';

// Event form data interface
export interface EventFormData {
  title: string;
  color: string;
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
  
  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    color: EVENT_TYPES[0].color,
    patientName: '',
    email: '',
    phone: '',
    startDate: initialDate,
    endDate: moment(initialDate).add(1, 'hour').toDate(),
    assignedStaff: 'Dami Egbeyemi',
    healthCardNumber: '',
    meetingDetails: '',
    type: EVENT_TYPES[0].id as EventType,
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

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      Alert.alert('Error', 'Failed to add event');
    } finally {
      setIsLoading(false);
    }
  };

  // Validate time selection
  const validateTime = (time: Date | undefined, isStartTime: boolean): boolean => {
    if (!time) return false;
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
  const handleTimeChange = (selectedTime: Date, isStartTime: boolean) => {
    if (!validateTime(selectedTime, isStartTime)) return;

    if (isStartTime) {
      const newStartDate = new Date(selectedTime);
      newStartDate.setFullYear(formData.startDate.getFullYear());
      newStartDate.setMonth(formData.startDate.getMonth());
      newStartDate.setDate(formData.startDate.getDate());
      
      setFormData(prev => ({ ...prev, startDate: newStartDate }));
      
      const newEndDate = new Date(newStartDate);
      newEndDate.setHours(newEndDate.getHours() + 1);
      if (validateTime(newEndDate, false)) {
        setFormData(prev => ({ ...prev, endDate: newEndDate }));
      }
      
      setShowStartPicker(false);
    } else {
      const newEndDate = new Date(selectedTime);
      newEndDate.setFullYear(formData.endDate.getFullYear());
      newEndDate.setMonth(formData.endDate.getMonth());
      newEndDate.setDate(formData.endDate.getDate());
      
      setFormData(prev => ({ ...prev, endDate: newEndDate }));
      setShowEndPicker(false);
    }
  };

  // Handle event type selection
  const handleEventTypeSelect = (typeId: EventType, typeColor: string) => {
    setFormData(prev => ({ 
      ...prev, 
      type: typeId,
      color: typeColor
    }));
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
        isDisabled={!formData.title || !formData.patientName}
        theme={theme}
        selectedDate={formData.startDate}
      >
        {/* Event Details Section */}
        <EventDetailsSection
          title={formData.title}
          onTitleChange={(text: string) => setFormData(prev => ({ ...prev, title: text }))}
          selectedType={formData.type}
          selectedColor={formData.color}
          onTypeSelect={handleEventTypeSelect}
          theme={theme}
        />
        
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
        
        {/* Meeting Details */}
        <FormInput
          sectionTitle="Meeting Details"
          placeholder="Add meeting details"
          value={formData.meetingDetails}
          onChangeText={(text: string) => setFormData(prev => ({ ...prev, meetingDetails: text }))}
          multiline
          numberOfLines={4}
          theme={theme}
        />
      </FormLayout>
      
      {/* Time Picker Modals */}
      <TimePickerModal
        visible={showStartPicker}
        isStartPicker={true}
        currentTime={formData.startDate}
        onClose={() => setShowStartPicker(false)}
        onTimeSelected={handleTimeChange}
        theme={theme}
      />
      
      <TimePickerModal
        visible={showEndPicker}
        isStartPicker={false}
        currentTime={formData.endDate}
        onClose={() => setShowEndPicker(false)}
        onTimeSelected={handleTimeChange}
        theme={theme}
      />
    </>
  );
};

export default EventForm; 
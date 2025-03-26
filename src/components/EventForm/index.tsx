import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  Platform, 
  Modal, 
  FlatList, 
  Alert,
  StatusBar
} from 'react-native';
import { colors } from '../../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { EventType } from '../../store/useCalendarStore';
import { BUSINESS_HOURS } from '../../data/mockEvents';
import { useTheme } from '../../store/useTheme';

// Import sub-components
import FormHeader from './FormHeader';
import EventTypeSelector, { EVENT_TYPES } from './EventTypeSelector';
import FormInput from './FormInput';
import TimeSelector from './TimeSelector';
import StaffSelector from './StaffSelector';
import FormFooter from './FormFooter';

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
  notes?: string;
  meetingDetails: string;
  type: EventType;
}

// Event form props interface
export interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialDate?: Date;
}

// Main EventForm component
const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialDate = new Date() }) => {
  const theme = useTheme(state => state.theme);
  const styles = theme === 'dark' ? stylesDark : stylesLight;

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
    notes: '',
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
  const handleTimeChange = (selectedTime: Date | undefined, isStartTime: boolean) => {
    if (!selectedTime) return;

    if (!validateTime(selectedTime, isStartTime)) return;

    if (isStartTime) {
      const newStartDate = new Date(selectedTime);
      setFormData(prev => ({ ...prev, startDate: newStartDate }));
      
      // Set end time to 1 hour after start time
      const newEndDate = new Date(selectedTime);
      newEndDate.setHours(newEndDate.getHours() + 1);
      if (validateTime(newEndDate, false)) {
        setFormData(prev => ({ ...prev, endDate: newEndDate }));
      }
    } else {
      setFormData(prev => ({ ...prev, endDate: selectedTime }));
    }

    if (Platform.OS === 'android') {
      setShowStartPicker(false);
      setShowEndPicker(false);
    }
  };

  // Generate time list for picker
  const generateTimeList = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        times.push(time);
      }
    }
    return times;
  };

  // Render date time picker based on platform
  const renderDateTimePicker = () => {
    if (Platform.OS === 'android') {
      const times = generateTimeList();
      
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStartPicker || showEndPicker}
          onRequestClose={() => {
            setShowStartPicker(false);
            setShowEndPicker(false);
          }}
        >
          <View 
            style={styles.modalContainer} 
            onTouchEnd={() => {
              setShowStartPicker(false);
              setShowEndPicker(false);
            }}
          >
            <View 
              style={styles.modalContent}
              onTouchEnd={e => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <Text 
                  style={[styles.modalButtonText, { color: colors.main.error }]}
                  onPress={() => {
                    setShowStartPicker(false);
                    setShowEndPicker(false);
                  }}
                >
                  Cancel
                </Text>
                <Text style={[styles.modalButtonText, { fontWeight: '700' }]}>
                  {showStartPicker ? 'Select Start Time' : 'Select End Time'}
                </Text>
                <Text 
                  style={[styles.modalButtonText, { color: colors.main.primary }]}
                  onPress={() => {
                    setShowStartPicker(false);
                    setShowEndPicker(false);
                  }}
                >
                  Done
                </Text>
              </View>
              <View style={styles.androidPickerContainer}>
                <FlatList
                  data={times}
                  keyExtractor={(item) => item.toISOString()}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.timeItem,
                        {
                          backgroundColor: 
                            (showStartPicker && moment(item).isSame(formData.startDate, 'minute')) ||
                            (!showStartPicker && moment(item).isSame(formData.endDate, 'minute'))
                              ? theme === 'dark' ? colors.base.darkGray : colors.base.lightGray
                              : 'transparent'
                        }
                      ]}
                      onTouchEnd={() => {
                        if (showStartPicker) {
                          handleTimeChange(item, true);
                        } else {
                          handleTimeChange(item, false);
                        }
                      }}
                    >
                      <Text style={[styles.timeItemText, { color: theme === 'dark' ? colors.base.white : colors.base.black }]}>
                        {moment(item).format('h:mm A')}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  getItemLayout={(data, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                  })}
                  initialScrollIndex={Math.floor(moment(showStartPicker ? formData.startDate : formData.endDate).hour() * 4)}
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    }

    // iOS picker modal
    return (
      <>
        {showStartPicker && (
          <DateTimePicker
            value={formData.startDate}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (event.type === 'set' && selectedDate) {
                handleTimeChange(selectedDate, true);
              }
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={formData.endDate}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (event.type === 'set' && selectedDate) {
                handleTimeChange(selectedDate, false);
              }
            }}
          />
        )}
      </>
    );
  };

  // Handle event type selection
  const handleEventTypeSelect = (typeId: EventType, typeColor: string) => {
    setFormData(prev => ({ 
      ...prev, 
      type: typeId,
      color: typeColor
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.main.primary} 
      />
      
      <FormHeader 
        onCancel={onCancel} 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
        theme={theme} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <FormInput 
            sectionTitle="Event Details"
            placeholder="Event Title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            theme={theme}
          />

          <EventTypeSelector 
            selectedType={formData.type}
            selectedColor={formData.color}
            onSelectType={handleEventTypeSelect}
            theme={theme}
          />
          
          <FormInput 
            sectionTitle="Patient Information"
            placeholder="Name"
            value={formData.patientName}
            onChangeText={(text) => setFormData({ ...formData, patientName: text })}
            theme={theme}
          />
          
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              <FormInput 
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                theme={theme}
              />
            </View>
            <View style={styles.halfWidth}>
              <FormInput 
                placeholder="Phone"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                theme={theme}
              />
            </View>
          </View>

          <Text style={[styles.sectionTitle, styles.marginTop]}>Event Time</Text>
          
          <TimeSelector 
            label="Start"
            value={formData.startDate}
            onPress={() => setShowStartPicker(true)}
            theme={theme}
          />
          
          <TimeSelector 
            label="End"
            value={formData.endDate}
            onPress={() => setShowEndPicker(true)}
            theme={theme}
          />

          <StaffSelector 
            staffName={formData.assignedStaff}
            theme={theme}
          />
          
          <FormInput 
            sectionTitle="Health Card Number"
            placeholder="123456789"
            value={formData.healthCardNumber}
            onChangeText={(text) => setFormData({ ...formData, healthCardNumber: text })}
            keyboardType="number-pad"
            theme={theme}
          />
          
          <FormInput 
            sectionTitle="Meeting Details"
            placeholder="Enter meeting details"
            value={formData.meetingDetails}
            onChangeText={(text) => setFormData(prev => ({ ...prev, meetingDetails: text }))}
            multiline={true}
            numberOfLines={4}
            theme={theme}
          />
        </View>
      </ScrollView>

      <FormFooter 
        onCancel={onCancel}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isDisabled={!formData.title || !formData.patientName}
        theme={theme}
      />
      
      {renderDateTimePicker()}
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme === 'dark' ? colors.base.white : colors.main.primary} />
          <Text style={styles.loadingText}>Adding event...</Text>
        </View>
      )}
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.base.white,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfWidth: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    color: colors.base.black,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.base.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalButtonText: {
    color: colors.base.black,
    fontSize: 16,
    fontWeight: '600',
  },
  androidPickerContainer: {
    height: 300,
    backgroundColor: colors.base.white,
    borderRadius: 8,
    margin: 16,
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  timeItemText: {
    color: colors.base.black,
    fontSize: 16,
    fontWeight: '500',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: colors.base.black,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfWidth: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.base.darkGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  androidPickerContainer: {
    height: 300,
    backgroundColor: colors.base.darkGray,
    borderRadius: 8,
    margin: 16,
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  timeItemText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: colors.base.white,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
});

export default EventForm; 
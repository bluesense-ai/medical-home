import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Platform, Modal, FlatList, Alert } from 'react-native';
import { colors } from '../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { EventType } from '../store/useCalendarStore';
import { BUSINESS_HOURS } from '../data/mockEvents';

interface EventFormData {
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

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialDate?: Date;
}

const EVENT_TYPES = [
  { id: 'urgent', color: colors.secondary.red, label: 'Urgent' },
  { id: 'regular', color: colors.secondary.gray, label: 'Regular' },
  { id: 'check-up', color: colors.secondary.coral, label: 'Check-up' },
  { id: 'consultation', color: colors.secondary.lightRed, label: 'Consult' },
] as const;

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialDate = new Date() }) => {
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

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.patientName) {
      Alert.alert('Error', 'Please select a date');
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
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1} 
            onPress={() => {
              setShowStartPicker(false);
              setShowEndPicker(false);
            }}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartPicker(false);
                      setShowEndPicker(false);
                    }}
                  >
                    <Text style={[styles.modalButtonText, { color: '#E74C3C' }]}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={[styles.modalButtonText, { fontWeight: '700' }]}>
                    {showStartPicker ? 'Select Start Time' : 'Select End Time'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartPicker(false);
                      setShowEndPicker(false);
                    }}
                  >
                    <Text style={[styles.modalButtonText, { color: colors.base.white }]}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.androidPickerContainer}>
                  <FlatList
                    data={times}
                    keyExtractor={(item) => item.toISOString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.timeItem,
                          {
                            backgroundColor: 
                              (showStartPicker && moment(item).isSame(formData.startDate, 'minute')) ||
                              (!showStartPicker && moment(item).isSame(formData.endDate, 'minute'))
                                ? '#444'
                                : 'transparent'
                          }
                        ]}
                        onPress={() => {
                          if (showStartPicker) {
                            handleTimeChange(item, true);
                          } else {
                            handleTimeChange(item, false);
                          }
                        }}
                      >
                        <Text style={styles.timeItemText}>
                          {moment(item).format('h:mm A')}
                        </Text>
                      </TouchableOpacity>
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
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }

    // iOS picker modal
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStartPicker || showEndPicker}
          onRequestClose={() => {
            setShowStartPicker(false);
            setShowEndPicker(false);
          }}
        >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1} 
            onPress={() => {
              setShowStartPicker(false);
              setShowEndPicker(false);
            }}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartPicker(false);
                      setShowEndPicker(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartPicker(false);
                      setShowEndPicker(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  testID={showStartPicker ? "startTimePicker" : "endTimePicker"}
                  value={showStartPicker ? formData.startDate : formData.endDate}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      handleTimeChange(selectedTime, showStartPicker);
                    }
                  }}
                  style={styles.iosDatePicker}
                  textColor="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onCancel}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.monthText}>January</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Event Name</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <Text style={[styles.label, styles.marginTop]}>Event Type</Text>
          <View style={styles.colorContainer}>
            {EVENT_TYPES.map((eventType) => (
              <View key={eventType.id} style={styles.colorWrapper}>
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: eventType.color },
                    formData.color === eventType.color && styles.selectedColor
                  ]}
                  onPress={() => setFormData({ 
                    ...formData, 
                    color: eventType.color,
                    type: eventType.id as EventType 
                  })}
                >
                  {formData.color === eventType.color && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.colorLabel,
                    formData.color === eventType.color && styles.selectedColorLabel
                  ]}
                >
                  {eventType.label}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, styles.marginTop]}>Patient Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.patientName}
            onChangeText={(text) => setFormData({ ...formData, patientName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />

          <Text style={[styles.sectionTitle, styles.marginTop]}>Event Time</Text>
          <Text style={styles.label}>Start</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.timeText}>
              {moment(formData.startDate).format('h:mm A')}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="white" />
          </TouchableOpacity>

          <Text style={[styles.label, styles.marginTop]}>End</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.timeText}>
              {moment(formData.endDate).format('h:mm A')}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="white" />
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.marginTop]}>Assigned Staff</Text>
          <View style={styles.staffContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>
            <Text style={styles.staffName}>{formData.assignedStaff}</Text>
          </View>

          <Text style={[styles.sectionTitle, styles.marginTop]}>Health Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="123456789"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.healthCardNumber}
            onChangeText={(text) => setFormData({ ...formData, healthCardNumber: text })}
            keyboardType="number-pad"
          />

          <Text style={[styles.sectionTitle, styles.marginTop]}>Meeting Details</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter meeting details"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.meetingDetails}
            onChangeText={(text) => setFormData(prev => ({ ...prev, meetingDetails: text }))}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.addButton, (!formData.title || !formData.patientName) && styles.addButtonDisabled]}
          onPress={handleSubmit}
          disabled={!formData.title || !formData.patientName || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.addButtonText}>Add Event</Text>
          )}
        </TouchableOpacity>
      </View>

      {renderDateTimePicker()}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.base.white} />
          <Text style={styles.loadingText}>Adding event...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.base.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.base.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 24,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    color: colors.base.white,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  timeButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: colors.base.white,
    fontSize: 16,
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '500',
  },
  staffName: {
    color: colors.base.white,
    fontSize: 16,
  },
  footer: {
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.primary.gray,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2C2C2E',
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
  iosDatePicker: {
    height: 200,
    backgroundColor: '#2C2C2E',
  },
  androidPickerContainer: {
    height: 300,
    backgroundColor: '#2C2C2E',
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
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  colorLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    textAlign: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: colors.base.white,
  },
  selectedColorLabel: {
    color: colors.base.white,
    fontWeight: '600',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
});

export default EventForm;
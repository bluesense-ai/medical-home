import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

interface EventFormData {
  title: string;
  patientName: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  assignedStaff: string;
  healthCardNumber: string;
  type: 'short' | 'meeting' | 'urgent' | 'regular';
  notes?: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  initialDate?: Date;
}

const EVENT_TYPES = [
  { id: 'short', label: 'Short Visit', color: '#E0E0E0' },
  { id: 'meeting', label: 'Meeting', color: '#FF6B6B' },
  { id: 'urgent', label: 'Urgent', color: '#FF0000' },
  { id: 'regular', label: 'Regular', color: '#FFB6C1' },
] as const;

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialDate = new Date() }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    patientName: '',
    email: '',
    phone: '',
    startDate: initialDate,
    endDate: moment(initialDate).add(1, 'hour').toDate(),
    assignedStaff: 'Dr. Sarah Johnson',
    healthCardNumber: '',
    type: 'regular',
    notes: '',
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.title || !formData.patientName) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Event</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Type</Text>
          <View style={styles.typeContainer}>
            {EVENT_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  formData.type === type.id && styles.typeButtonSelected,
                  { borderColor: type.color }
                ]}
                onPress={() => setFormData({ ...formData, type: type.id })}
              >
                <View style={[styles.typeColor, { backgroundColor: type.color }]} />
                <Text style={[
                  styles.typeButtonText,
                  formData.type === type.id && styles.typeButtonTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <View style={styles.timeSection}>
            <View style={styles.timeContainer}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowStartPicker(true)}
              >
                <Text style={styles.timeText}>
                  {moment(formData.startDate).format('h:mm A')}
                </Text>
                <Ionicons name="time-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowEndPicker(true)}
              >
                <Text style={styles.timeText}>
                  {moment(formData.endDate).format('h:mm A')}
                </Text>
                <Ionicons name="time-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.patientName}
            onChangeText={(text) => setFormData({ ...formData, patientName: text })}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Phone"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Health Card Number"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.healthCardNumber}
            onChangeText={(text) => setFormData({ ...formData, healthCardNumber: text })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Add any additional notes here..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={formData.startDate}
          mode="time"
          display="spinner"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) {
              setFormData({ ...formData, startDate: date });
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="time"
          display="spinner"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) {
              setFormData({ ...formData, endDate: date });
            }
          }}
        />
      )}
    </ScrollView>
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
    paddingVertical: 16,
    paddingTop: 90,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#247401',
  },
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  typeButtonSelected: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  typeColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  typeButtonText: {
    fontSize: 14,
    color: colors.base.white,
  },
  typeButtonTextSelected: {
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    color: colors.base.white,
    fontSize: 16,
  },
  timeSection: {
    flexDirection: 'row',
    gap: 16,
  },
  timeContainer: {
    flex: 1,
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  notesInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default EventForm; 
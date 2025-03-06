import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { EventType } from '../../store/useCalendarStore';

// Event type options
export const EVENT_TYPES = [
  { id: 'urgent', color: colors.main.error, label: 'Urgent' },
  { id: 'regular', color: colors.legacy.gray, label: 'Regular' },
  { id: 'check-up', color: colors.main.warning, label: 'Check-up' },
  { id: 'consultation', color: colors.alternativeLight.error, label: 'Consult' },
] as const;

// Event type selector props
export interface EventTypeSelectorProps {
  selectedType: EventType;
  selectedColor: string;
  onSelectType: (typeId: EventType, typeColor: string) => void;
  theme: string;
}

// Event type selector component
const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ 
  selectedType, 
  selectedColor, 
  onSelectType, 
  theme 
}) => {
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  
  return (
    <View>
      <Text style={styles.label}>Event Type</Text>
      <View style={styles.colorContainer}>
        {EVENT_TYPES.map((eventType) => (
          <View key={eventType.id} style={styles.colorWrapper}>
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: eventType.color },
                selectedColor === eventType.color && styles.selectedColor
              ]}
              onPress={() => onSelectType(eventType.id as EventType, eventType.color)}
            >
              {selectedColor === eventType.color && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </TouchableOpacity>
            <Text 
              style={[
                styles.colorLabel,
                selectedColor === eventType.color && styles.selectedColorLabel
              ]}
            >
              {eventType.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Light theme styles
const stylesLight = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
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
    color: 'rgba(0,0,0,0.7)',
    fontSize: 10,
    textAlign: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: colors.base.black,
  },
  selectedColorLabel: {
    color: colors.base.black,
    fontWeight: '600',
  },
});

// Dark theme styles
const stylesDark = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
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
});

export default EventTypeSelector; 
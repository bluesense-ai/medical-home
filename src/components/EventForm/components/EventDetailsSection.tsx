import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventType } from '../../../store/useCalendarStore';
import FormInput from '../FormInput';
import EventTypeSelector, { EVENT_TYPES } from '../EventTypeSelector';

/**
 * Props for EventDetailsSection component
 * @property {string} title - Current event title
 * @property {Function} onTitleChange - Function to call when title changes
 * @property {EventType} selectedType - Currently selected event type
 * @property {string} selectedColor - Color of the selected event type
 * @property {Function} onTypeSelect - Function to call when event type is selected
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface EventDetailsSectionProps {
  title: string;
  onTitleChange: (text: string) => void;
  selectedType: EventType;
  selectedColor: string;
  onTypeSelect: (typeId: EventType, typeColor: string) => void;
  theme: string;
}

/**
 * EventDetailsSection Component
 * 
 * This component provides the UI for managing event details including
 * title and event type
 */
const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  title,
  onTitleChange,
  selectedType,
  selectedColor,
  onTypeSelect,
  theme
}) => {
  const selectedTypeObj = EVENT_TYPES.find(type => type.id === selectedType);
  
  return (
    <View style={styles.container}>
      <FormInput
        label="Event Name"
        value={title}
        onChangeText={onTitleChange}
        placeholder="Enter event name"
        theme={theme}
      />
      
      <View style={styles.spacing} />
      
      <EventTypeSelector
        selectedType={selectedType}
        selectedColor={selectedColor}
        onSelectType={onTypeSelect}
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  spacing: {
    height: 16,
  }
});

export default EventDetailsSection; 
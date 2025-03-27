import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ParticipantSelector from '../ParticipantSelector';
import { colors } from '../../../theme/colors';

/**
 * Props for ParticipantSection component
 * @property {Array<string>} selectedParticipants - List of selected participants
 * @property {Function} onParticipantAdd - Function to call when a participant is added
 * @property {Function} onParticipantRemove - Function to call when a participant is removed
 * @property {string} theme - Current theme ('dark' or 'light')
 */
interface ParticipantSectionProps {
  selectedParticipants: string[];
  onParticipantAdd: (participant: string) => void;
  onParticipantRemove: (participant: string) => void;
  theme: string;
}

/**
 * ParticipantSection Component
 * 
 * This component handles the participant selection portion of the form,
 * allowing users to add and remove participants from the event
 */
const ParticipantSection: React.FC<ParticipantSectionProps> = ({
  selectedParticipants,
  onParticipantAdd,
  onParticipantRemove,
  theme
}) => {
  const isDark = theme === 'dark';
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.sectionTitle,
        isDark ? styles.darkText : styles.lightText
      ]}>
        Participants
      </Text>
      
      <ParticipantSelector
        selectedParticipants={selectedParticipants}
        onParticipantAdd={onParticipantAdd}
        onParticipantRemove={onParticipantRemove}
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  lightText: {
    color: colors.base.black,
  },
  darkText: {
    color: colors.base.white,
  }
});

export default ParticipantSection; 
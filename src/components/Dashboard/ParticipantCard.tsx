import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Event } from '../../store/useCalendarStore';
import { colors } from '../../theme/colors';

// Participant component props
interface ParticipantProps {
  name: string;
  initial: string;
}

// Participant component for displaying event participants
const Participant: React.FC<ParticipantProps> = ({ name, initial }) => {
  return (
    <View style={styles.participant}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>
          {name}
        </Text>
      </View>
    </View>
  );
};

// Action icon component props
interface ActionIconProps {
  icon: string;
  label: string;
}

// Action icon component
const ActionIcon: React.FC<ActionIconProps> = ({ icon, label }) => {
  return (
    <View style={styles.iconGroup}>
      <MaterialCommunityIcons 
        name={icon as any} 
        size={12} 
        color={colors.base.white} 
        style={styles.participantIcon} 
      />
      <Text style={styles.participantIconText}>
        {label}
      </Text>
    </View>
  );
};

interface ParticipantCardProps {
  event: Event;
  theme: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ event, theme }) => {
  // Action handlers
  const handleEdit = () => {
    console.log('Edit event');
  };
  
  const handleConsult = () => {
    console.log('Consult');
  };
  
  const handleHistory = () => {
    console.log('View history');
  };
  
  const handleContact = () => {
    console.log('Contact patient');
  };

  return (
    <View 
      style={[
        styles.participantsCard, 
        { backgroundColor: colors.main.secondary }
      ]}
    >
      <Participant 
        name={event.patientName} 
        initial={event.patientName.charAt(0).toUpperCase()} 
      />

      <Participant 
        name={event.assignedStaff} 
        initial={event.assignedStaff.charAt(0).toUpperCase()} 
      />

      <View style={styles.participantIcons}>
        <TouchableOpacity onPress={handleEdit}>
          <ActionIcon icon="pencil-outline" label="Edit" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConsult}>
          <ActionIcon icon="video-outline" label="Consult" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistory}>
          <ActionIcon icon="file-document-outline" label="History" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContact}>
          <ActionIcon icon="phone-outline" label="Contact" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  participantsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.base.white,
    fontSize: 18,
    fontWeight: '500',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    color: colors.base.white,
    fontSize: 12,
    fontWeight: 'normal',
  },
  participantIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantIcon: {
    marginRight: 4,
  },
  participantIconText: {
    color: colors.base.white,
    fontWeight: 'normal',
    fontSize: 12,
  }
});

export default ParticipantCard; 
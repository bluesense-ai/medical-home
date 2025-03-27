import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";

// Type definition for patient data
export interface Patient {
  id: string;
  name: string;
  lastVisit: string;
}

// Props interface for PatientCard component
interface PatientCardProps {
  patient: Patient;
  onPress: (patient: Patient) => void;
  theme: 'light' | 'dark';
}

/**
 * PatientCard Component
 * Displays individual patient information in a card format
 */
const PatientCard: React.FC<PatientCardProps> = ({ patient, onPress, theme }) => {
  const cardStyles = theme === 'dark' ? patientCardDark : patientCardLight;
  
  return (
    <TouchableOpacity 
      style={cardStyles.container}
      onPress={() => onPress(patient)}
      activeOpacity={0.7}
    >
      <Text style={cardStyles.name}>{patient.name}</Text>
      <Text style={cardStyles.date}>{patient.lastVisit}</Text>
    </TouchableOpacity>
  );
};

// Patient Card Light Theme Styles
const patientCardLight = StyleSheet.create({
  container: {
    backgroundColor: colors.base.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
  },
  date: {
    fontSize: 14,
    color: colors.base.darkGray,
  },
});

// Patient Card Dark Theme Styles
const patientCardDark = StyleSheet.create({
  container: {
    backgroundColor: colors.base.darkGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.white,
  },
  date: {
    fontSize: 14,
    color: colors.base.lightGray,
  },
});

export default PatientCard; 
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { colors } from "../../../theme/colors";
import PatientCard, { Patient } from "./PatientCard";

// Props interface for PatientList component
interface PatientListProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

/**
 * PatientList Component
 * Renders a list of patients with loading and empty states
 */
const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onPatientSelect, 
  isLoading, 
  theme 
}) => {
  // Show loading indicator when data is being fetched
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.main.primary} />
        <Text style={styles.loadingText}>Loading patients...</Text>
      </View>
    );
  }
  
  // Show message when no patients are found
  if (patients.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No patients found</Text>
      </View>
    );
  }
  
  // Render the list of patient cards
  return (
    <View style={styles.listContainer}>
      {patients.map(patient => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onPress={onPatientSelect}
          theme={theme}
        />
      ))}
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.base.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.base.white,
  },
});

export default PatientList; 
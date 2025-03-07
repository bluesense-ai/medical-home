import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { type Patient, patients } from "../../../data/patients";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { useTheme } from "../../../store/useTheme";

const VisitsWorkflow = () => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function handlePatientSelection(id: Patient["id"]) {
    navigation.navigate("AIVisitPatient", { id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visits Workflow</Text>
      </View>
      <View style={styles.patientsContainer}>
        <Text style={styles.patientsTitle}>Patients</Text>
        <ScrollView>
          {patients.map((patient, index) => (
            <TouchableOpacity
              key={index}
              style={styles.patientItem}
              onPress={() => {
                handlePatientSelection(patient.id);
              }}
            >
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientDate}>{patient.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f0f0f",
    borderRadius: 15,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  patientsContainer: {},
  patientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  patientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 16,
    color: "white",
  },
  patientDate: {
    fontSize: 16,
    color: "white",
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#33C213",
    borderRadius: 15,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  patientsContainer: {},
  patientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  patientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 16,
    color: "black",
  },
  patientDate: {
    fontSize: 16,
    color: "gray",
  },
});

export default VisitsWorkflow;

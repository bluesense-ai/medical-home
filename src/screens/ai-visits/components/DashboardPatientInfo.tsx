import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../../store/useTheme";

const DashboardPatientInfoForm = () => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;

  const [patientName, setPatientName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [plan, setPlan] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>(Last name, First name) Visit</Text>
        <TextInput
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date and Time</Text>
        <TextInput
          style={styles.input}
          value={dateTime}
          onChangeText={setDateTime}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Service Type</Text>
        <TextInput
          style={styles.input}
          value={serviceType}
          onChangeText={setServiceType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subjective</Text>
        <TextInput
          style={styles.inputArea}
          value={subjective}
          onChangeText={setSubjective}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Objective</Text>
        <TextInput
          style={styles.inputArea}
          value={objective}
          onChangeText={setObjective}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Plan</Text>
        <TextInput
          style={styles.inputArea}
          value={plan}
          onChangeText={setPlan}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.inputArea}
          value={plan}
          onChangeText={setPlan}
          multiline={true}
          numberOfLines={4}
        />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  inputArea: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    color: "white",
    height: 80,
    textAlignVertical: "top",
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#33C213",
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  inputArea: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    color: "white",
    height: 80,
    textAlignVertical: "top",
  },
});

export default DashboardPatientInfoForm;

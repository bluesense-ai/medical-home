import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const VisitsPatientInfoForm = () => {
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
          numberOfLines={4} // Adjust number of lines as needed
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Objective</Text>
        <TextInput
          style={styles.inputArea}
          value={objective}
          onChangeText={setObjective}
          multiline={true}
          numberOfLines={4} // Adjust number of lines as needed
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Plan</Text>
        <TextInput
          style={styles.inputArea}
          value={plan}
          onChangeText={setPlan}
          multiline={true}
          numberOfLines={4} // Adjust number of lines as needed
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.inputArea}
          value={plan}
          onChangeText={setPlan}
          multiline={true}
          numberOfLines={4} // Adjust number of lines as needed
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f0f0f",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center", // Center the title text
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "white", // Light text for contrast
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333", // Slightly lighter background for input fields
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  inputArea: {
    // Style for multiline input
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    color: "white",
    height: 80, // Adjust height as needed
    textAlignVertical: "top",
  },
});

export default VisitsPatientInfoForm;

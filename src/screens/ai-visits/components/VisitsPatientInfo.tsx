import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import type { Patient } from "../../../data/patients";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/Router";

type Props = {
  patient: Patient;
};

const VisitsPatientInfoForm: React.FC<Props> = ({ patient }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [patientName, setPatientName] = useState(patient.name);
  const [dateTime, setDateTime] = useState(patient.date);
  const [provider, setProvider] = useState("");
  const [clinic, setClinic] = useState("");
  const [assessment, setAssessment] = useState("");
  const [editable, setEditable] = useState(false);

  function onCancel() {
    setPatientName(patient.name);
    setDateTime(patient.date);
    setProvider("");
    setClinic("");
    setAssessment("");
    setEditable(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.backButton}>
          {editable ? (
            <Text style={styles.backButtonText} onPress={onCancel}>
              Cancel
            </Text>
          ) : (
            <Ionicons name="arrow-back" size={24} color="white" onPress={
              () => navigation.goBack() 
            } />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text
            style={editable ? styles.doneButtonText : styles.editButtonText}
            onPress={() => {
              setEditable(!editable);
            }}
          >
            {editable ? "Done" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {!editable && <Text style={styles.title}>Patient Information</Text>}
      {editable && <View style={{ marginTop: 30 }} />}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name & Last Name</Text>
        <TextInput
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
          editable={editable}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={dateTime}
          onChangeText={setDateTime}
          editable={editable}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Provider</Text>
        <TextInput
          style={styles.input}
          value={provider}
          onChangeText={setProvider}
          editable={editable}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Clinic</Text>
        <TextInput
          style={styles.inputArea}
          value={clinic}
          onChangeText={setClinic}
          multiline={true}
          numberOfLines={4} // Adjust number of lines as needed
          editable={editable}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Assessment</Text>
        <TextInput
          style={styles.inputArea}
          value={assessment}
          onChangeText={setAssessment}
          multiline={true}
          numberOfLines={4} // Adjust number of lines as needed
          editable={editable}
        />
      </View>

      {editable && (
        <TouchableOpacity
          style={{
            backgroundColor: "#DA4133",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Delete
          </Text>
        </TouchableOpacity>
      )}
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

  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {},
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
  doneButtonText: {
    color: "gray",
    fontSize: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
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

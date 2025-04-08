import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import type { Patient } from "../../../data/patients";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { useTheme } from "../../../store/useTheme";
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from "../../../theme/colors";

type Props = {
  patient: Patient;
};

const VisitsPatientInfoForm: React.FC<Props> = ({ patient }) => {
  const theme = useTheme((state) => state.theme);
  // const styles = theme === "dark" ? stylesDark : stylesLight;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [patientName, setPatientName] = useState(patient.name);
  const [dateTime, setDateTime] = useState(patient.date);
  const [provider, setProvider] = useState("");
  const [clinic, setClinic] = useState("");
  const [assessment, setAssessment] = useState("");
  const [editable, setEditable] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  function onCancel() {
    setPatientName(patient.name);
    setDateTime(patient.date);
    setProvider("");
    setClinic("");
    setAssessment("");
    setEditable(false);
  }

  const handleConfirmDate = (selectedDate: any) => {
    if (selectedDate) {
      // Convert date to YYYY-MM-DD format
      const dateObj = new Date(selectedDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDateTime(formattedDate);
      setShowDatePicker(false);
    }
  };

  // Open date picker only if the field is editable
  const handleDatePress = () => {
    if (editable) {
      setShowDatePicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.editContainer}>
        {editable ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.editibleCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.editibleDoneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity style={styles.backButton}>
          {editable ? (
            <Text style={styles.backButtonText} onPress={onCancel}>

            </Text>
          ) : (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          )}
        </TouchableOpacity>
        {!editable && (
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
        )}
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
        <TouchableOpacity 
          style={styles.input}
          onPress={handleDatePress}
          disabled={!editable}
        >
          <Text style={styles.dateTimeText}>{dateTime}</Text>
        </TouchableOpacity>
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
          numberOfLines={4}
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
          numberOfLines={4}
          editable={editable}
        />
      </View>

      {editable && (
        <TouchableOpacity
          style={{
            backgroundColor: "#DA4133",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
            Delete
          </Text>
        </TouchableOpacity>
      )}

      {/* Date Picker Modal */}
      <Modal
        transparent={true}
        visible={showDatePicker}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { padding: 0 }]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.modalCloseText}>Done</Text>
                </TouchableOpacity>
              </View>
              <CalendarPicker
                onDateChange={handleConfirmDate}
                maxDate={new Date()}
                minDate={new Date(1900, 0, 1)}
                selectedDayColor={colors.main.primary}
                selectedDayTextColor="#FFFFFF"
                todayBackgroundColor="transparent"
                months={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                textStyle={{
                  color: '#000000',
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#33C213",
    backgroundColor: "white",
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
    color: "black",
    fontSize: 16,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
    color: "black",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    color: "black",
    justifyContent: 'center',
    minHeight: 43,
  },
  dateTimeText: {
    color: 'black',
  },
  inputArea: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    color: "black",
    height: 80,
    textAlignVertical: "top",
  },
  buttonGroup: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
  },
  editibleCancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    color: '#004F62',
    padding: 10,
    borderRadius: 5,
  },
  editibleDoneButtonText: {
    color: '#004F62',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: colors.main.primary,
    fontWeight: "600",
  },
});

// const stylesDark = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#0f0f0f",
//     borderRadius: 10,
//   },

//   editContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   backButton: {
//     flexDirection: "row",
//   },
//   backButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   editButton: {},
//   editButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   doneButtonText: {
//     color: "gray",
//     fontSize: 16,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 40,
//     color: "white",
//     textAlign: "center",
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     color: "white",
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: "#333",
//     padding: 10,
//     borderRadius: 5,
//     color: "white",
//   },
//   inputArea: {
//     backgroundColor: "#333",
//     padding: 10,
//     borderRadius: 5,
//     color: "white",
//     height: 80,
//     textAlignVertical: "top",
//   },
// });

// const stylesLight = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#33C213",
//     borderRadius: 10,
//   },

//   editContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   backButton: {
//     flexDirection: "row",
//   },
//   backButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   editButton: {},
//   editButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   doneButtonText: {
//     color: "white",
//     fontSize: 16,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 40,
//     color: "white",
//     textAlign: "center",
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     color: "white",
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 5,
//     color: "black",
//   },
//   inputArea: {
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 5,
//     color: "black",
//     height: 80,
//     textAlignVertical: "top",
//   },
// });

export default VisitsPatientInfoForm;

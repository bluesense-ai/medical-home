import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Platform, ScrollView } from "react-native";
import { useTheme } from "../../../store/useTheme";
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from "../../../theme/colors";
import DateTimePicker from '@react-native-community/datetimepicker';

const DashboardPatientInfoForm = () => {
  const theme = useTheme((state) => state.theme);
  // const styles = theme === "dark" ? stylesDark : stylesLight;

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [plan, setPlan] = useState("");
  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showingPicker, setShowingPicker] = useState<'date' | 'time' | null>(null);

  const handleConfirmDate = (selectedDate: any) => {
    if (selectedDate) {
      // Convert date to YYYY-MM-DD format
      const dateObj = new Date(selectedDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
      
      // Automatically show time picker after selecting date
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
        setTimeout(() => {
          setShowingPicker('time');
          setShowTimePicker(true);
        }, 500);
      } else {
        setShowDatePicker(false);
        setShowingPicker('time');
        setShowTimePicker(true);
      }
    }
  };

  const handleConfirmTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const hours = String(selectedTime.getHours()).padStart(2, '0');
      const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setTime(formattedTime);
      setShowingPicker(null);
    }
  };

  // Combined date and time string
  const getDateTimeString = () => {
    if (date && time) {
      return `${date} ${time}`;
    } else if (date) {
      return `${date}`;
    } else if (time) {
      return `${time}`;
    }
    return "";
  };

  return (
    <ScrollView style={styles.scrollView}>
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
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setShowingPicker('date');
              setShowDatePicker(true);
            }}
          >
            <Text style={getDateTimeString() ? styles.inputText : styles.placeholderText}>
              {getDateTimeString() || "Select date and time"}
            </Text>
          </TouchableOpacity>
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

        <View style={styles.lastInputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.inputArea}
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Extra space at the bottom */}
        <View style={{ height: 100 }} />

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

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleConfirmTime}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  lastInputGroup: {
    marginBottom: 0, // Notes kısmının alt boşluğunu daha da arttırdık
  },
  label: {
    color: "black",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    color: "black",
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    minHeight: 45, // Input yüksekliğini sabitlemek için
  },
  inputText: {
    color: "black",
  },
  placeholderText: {
    color: "#666",
  },
  inputArea: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    color: "black",
    borderWidth: 2,
    borderColor: 'black',
    height: 80,
    textAlignVertical: "top",
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
//     borderRadius: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
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
//     borderRadius: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
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
//     color: "white",
//   },
//   inputArea: {
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 5,
//     color: "white",
//     height: 80,
//     textAlignVertical: "top",
//   },
// });

export default DashboardPatientInfoForm;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";
import { api } from "../../../api/fetch";
import moment from 'moment';

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "RegisterPage2">;

/**
 * RegisterPage2 Component
 * Second step of registration process
 */
const RegisterPage2 = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { healthCardNumber, clinicId } = props.route.params;

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("Male");
  const [pronouns, setPronouns] = useState("He/Him");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(imageSlideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(inputFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Shake animation function
  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleConfirmDate = (selectedDate: any) => {
    if (selectedDate) {
      // Tarihi YYYY-MM-DD formatına çeviriyoruz
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDateOfBirth(formattedDate);
      setShowDatePicker(false);
    }
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const handleNext = () => {
    if (!firstName || !lastName || !dateOfBirth || !sex) {
      Alert.alert("Error", "Please fill all required fields");
      shakeAnimation();
      return;
    }

    // Navigate to verification screen with form data
    navigation.navigate("RegisterVerification", {
      healthCardNumber,
      clinicId,
      firstName,
      lastName,
      dateOfBirth,
      sex,
      pronouns,
      patientId: ""
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader
          navigation={navigation}
          currentStep={2}
          totalSteps={4}
        />

        {/* Image Section - Animated */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: imageSlideAnim }]
            }
          ]}
        >
          <Image
            source={require("../../../../assets/images/bgimgrg2.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Card at the bottom of the screen */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.cardTitle}>Register</Text>

          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#666"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#666"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
                {dateOfBirth ? dateOfBirth : "DD/MM/YYYY"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Gender</Text>
            <TouchableOpacity
              style={styles.genderInput}
              onPress={() => setShowGenderPicker(true)}
            >
              <Text style={[styles.genderText, !sex && styles.placeholderText]}>
                {sex || "Select your gender"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Modal
          transparent={true}
          visible={showDatePicker}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, { padding: 0 }]}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Date of Birth</Text>
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
                  selectedDayColor="#006699"
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

        <Modal
          transparent={true}
          visible={showGenderPicker}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={() => setShowGenderPicker(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Gender</Text>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setShowGenderPicker(false)}
                  >
                    <Text style={styles.modalCloseText}>Done</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSex("Male");
                    setPronouns("He/Him");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSex("Female");
                    setPronouns("She/Her");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSex("Other");
                    setPronouns("They/Them");
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.45,
    alignSelf: "center",
    marginTop: 46,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.65,
    backgroundColor: colors.main.primary,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 8,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  dateInput: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "black",
  },
  genderInput: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderText: {
    fontSize: 16,
    color: "black",
  },
  placeholderText: {
    color: "#666",
  },
  dropdownIcon: {
    fontSize: 14,
    color: "black",
  },
  nextButton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 28,
    bottom: 30,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    color: "#2196F3",
    fontWeight: "600",
  },
  modalOption: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 16,
    color: "black",
  },
});

export default RegisterPage2;

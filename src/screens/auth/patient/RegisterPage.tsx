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
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";
import { api } from "../../../api/fetch";
import { useClinics } from "../../../api/auth";

const { height, width } = Dimensions.get("window");

// Clinic type definition
interface Clinic {
  id: string;
  name: string;
  status?: string;
}

// Status component for clinic availability
const ClinicStatus = ({ status }: { status: string }) => {
  const isAccepting = status !== "Not accepting patients";

  return (
    <View style={styles.statusContainer}>
      <View style={[
        styles.statusDot,
        { backgroundColor: isAccepting ? "#32CD32" : "#FF3B30" }
      ]} />
      <Text style={styles.statusText}>
        Status: {status}
      </Text>
    </View>
  );
};

// Status note component
const StatusNote = () => (
  <Text style={styles.statusNote}>
    If we don't have availability when you register, you will be notified when we assign you a new provider.
  </Text>
);

// Clinic selector component
const ClinicSelector = ({
  selectedName,
  onPress
}: {
  selectedName: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.clinicSelector}
    onPress={onPress}
  >
    <Text style={styles.clinicText}>
      {selectedName || "Select a clinic"}
    </Text>
    <View style={styles.dropdownIcon}>
      <Text style={{ color: "black" }}>▼</Text>
    </View>
  </TouchableOpacity>
);

// Clinic item component for modal
const ClinicItem = ({
  clinic,
  onSelect
}: {
  clinic: Clinic;
  onSelect: (id: string, name: string, status: string) => void;
}) => (
  <TouchableOpacity
    style={styles.clinicItem}
    onPress={() => onSelect(
      clinic.id,
      clinic.name,
      clinic.status || "Available"
    )}
  >
    <Text style={styles.clinicItemText}>{clinic.name}</Text>
    <View style={[
      styles.clinicStatusDot,
      { backgroundColor: clinic.status === "Not accepting patients" ? "#FF3B30" : "#32CD32" }
    ]} />
  </TouchableOpacity>
);

/**
 * RegisterPage Component
 * First step of registration process
 */
const RegisterPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Form state
  const [healthCardNumber, setHealthCardNumber] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [selectedClinicName, setSelectedClinicName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [clinicStatus, setClinicStatus] = useState("Available");

  // Fetch clinics from API
  const { data: clinicsResponse, isLoading: isLoadingClinics } = useClinics();
  // Safely extract clinic data and ensure it's an array
  const clinics: Clinic[] = Array.isArray(clinicsResponse)
    ? clinicsResponse.map(clinic => ({
      id: clinic.id || "",
      name: clinic.name || "",
      status: clinic.status
    }))
    : [];

  // API mutation for checking health card
  const { mutate, isPending } = api.useMutation(
    "post",
    "/auth/patient-login",
    {
      onSuccess: (response: any) => {
        // Successful response, health card is already registered
        Alert.alert(
          "Account Found",
          "This health card is already registered. You will be redirected to login.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("WeFoundYou", {
                  healthCardNumber,
                  otpChannel: "email",
                  patientId: response.patientId
                });
              }
            }
          ]
        );
      },
      onError: (error: any) => {
        // If error is 403 (Invalid Credentials), health card is not found
        // In this case, we can proceed with registration
        if (error?.status === 403 || error?.message?.includes("Invalid Credentials") || error?.error?.includes("Invalid Credentials")) {
          console.log("Health card not found, proceeding with registration");
          // Health card not found, proceed with registration
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: 100,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Navigate to next screen with parameters
            navigation.navigate("RegisterPage2", {
              healthCardNumber,
              clinicId: selectedClinicId
            });
          });
        } else {
          // Other API errors
          console.error("API Error:", error);
          Alert.alert(
            "Error",
            error?.error || "Failed to verify health card"
          );
          // Shake animation for error
          shakeAnimation();
        }
      },
    }
  );

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

  const handleNext = () => {
    if (!healthCardNumber || healthCardNumber.length < 3) {
      Alert.alert("Error", "Please enter a valid health card number");
      shakeAnimation();
      return;
    }

    if (!selectedClinicId) {
      Alert.alert("Error", "Please select a clinic");
      shakeAnimation();
      return;
    }

    // Call API to check if health card number is already registered
    mutate({
      body: {
        healthCardNumber: healthCardNumber.trim(),
        otpChannel: "email"
      }
    });
  };

  const selectClinic = (id: string, name: string, status: string = "Available") => {
    setSelectedClinicId(id);
    setSelectedClinicName(name);
    setClinicStatus(status);
    setModalVisible(false);
  };

  // Render clinic selection modal
  const renderClinicModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Clinic</Text>

          {isLoadingClinics ? (
            <ActivityIndicator size="large" color={colors.main.primary} />
          ) : (
            <FlatList
              data={clinics}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ClinicItem
                  clinic={item}
                  onSelect={selectClinic}
                />
              )}
            />
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader
          navigation={navigation}
          currentStep={1}
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
          <Text style={styles.cardSubTitle}>Provide your health card number</Text>

          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Health Card Number"
              placeholderTextColor={colors.base.lightGray}
              value={healthCardNumber}
              onChangeText={setHealthCardNumber}
              keyboardType="numeric"
            />

            <Text style={styles.clinicLabel}>Chose your clinic</Text>

            <ClinicSelector
              selectedName={selectedClinicName}
              onPress={() => setModalVisible(true)}
            />

            {selectedClinicId && (
              <ClinicStatus status={clinicStatus} />
            )}

            {selectedClinicId && clinicStatus === "Not accepting patients" && (
              <StatusNote />
            )}

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.nextButtonText}>Next</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Clinic Selection Modal */}
        {renderClinicModal()}
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
    height: height * 0.55,
    // backgroundColor: colors.main.primary,
    backgroundColor: '#004F62',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  cardSubTitle: {
    width: width * 0.8,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "white",
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
  clinicLabel: {
    fontSize: 16,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
  },
  clinicSelector: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  clinicText: {
    fontSize: 16,
    color: "black",
  },
  dropdownIcon: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "white",
  },
  statusNote: {
    width: "90%",
    fontSize: 12,
    color: "white",
    marginBottom: 20,
    textAlign: "left",
  },
  nextButton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.main.primary,
  },
  clinicItem: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clinicItemText: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
  clinicStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.main.primary,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterPage;

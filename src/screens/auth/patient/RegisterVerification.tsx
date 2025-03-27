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
} from "react-native";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";
import { usePatientRegister } from "../../../api/mutations";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "RegisterVerification">;

/**
 * RegisterVerification Component
 * Third step of registration process
 * Collects contact information and verification preferences
 */
const RegisterVerification = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    healthCardNumber,
    clinicId,
    firstName,
    lastName,
    dateOfBirth,
    sex,
    pronouns,
  } = props.route.params;

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Form state
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms">(
    "sms"
  );

  // API mutation for patient registration
  const { mutate, isPending } = usePatientRegister();

  // Initialize animations when component mounts
  useEffect(() => {
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
    if (!email || !phoneNumber) {
      Alert.alert("Error", "Please fill all required fields");
      shakeAnimation();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      shakeAnimation();
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      shakeAnimation();
      return;
    }

    // Call API to register patient
    mutate(
      {
        body: {
          firstName,
          lastName,
          dateOfBirth,
          healthCardNumber,
          preferredClinicId: clinicId,
          mobileNumber: phoneNumber,
          emailAddress: email,
          otpChannel: verificationMethod,
          sex,
          // @ts-ignore - missing?
          pronouns,
        },
      },
      {
        onSuccess: (response) => {
          if (response?.success) {
            // Navigate to verification code screen
            navigation.navigate("VerificationCode", {
              patientId: response.patientId!,
              otpChannel: verificationMethod,
            });
          } else {
            Alert.alert("Error", response?.message || "Failed to register");
            shakeAnimation();
          }
        },
        onError: (error) => {
          console.error("API Error:", error);
          Alert.alert("Error", error?.error || "Failed to register");
          shakeAnimation();
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader navigation={navigation} currentStep={3} totalSteps={4} />

        {/* Image Section - Animated */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: imageSlideAnim }],
            },
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
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.cardTitle}>Register</Text>

          <Animated.View
            style={{
              opacity: inputFadeAnim,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <Text style={styles.inputLabel}>
              How would you like to verify your account?
            </Text>

            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setVerificationMethod("sms")}
              >
                <View style={styles.radioCircle}>
                  {verificationMethod === "sms" && (
                    <View style={styles.selectedRadio} />
                  )}
                </View>
                <Text style={styles.radioText}>Phone number</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setVerificationMethod("email")}
              >
                <View style={styles.radioCircle}>
                  {verificationMethod === "email" && (
                    <View style={styles.selectedRadio} />
                  )}
                </View>
                <Text style={styles.radioText}>Email address</Text>
              </TouchableOpacity>
            </View>

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
  radioContainer: {
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
  radioText: {
    color: "white",
    fontSize: 16,
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
});

export default RegisterVerification;

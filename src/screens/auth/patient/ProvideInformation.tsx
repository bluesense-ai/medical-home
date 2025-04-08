import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";
import { usePatientLogin } from "../../../api/mutations";

const { height, width } = Dimensions.get("window");

const ProvideInformation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const imageSlideAnim = useRef(new Animated.Value(20)).current;
  const inputFadeAnim = useRef(new Animated.Value(0)).current;

  const [healthCardNumber, setHealthCardNumber] = useState("");
  const [otpChannel] = useState("email");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { mutate, isPending, error } = usePatientLogin();
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

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        // Slide the card up when keyboard appears
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        // Slide the card back down when keyboard hides
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  /**
   * Animation helpers
   */
  const shakeAnimation = (animValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animValue, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]);
  };

  const fadeOutAnimation = (animValue: Animated.Value) => {
    return Animated.parallel([
      Animated.timing(animValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);
  };

  /**
   * Validates health card number format
   * Health card number must be between 9 and 11 characters
   */
  const validateHealthCardNumber = (number: string) => {
    if (!number) return false;
    return number.length >= 9 && number.length <= 11;
  };

  /**
   * Handle form submission
   * Validates input and makes API call
   */
  const handleSubmit = () => {
    // Validate health card number
    if (!validateHealthCardNumber(healthCardNumber)) {
      Alert.alert("Error", "Health card number must be between 9 and 11 characters");
      shakeAnimation(slideAnim).start();
      return;
    }

    // Proceed with login
    mutate(
      {
        body: {
          healthCardNumber: healthCardNumber,
          otpChannel: otpChannel,
        },
      },
      {
        onSuccess: (data) => {
          console.log("Login success, patient ID:", data.patientId);
          // Animate out before navigation
          fadeOutAnimation(fadeAnim).start(() => {
            navigation.navigate("WeFoundYou", {
              healthCardNumber: healthCardNumber,
              otpChannel: otpChannel,
              patientId: data.patientId as string,
            });
          });
        },
        onError: () => {
          // Shake animation for error
          shakeAnimation(slideAnim).start();
          Alert.alert(
            "Error",
            "Could not find a patient with this health card number."
          );
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader navigation={navigation} currentStep={1} totalSteps={5} />

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
            source={require("../../../../assets/images/bgimgrg.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Card at the bottom of the screen - Animated */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.cardTitle}>Provide your information</Text>
          <Text style={styles.cardSubTitle}>
            We use your health card number to find your information in our
            system
          </Text>

          <Animated.View
            style={{
              opacity: inputFadeAnim,
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your health card number"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={healthCardNumber}
              onChangeText={setHealthCardNumber}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
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
    height: height * 0.5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 46,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.5,
    backgroundColor: colors.main.primary,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  submitButton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.main.secondary, // Green color for the submit button
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProvideInformation;

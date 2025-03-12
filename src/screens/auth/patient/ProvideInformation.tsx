import React, { useState, useEffect, useRef } from "react";
import {
  View,
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
import { api } from "../../../api/fetch";
import { colors } from "../../../theme/colors";

const { height, width } = Dimensions.get("window");

interface LoginResponse {
  success: boolean;
  patientId: string;
}

interface LoginRequest {
  healthCardNumber: string;
  otpChannel: "sms" | "email";
}

interface ApiError {
  error: string;
  success: false;
}

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

  const { mutate, isPending, error } = api.useMutation(
    "post",
    "/auth/patient-login",
    {
      onSuccess: (response: any) => {
        if (!response?.patientId) {
          Alert.alert("Error", "Patient ID not found");
          return;
        }

        // Animate out before navigation
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
          navigation.navigate("WeFoundYou", {
            healthCardNumber,
            otpChannel: "email",
            patientId: response.patientId
          });
        });
      },
      onError: (error: any) => {
        console.error("API Error:", error);
        if (error?.status === 403 || error?.message?.includes("Invalid Credentials")) {
          navigation.navigate("WantToRegister");
        } else {
          Alert.alert(
            "Error",
            error?.error || "Failed to verify health card"
          );
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

    // Keyboard listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
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
      'keyboardDidHide',
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

  const handleSubmit = async () => {
    if (!healthCardNumber || healthCardNumber.length < 5) {
      Alert.alert("Error", "Please enter a valid health card number");
      
      // Shake animation for empty input
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
      return;
    }

    // Prepare data for API call
    mutate({
      body: {
        healthCardNumber: healthCardNumber.trim(),
        otpChannel: "email"
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader
          navigation={navigation}
          currentStep={2}
          totalSteps={5}
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
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.cardTitle}>Provide your information</Text>
          <Text style={styles.cardSubTitle}>
            We use your health card number to find your information in our system
          </Text>
          
          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
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

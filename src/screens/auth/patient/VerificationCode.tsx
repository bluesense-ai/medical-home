import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";
import { api } from "../../../api/fetch";
import { useUserStore } from "../../../store/useUserStore";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "VerificationCode">;

const VerificationCode = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { patientId, otpChannel } = props.route.params;
  const setUser = useUserStore((state) => state.setUser);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  const [accessCode, setAccessCode] = useState("");

  // API verification function
  const [isVerifying, setIsVerifying] = useState(false);

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

  const verifyAccessCode = async () => {
    if (!accessCode) {
      Alert.alert("Error", "Please enter the access code");
      shakeAnimation();
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch(
        `https://sandbox-backend.medicalhome.cloud/api/auth/access_code_verification_patient/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessCode,
            otpChannel
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        const userData = {
          id: data.data.id,
          first_name: data.data.first_name || "",
          middle_name: data.data.middle_name,
          last_name: data.data.last_name || "",
          pronouns: data.data.pronouns,
          sex: data.data.sex,
          picture: data.data.picture,
          date_of_birth: data.data.date_of_birth || "",
          email_address: data.data.email_address || "",
          health_card_number: data.data.health_card_number || "",
          phone_number: data.data.phone_number || "",
          registered: data.data.registered || false,
          preferred_clinic_id: data.data.preferred_clinic_id || "",
          marital_status: data.data.marital_status,
          address: data.data.address,
          city_id: data.data.city_id,
          country_id: data.data.country_id,
          postal_code: data.data.postal_code,
          preferred_provider_type: data.data.preferred_provider_type,
          access_token: data.data.access_token || ""
        };
        
        setUser(userData);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        Alert.alert("Error", data.message || "Verification failed");
        shakeAnimation();
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Verification failed. Please try again.");
      shakeAnimation();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = () => {
    verifyAccessCode();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader
          navigation={navigation}
          currentStep={4}
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
          <Text style={styles.cardTitle}>Verification</Text>
          <Text style={styles.cardSubTitle}>Enter the access code provided</Text>
          
          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Access Code"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={accessCode}
              onChangeText={setAccessCode}
              keyboardType="numeric"
              maxLength={6}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator color="white" />
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
    textAlign: "center",
  },
  submitButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#32CD32",
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

export default VerificationCode;

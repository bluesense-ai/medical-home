import { useState, useEffect, useRef } from "react";
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelectedProvider } from "../../../store/useProvider";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { useTheme } from "../../../store/useTheme";
import { colors } from "../../../theme/colors";
import {
  shakeAnimation,
  transitionInAnimation,
  fadeOutAnimation,
} from "../../../utils/animations";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useVerifyProviderAccessCode } from "../../../api/mutations";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "LoginSwitchVerification">;

/**
 * LoginSwitchVerification Component
 * Handles verification code input for login
 * with updated design
 */
const LoginSwitchVerification = (props: Props) => {
  const {
    navigation,
    route: { params },
  } = props;

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Code input reference
  const codeInputRef = useRef<TextInput>(null);
  
  // Code state
  const [accessCode, setAccessCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  
  const provider = useSelectedProvider((state) => state.provider);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => {
      codeInputRef.current?.focus();
    }, 500);
  }, []);

  // Start countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isResending]);

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations
    transitionInAnimation(fadeAnim, slideAnim, inputFadeAnim);
  }, []);

  const { mutate, isPending } = useVerifyProviderAccessCode();

  const handleVerification = async () => {
    if (accessCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit verification code");
      // Shake animation for empty input
      shakeAnimation(slideAnim).start();
      return;
    }

    mutate(
      {
        body: {
          accessCode: accessCode,
          otpChannel: params.otpChannel,
          username: params.userName,
        },
      },
      { onSuccess, onError }
    );
  };

  function onSuccess(response: any) {
    // Animate out before navigation
    fadeOutAnimation(fadeAnim).start(() => {
      Alert.alert("Success", "Access code verified!");

      // Save provider data to store
      const userData = response?.data;
      if (userData) {
        if (provider === "doctor") {
          navigation.reset({
            index: 0,
            routes: [{ name: "DashboardScreen" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
          });
        }
      }
    });
  }

  function onError() {
    // Shake animation for error
    shakeAnimation(slideAnim).start();
    Alert.alert("Error", "Invalid verification code. Please try again.");
    
    // Clear input
    setAccessCode("");
    codeInputRef.current?.focus();
  }
  
  const handleResend = () => {
    if (timer > 0) return;
    
    setIsResending(true);
    // Reset timer
    setTimer(60);
    
    setTimeout(() => {
      setIsResending(false);
      Alert.alert("Success", "Verification code resent successfully");
    }, 1500);
  };

  // Only apply theme to the container background
  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkTheme ? colors.base.darkGray : colors.base.white,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={containerStyle}>
        <AuthHeader navigation={navigation} currentStep={2} totalSteps={5} />
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("../../../../assets/images/ProviderLogin2.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Card at the bottom of the screen */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.cardTitle}>Verification</Text>
          <Text style={styles.inputSubtitle}>
            Find your access code via SMS in your phone or via email
          </Text>

          <Animated.View
            style={{
              opacity: inputFadeAnim,
              width: "100%",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Access Code</Text>
              <TextInput
                ref={codeInputRef}
                style={styles.input}
                placeholder=""
                keyboardType="number-pad"
                maxLength={6}
                value={accessCode}
                onChangeText={setAccessCode}
                onSubmitEditing={handleVerification}
              />
            </View>

            <Pressable
              style={styles.submitButton}
              onPress={handleVerification}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </Pressable>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 30,
    height: 414,
    marginTop: 30,
    borderRadius: 15,
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
    height: height * 0.5,
    paddingBottom: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
    paddingTop: 30,
    paddingBottom: 24,
    textAlign: "center",
  },
  inputSubtitle: {
    fontSize: 14,
    color: colors.base.darkGray,
    marginBottom: 20,
    textAlign: 'center',
    width: width * 0.8,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "85%",
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.base.darkGray,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 43,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.base.darkGray,
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: "regular",
    color: colors.base.black,
  },
  submitButton: {
    width: "85%",
    height: 50,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginSwitchVerification;

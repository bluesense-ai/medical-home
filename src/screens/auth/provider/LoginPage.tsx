import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
} from "react-native";
import { useTheme } from "../../../store/useTheme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { useProviderLogin } from "../../../api/mutations";
import {
  shakeAnimation,
  transitionInAnimation,
  transitionOutAnimation,
} from "../../../utils/animations";
import { colors } from "../../../theme/colors";
import AuthHeader from "../../../components/Header/AuthHeader";

const { height, width } = Dimensions.get("window");

/**
 * Login Screen Component
 * Handles user authentication with animated UI elements
 * while preserving the original design
 */
const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(height * 0.1))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Form state
  const [userName, setUserName] = useState("");
  const [otpChannel, setOtpChannel] = useState("sms");

  // API mutation hook
  const { mutate, isPending } = useProviderLogin();

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations using the animation utility
    transitionInAnimation(fadeAnim, slideAnim, inputFadeAnim);
  }, []);

  /**
   * Toggle OTP channel between SMS and Email
   */
  const toggleOtpChannel = () => {
    setOtpChannel(otpChannel === "sms" ? "email" : "sms");
  };

  /**
   * Handle login submission
   * Validates input and triggers API call
   */
  const handleLogin = async () => {
    if (!userName) {
      // Shake animation for empty input using the animation utility
      shakeAnimation(slideAnim).start();
      Alert.alert("Error", "Please enter a username");
      return;
    }

    mutate(
      { body: { username: userName, otpChannel } },
      {
        onSuccess: () => {
          // Animate out before navigation using the animation utility
          transitionOutAnimation(fadeAnim, slideAnim, () => {
            navigation.navigate("LoginSwitchVerification", {
              userName,
              otpChannel,
            });
          });
        },
        onError: () => {
          // Shake animation for error
          shakeAnimation(slideAnim).start();
          Alert.alert(
            "Error",
            "An error occurred during login. Please try again."
          );
        },
      }
    );
  };

  // Only apply theme to the container background
  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkTheme ? colors.base.darkGray : colors.base.white,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={containerStyle}>
        <AuthHeader navigation={navigation} currentStep={1} totalSteps={4} />
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("../../../../assets/images/ProviderLogin1.png")}
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
          <Text style={styles.cardTitle}>Log In</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputSubtitle}>Enter your username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor={colors.base.gray}
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Verification method - only visible in developer mode */}
            {__DEV__ && (
              <View style={styles.otpChannelContainer}>
                <Text style={styles.otpChannelLabel}>
                  Verification method:
                </Text>
                <View style={styles.otpButtonsContainer}>
                  <Pressable
                    style={[
                      styles.otpButton,
                      otpChannel === "sms" && styles.otpButtonActive,
                    ]}
                    onPress={() => setOtpChannel("sms")}
                  >
                    <Text
                      style={[
                        styles.otpButtonText,
                        otpChannel === "sms" && styles.otpButtonTextActive,
                      ]}
                    >
                      SMS
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.otpButton,
                      otpChannel === "email" && styles.otpButtonActive,
                    ]}
                    onPress={() => setOtpChannel("email")}
                  >
                    <Text
                      style={[
                        styles.otpButtonText,
                        otpChannel === "email" && styles.otpButtonTextActive,
                      ]}
                    >
                      Email
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            <Pressable
              style={styles.submitButton}
              onPress={handleLogin}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Next</Text>
              )}
            </Pressable>
          </View>
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
    marginTop: 31,
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
    fontWeight: "medium",
    lineHeight: 42,
    color: "black",
    paddingTop: 56,
    paddingBottom: 49,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputSubtitle: {
    fontSize: 14,
    color: colors.base.darkGray,
    marginBottom: 12,
    textAlign: 'left',
  },
  input: {
    width: "100%",
    height: 43,
    backgroundColor: colors.base.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.base.black,
    borderWidth: 1,
    borderColor: colors.base.darkGray,
  },
  otpChannelContainer: {
    marginBottom: 30,
  },
  otpChannelLabel: {
    fontSize: 14,
    color: colors.base.darkGray,
    marginBottom: 12,
  },
  otpButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  otpButton: {
    flex: 1,
    backgroundColor: colors.base.white,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.base.lightGray,
  },
  otpButtonActive: {
    backgroundColor: colors.main.primary,
    borderColor: colors.main.primary,
  },
  otpButtonText: {
    color: colors.base.darkGray,
    fontWeight: '500',
    fontSize: 14,
  },
  otpButtonTextActive: {
    color: colors.base.white,
  },
  submitButton: {
    width: "100%",
    height: 44,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 35,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;

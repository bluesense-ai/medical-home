import { useState, useEffect } from "react";
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
 * while preserving the original design
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

  const [accessCode, setAccessCode] = useState("");
  const provider = useSelectedProvider((state) => state.provider);

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations
    transitionInAnimation(fadeAnim, slideAnim, inputFadeAnim);
  }, []);

  const { mutate, isPending } = useVerifyProviderAccessCode();

  const handleVerification = async () => {
    if (!accessCode) {
      Alert.alert("Error", "Please enter the access code");
      // Shake animation for empty input
      shakeAnimation(slideAnim).start();
      return;
    }

    mutate(
      {
        body: {
          accessCode,
          otpChannel: params.otpChannel,
          username: params.userName,
        },
      },
      { onSuccess, onError }
    );
  };

  function onSuccess() {
    // Animate out before navigation
    fadeOutAnimation(fadeAnim).start(() => {
      Alert.alert("Success", "Access code verified!");

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
    });
  }

  function onError() {
    // Shake animation for error
    shakeAnimation(slideAnim).start();
    Alert.alert("Error", "Invalid verification code. Please try again.");
  }

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

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Access Code"
                placeholderTextColor={colors.base.lightGray}
                value={accessCode}
                onChangeText={setAccessCode}
                keyboardType="numeric"
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
    fontFamily: "roboto-medium",
    lineHeight: 42,
    color: "black",
    paddingTop: 56,
    paddingBottom: 24,
  },
  inputSubtitle: {
    fontSize: 14,
    fontFamily: "roboto-regular",
    color: colors.base.lightGray,
    marginBottom: 37,
    textAlign: 'center',
    width: width * 0.7,
    paddingHorizontal: 30,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  inputGroup: {
    marginBottom: 76,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.base.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.base.black,
    borderWidth: 1,
    borderColor: colors.base.darkGray,
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

export default LoginSwitchVerification;

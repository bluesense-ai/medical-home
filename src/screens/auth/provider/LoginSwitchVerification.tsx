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
          <Text style={styles.creditSubTitle}>
            Find your access code via SMS in your phone or via email
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
              placeholder="Access Code"
              placeholderTextColor="grey"
              value={accessCode}
              onChangeText={setAccessCode}
              keyboardType="numeric"
            />

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
    width: 333,
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
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  creditSubTitle: {
    width: width * 0.8,
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 45,
  },
  input: {
    alignContent: "center",
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  submitButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#32CD32",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 35,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginSwitchVerification;

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
import { useProviderLogin } from "../../../api/auth";
import { 
  shakeAnimation, 
  transitionInAnimation, 
  transitionOutAnimation 
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
  const [userName, setLocalUsername] = useState("");
  const [otpChannel, setOtpChannel] = useState("email");

  // API mutation hook
  const { mutate, isPending } = useProviderLogin();

  // Initialize animations when component mounts
  useEffect(() => {
    // Start animations using the animation utility
    transitionInAnimation(fadeAnim, slideAnim, inputFadeAnim);
  }, []);

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
          Alert.alert("Error", "An error occurred during login. Please try again.");
        }
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
        <AuthHeader 
          navigation={navigation}
          currentStep={1}
          totalSteps={5}
        />
        <Animated.View 
          style={[
            styles.imageContainer,
            { opacity: fadeAnim }
          ]}
        >
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
              opacity: fadeAnim
            }
          ]}
        >
          <Text style={styles.cardTitle}>Log In</Text>
          <Text style={styles.creditSubTitle}>Enter your username</Text>
          
          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              placeholderTextColor="black"
              value={userName}
              onChangeText={setLocalUsername}
              autoCapitalize="none"
            />
            
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
    flex: 1,
    alignSelf: "center",
    width: width * 0.9,
    marginTop: 150,
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
    height: height * 0.4,
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

export default Login;

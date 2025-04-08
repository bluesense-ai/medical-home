import React, { useState, useEffect, useRef } from "react";
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
import { useVerifyPatientAccessCode } from "../../../api/mutations";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "VerificationCode">;

const VerificationCode = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

  // Code input references
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);
  const input5Ref = useRef<TextInput>(null);
  const input6Ref = useRef<TextInput>(null);
  
  // Code state
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");
  const [code6, setCode6] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  // Focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      input1Ref.current?.focus();
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

  // Start animations when component mounts
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

  const { mutate, isPending } = useVerifyPatientAccessCode();

  const handleVerify = () => {
    const fullCode = `${code1}${code2}${code3}${code4}${code5}${code6}`;
    
    if (fullCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete verification code");
      shakeAnimation().start();
      return;
    }

    mutate(
      {
        params: { 
          path: { uid: props.route.params.patientId } 
        },
        body: {
          accessCode: fullCode,
          otpChannel: props.route.params.otpChannel,
        },
      },
      {
        onSuccess: () => {
          fadeOutAnimation().start(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainTabs" }],
            });
          });
        },
        onError: () => {
          Alert.alert("Error", "Invalid verification code");
          shakeAnimation().start();
          
          // Clear inputs and focus first input
          setCode1("");
          setCode2("");
          setCode3("");
          setCode4("");
          setCode5("");
          setCode6("");
          input1Ref.current?.focus();
        },
      }
    );
  };

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

  // Animation functions
  const shakeAnimation = () => {
    return Animated.sequence([
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
    ]);
  };

  const fadeOutAnimation = () => {
    return Animated.parallel([
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
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <AuthHeader navigation={navigation} currentStep={5} totalSteps={5} />

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
            resizeMode="contain"
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
          <Text style={styles.cardTitle}>Verification</Text>
          <Text style={styles.cardSubTitle}>
            Enter the access code provided
          </Text>

          <Animated.View
            style={{
              opacity: inputFadeAnim,
              width: "100%",
              alignItems: "center",
            }}
          >
            {/* Single Access Code Input */}
            <TextInput
              style={styles.accessCodeInput}
              placeholder="Access Code"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="number-pad"
              secureTextEntry={false}
              maxLength={6}
              value={`${code1}${code2}${code3}${code4}${code5}${code6}`}
              onChangeText={(text) => {
                // Split text into individual characters
                const chars = text.split('');
                
                // Update state for each character
                setCode1(chars[0] || '');
                setCode2(chars[1] || '');
                setCode3(chars[2] || '');
                setCode4(chars[3] || '');
                setCode5(chars[4] || '');
                setCode6(chars[5] || '');
              }}
              onSubmitEditing={handleVerify}
            />

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.verifyButtonText}>Submit</Text>
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
  accessCodeInput: {
    width: "90%",
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "transparent",
    color: "white",
    fontSize: 16,
    textAlign: "left",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  verifyButton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VerificationCode;


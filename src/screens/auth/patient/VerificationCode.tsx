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
          <Text style={styles.cardTitle}>Verification Code</Text>
          <Text style={styles.cardSubTitle}>
            Enter the 6-digit verification code we sent to your 
            {props.route.params.otpChannel === "email" ? " email" : " phone"}
          </Text>

          <Animated.View
            style={{
              opacity: inputFadeAnim,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={styles.codeContainer}>
              <TextInput
                ref={input1Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code1}
                onChangeText={(text) => {
                  setCode1(text);
                  if (text) input2Ref.current?.focus();
                }}
              />
              <TextInput
                ref={input2Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code2}
                onChangeText={(text) => {
                  setCode2(text);
                  if (text) input3Ref.current?.focus();
                  else if (text === "") input1Ref.current?.focus();
                }}
              />
              <TextInput
                ref={input3Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code3}
                onChangeText={(text) => {
                  setCode3(text);
                  if (text) input4Ref.current?.focus();
                  else if (text === "") input2Ref.current?.focus();
                }}
              />
              <TextInput
                ref={input4Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code4}
                onChangeText={(text) => {
                  setCode4(text);
                  if (text) input5Ref.current?.focus();
                  else if (text === "") input3Ref.current?.focus();
                }}
              />
              <TextInput
                ref={input5Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code5}
                onChangeText={(text) => {
                  setCode5(text);
                  if (text) input6Ref.current?.focus();
                  else if (text === "") input4Ref.current?.focus();
                }}
              />
              <TextInput
                ref={input6Ref}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={code6}
                onChangeText={(text) => {
                  setCode6(text);
                  if (text) Keyboard.dismiss();
                  else if (text === "") input5Ref.current?.focus();
                }}
                onSubmitEditing={handleVerify}
              />
            </View>

            <TouchableOpacity style={styles.resendContainer} onPress={handleResend}>
              <Text style={[styles.resendText, timer > 0 && styles.disabledText]}>
                {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify</Text>
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  resendContainer: {
    marginBottom: 20,
  },
  resendText: {
    color: colors.main.secondary,
    fontSize: 16,
  },
  disabledText: {
    color: "rgba(255, 255, 255, 0.5)",
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


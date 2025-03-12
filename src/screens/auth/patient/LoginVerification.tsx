import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { api } from "../../../api/fetch";
import { colors } from "../../../theme/colors";
import { 
  shakeAnimation, 
  transitionInAnimation, 
  transitionOutAnimation 
} from "../../../utils/animations";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "LoginVerification">;

const LoginVerification = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];
  const inputFadeAnim = useState(new Animated.Value(0))[0];

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

  const { mutate, isPending } = api.useMutation("post", "/auth/patient-login", {
    onError: (error, variables) => {
      console.error(error, variables);
      // Shake animation for error
      shakeAnimation(slideAnim).start();
    },
  });

  const handleSubmit = (kind: "email" | "sms") => {
    if (kind === "email") {
      // Animate out before navigation
      transitionOutAnimation(fadeAnim, slideAnim, () => {
        navigation.navigate("VerificationCode", {
          patientId: props.route.params.patientId,
          otpChannel: "email",
        });
      });
    }

    if (kind === "sms") {
      mutate(
        {
          body: {
            healthCardNumber: props.route.params.healthCardNumber,
            otpChannel: "sms",
          },
        },
        {
          onSuccess: (data) => {
            // Animate out before navigation
            transitionOutAnimation(fadeAnim, slideAnim, () => {
              navigation.navigate("VerificationCode", {
                patientId: data.patientId!,
                otpChannel: "sms",
              });
            });
          },
        }
      );
    }
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
            resizeMode="contain"
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
          <Text style={styles.cardSubTitle}>Choose your Verification method</Text>
          
          <Animated.View style={{ opacity: inputFadeAnim, width: "100%", alignItems: "center" }}>
            <Pressable
              style={styles.phoneButton}
              onPress={() => handleSubmit("sms")}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Phone Number</Text>
              )}
            </Pressable>
            
            <Pressable
              style={styles.emailButton}
              onPress={() => handleSubmit("email")}
              disabled={isPending}
            >
              <Text style={[styles.buttonText, styles.emailButtonText]}>Email Address</Text>
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
  phoneButton: {
    width: "90%",
    height: 50,
    backgroundColor: colors.main.secondary,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  emailButton: {
    width: "90%",
    height: 50,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emailButtonText: {
    color: "white",
  },
});

export default LoginVerification;

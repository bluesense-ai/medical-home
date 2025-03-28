import React, { useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import { colors } from "../../theme/colors";
import Toggle from "../../components/Toggle/Toggle";
import AuthButton from "../../components/Buttons/AuthButton";
import WelcomeHeader from "../../components/Header/WelcomeHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useSelectedProvider } from "../../store/useProvider";
import { useTheme } from "../../store/useTheme";
import { usePatientStore, useProviderStore } from "../../store/useUserStore";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const providerState = useSelectedProvider((state) => state.provider);
  const toggleProvider = useSelectedProvider((state) => state.toggleProvider);

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const provider = useProviderStore((state) => state.provider);
  const patient = usePatientStore((state) => state.patient);

  // Store animation values in useRef to prevent unnecessary re-renders
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    // Start all animations at once
    Animated.parallel([
      // Content animations
      Animated.sequence([
        // Fade out and slide
        Animated.parallel([
          Animated.timing(contentFadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: providerState === "doctor" ? 50 : -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      toggleProvider();
      // Move content to new position
      slideAnim.setValue(providerState === "doctor" ? -50 : 50);

      // Fade in and slide animation
      Animated.parallel([
        Animated.timing(contentFadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLogin = () => {
    if (providerState == "patient") {
      if (__DEV__ && patient) {
        console.log("Fast login as patient:", patient);
        navigation.navigate("MainTabs");
        return;
      }
      navigation.navigate("ProvideInformation");
    } else {
      if (__DEV__ && provider) {
        console.log("Fast login as provider:", provider);
        navigation.navigate("DashboardScreen");
        return;
      }
      navigation.navigate("LoginPage");
    }
  };

  const handleRegister = () => {
    navigation.navigate("RegisterPage");
  };

  // Image transition animation
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(4000),
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(4000),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={styles.toggleContainer}>
            <Toggle
              isEnabled={providerState === "doctor"}
              text={providerState === "doctor" ? "Provider" : "Patient"}
              onToggle={toggleSwitch}
            />
          </View>
        </View>

        <Animated.View
          style={{
            flex: 1,
            opacity: contentFadeAnim,
            transform: [{ translateX: slideAnim }],
          }}
        >
          <WelcomeHeader
            title="Hello!"
            subtitle="Welcome to medical home."
            titleColor="black"
            subtitleColor="black"
          />

          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Animated.Image
                source={require("../../../assets/images/welcome.png")}
                style={[
                  styles.welcomeImage,
                  { opacity: fadeAnim1 },
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={require("../../../assets/images/doctor-patient.png")}
                style={[
                  styles.welcomeImage,
                  { opacity: fadeAnim2 },
                ]}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={[
            styles.buttonContainer,
            providerState === "doctor" ? styles.providerButtonContainer : styles.patientButtonContainer
          ]}>
            <AuthButton
              title="Log in"
              onPress={handleLogin}
              variant={providerState === "doctor" ? undefined : "outline"}
              style={providerState === "doctor" ? styles.providerLoginButton : undefined}
              textStyle={providerState === "doctor" ? styles.providerLoginButtonText : undefined}
            />

            {providerState === "patient" && (
              <AuthButton title="Register" onPress={handleRegister} />
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  topBar: {
    paddingHorizontal: 32,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleContainer: {
    alignItems: "flex-end",
  },
  imageWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 63,
  },
  imageContainer: {
    width: '100%',
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    bottom: 30,
    justifyContent: "center",
    gap: 16,
  },
  providerButtonContainer: {
    paddingBottom: 27,
  },
  patientButtonContainer: {
    paddingBottom: 20,
  },
  providerLoginButton: {
    backgroundColor: colors.main.secondary,
  },
  providerLoginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.base.white,
  },
});

export default WelcomeScreen;

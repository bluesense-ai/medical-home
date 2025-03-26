import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors } from "../../theme/colors";
import Toggle from "../../components/Toggle/Toggle";
import AuthButton from "../../components/Buttons/AuthButton";
import WelcomeHeader from "../../components/Header/WelcomeHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useProvider } from "../../store/useProvider";
import { useTheme } from "../../store/useTheme";
import { useUserStore } from "../../store/useUserStore";

const WelcomeScreen: React.FC = () => {
  const provider = useProvider((state) => state.provider);
  const toggleProvider = useProvider((state) => state.toggleProvider);
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const user = useUserStore((state) => state.user);

  // Store animation values in useRef to prevent unnecessary re-renders
  const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;

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
            toValue: provider === "doctor" ? 50 : -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Provider change animation
        Animated.timing(bgColorAnim, {
          toValue: provider === "doctor" ? 0 : 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      toggleProvider();
      // Move content to new position
      slideAnim.setValue(provider === "doctor" ? -50 : 50);

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
    if (provider == "patient") {
      // if (user && user.preferred_clinic_id) {
      //   navigation.navigate("MainTabs");
      //   return;
      // }
      navigation.navigate("ProvideInformation");
    }
    if (provider == "doctor") {
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
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(3000),
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(3000),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.base.white, colors.base.darkGray],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View style={styles.toggleContainer}>
            <Toggle
              isEnabled={provider === "doctor"}
              text={provider === "doctor" ? "Provider" : "Patient"}
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
          {provider === "patient" && (
            <WelcomeHeader
              title="Hello!"
              subtitle="Welcome to medical home."
              titleColor="black"
              subtitleColor="black"
            />
          )}

          <View style={styles.imageContainer}>
            <Animated.Image
              source={require("../../../assets/images/welcome.png")}
              style={[
                styles.welcomeImage,
                { opacity: fadeAnim1, position: "absolute" },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={require("../../../assets/images/doctor-patient.png")}
              style={[
                styles.welcomeImage,
                { opacity: fadeAnim2, position: "absolute" },
              ]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonContainer}>
            <AuthButton
              title="Log in"
              onPress={handleLogin}
              variant="outline"
              style={provider === "doctor" ? styles.doctorButton : undefined}
              textStyle={
                provider === "doctor" ? styles.doctorButtonText : undefined
              }
            />

            {provider === "patient" && (
              <AuthButton title="Register" onPress={handleRegister} />
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleContainer: {
    alignItems: "flex-end",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    justifyContent: "center",
    flex: 1,
    paddingBottom: 40,
    gap: 16,
  },
  doctorButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.legacy.lightGray,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorButtonText: {
    fontSize: 20,
    fontWeight: "semibold",
    color: colors.base.black,
  },
});

export default WelcomeScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import GreenProfile from "../../../components/Svg/GreenProfile";
import { colors } from "../../../theme/colors";

const { height, width } = Dimensions.get("window");

const WantToRegister = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const slideDown = Animated.timing(imageSlideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    });

    // Start initial animations
    Animated.parallel([fadeIn, slideDown]).start();

    const showContentTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setCurrentStep(3);
    }, 2000);

    return () => {
      clearTimeout(showContentTimer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        navigation={navigation}
        currentStep={currentStep}
        totalSteps={4}
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
      <View style={styles.card}>
        <View style={styles.overlay}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.main.secondary} />
          ) : showContent ? (
            <Animated.View
              style={{
                opacity: fadeAnim,
                width: "100%",
                alignItems: "center",
              }}
            >
              <GreenProfile
                width={50}
                height={30}
                style={{ marginBottom: 20 }}
              />
              <Text style={styles.title}>Want to register?</Text>
              <Text style={styles.description}>
                Your health card is not in our database. If you are a
                current patient, you should try verifying and introducing
                your health card again. Otherwise, feel free to register!
              </Text>

              {/* Buttons Row */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <View style={styles.backButtonContent}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                    <Text style={styles.backButtonText}>Back</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => navigation.navigate("RegisterPage")}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
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
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.main.secondary,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    width: width * 0.8,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "white",
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "transparent",
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: colors.main.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WantToRegister;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming Expo, adjust if needed
import AuthHeader from "../../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import GreenProfile from "../../../components/Svg/GreenProfile";

const { height, width } = Dimensions.get("window");

const WantToRegister = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setCurrentStep(3);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <AuthHeader
        navigation={navigation}
        currentStep={currentStep}
        totalSteps={4}
      />

      <View style={styles.whiteBackground}>
        {/* Top Image with rounded corners */}
        <View style={styles.topImageWrapper}>
          <ImageBackground
            source={require("../../../../assets/images/bgimgrg2.jpg")}
            style={styles.topImage}
          />
        </View>

        {/* Bottom Image slightly overlaying Top Image */}
        <View style={styles.bottomImageWrapper}>
          <ImageBackground
            source={require("../../../../assets/images/bgimgrg2.jpg")}
            style={styles.bottomImage}
          >
            <View style={styles.overlay}>
              {loading ? (
                <ActivityIndicator size="large" color="#32CD32" />
              ) : (
                <>
                  <GreenProfile />
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          Back
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() => navigation.navigate("RegisterPage")}
                    >
                      <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7, // 70% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top: height * 0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width,
    height: height * 0.57, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.02, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  svgPlaceholder: {
    width: 50,
    height: 30,
    backgroundColor: "#32CD32",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#32CD32",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  backButton: {
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: "40%",
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default WantToRegister;

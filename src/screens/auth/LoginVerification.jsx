import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useAuthStore } from "../../store/useAuthStore";
import VerificationCodeLogin from "./VerificationCodeLogin";

const { height, width } = Dimensions.get("window");

const LoginVerification = ({ navigation }) => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  // async
  const handleSubmit = () => {
    navigation.navigate("VerificationCodeLogin");

    // await
    setIsAuthenticated(false); // Önce authentication'ı güncelle
    // Sonra navigasyonu yap
  };

  return (
    <View style={styles.container}>
      {/* Background Image covering only the bottom half */}
      <ImageBackground
        source={require("../../../assets/bgimgrg.png")}
        style={styles.topImage}
      />

      <ImageBackground
        source={require("./image.jpg")}
        style={styles.imageBackground}
      >
        {/* Form Overlay */}
        <View style={styles.overlay}>
          {/* Heading */}
          <Text style={styles.title}>Verification</Text>

          {/* Health Card Number Field */}
          <Text style={styles.label}>Choose your Verification method</Text>

          <Pressable style={styles.registerButtonPhone} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>Phone Number</Text>
          </Pressable>
          {/* Register Button */}
          <Pressable style={styles.registerButtonEmail} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>Email Address</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Push everything to the bottom
  },
  imageBackground: {
    width: width,
    height: height * 0.5, // Cover only bottom half of the screen
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  topImage: {
    width: width * 0.7,
    alignSelf: "center",
    height: height * 0.6, // Covers 60% of the screen
    position: "absolute", // Keeps it fixed at the top
    top: 0,
    margin: "40px",
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  label: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 35,
    marginLeft: "5%",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white",
    marginBottom: 90,
    borderWidth: 1,
    borderColor: "white",
  },
  registerButtonEmail: {
    width: "88%", // Make button the same width as the TextInput
    height: 50, // Adjust the height of the button
    backgroundColor: "transparent", // Parrot Green color
    borderColor: "gray",
    justifyContent: "center",
    borderRadius: 25, // Apply border radius for rounded corners
    alignItems: "center",
    borderWidth: 1, // Border thickness (1px)

    marginTop: 0, // Add space between button and previous field
    marginBottom: 80,
  },
  registerButtonPhone: {
    width: "88%", // Make button the same width as the TextInput
    height: 50, // Adjust the height of the button
    backgroundColor: "#32CD32", // Parrot Green color
    justifyContent: "center",
    borderRadius: 25, // Apply border radius for rounded corners
    alignItems: "center",
    marginTop: 0, // Add space between button and previous field
    marginBottom: 30,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginVerification;

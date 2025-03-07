import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import AuthHeader from "../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "RegisterPage2">;

const LoginVerification = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  // async
  const handleSubmit = () => {
    navigation.navigate("VerificationCode", {
      clinicId: props.route.params.clinicId,
      otpChannel: "email",
    });

    // await
    setIsAuthenticated(false); // Önce authentication'ı güncelle
    // Sonra navigasyonu yap
  };

  return (
    <View style={styles.container}>
      {/* Background Image covering only the bottom half */}
      <View style={styles.whiteBackground}>
        <AuthHeader
          navigation={navigation}
          currentStep={4} // You can dynamically set this value based on your logic
          totalSteps={4} // Total steps in your process
        />
        <View style={styles.topImageWrapper}>
          <ImageBackground
            source={require("../../../assets/bgimgrg2.jpg")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.bottomImageWrapper}>
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

              <Pressable
                style={styles.registerButtonPhone}
                onPress={handleSubmit}
              >
                <Text style={styles.registerButtonText}>Phone Number</Text>
              </Pressable>
              {/* Register Button */}
              <Pressable
                style={styles.registerButtonEmail}
                onPress={handleSubmit}
              >
                <Text style={styles.registerButtonText}>Email Address</Text>
              </Pressable>
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
    justifyContent: "flex-end", // Push everything to the bottom
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
    height: height * 0.8, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.2, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: height * 0.7,
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
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LoginVerification;

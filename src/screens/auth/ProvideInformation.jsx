import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons (install if not already installed)'
import AuthHeader from "../../components/Header/AuthHeader";
import WeFoundYou from "./WeFoundYou";

// import StepIndicator from "react-native-step-indicator";

// const labels = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

// const customStyles = {
//   stepIndicatorSize: 20,
//   currentStepIndicatorSize: 25,
//   separatorStrokeWidth: 3,
//   stepStrokeWidth: 2,
//   stepIndicatorFinishedColor: "green",
//   stepIndicatorUnFinishedColor: "gray",
//   separatorFinishedColor: "green",
//   separatorUnFinishedColor: "gray",
//   stepIndicatorCurrentColor: "green",
// };

const { height, width } = Dimensions.get("window"); // Get device dimensions

const ProvideInformation = ({ navigation }) => {
  const realNumber = 123;
  const [healthCardNumber, setHealthCardNumber] = useState();

  return (
    <View style={styles.container}>
   

      <AuthHeader
        navigation={navigation}
        currentStep={1} // You can dynamically set this value based on your logic
        totalSteps={5} // Total steps in your process
      />

      <View style={styles.whiteBackground}>
        {/* Top Image covering 70% of the screen (Empty) */}
                <View style={styles.topImageWrapper}>
        
        <ImageBackground
          source={require("../../../assets/bgimgrg.png")}
          style={styles.topImage}
        />
</View>
        {/* Bottom Image covering 50% but overlapping 30% on top image */}
                <View style={styles.bottomImageWrapper}>
        
        <ImageBackground
          source={require("./image.jpg")}
          style={styles.bottomImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>
              Provide Your {"\n"}
              {" Information"}
            </Text>
            <Text style={styles.subtitle}>
              We use health card number to find {"\n"}{" "}
              {"  your information in our system"}{" "}
            </Text>
            <TextInput
              onChangeText={(text) => /^\d*$/.test(text) ? setHealthCardNumber(text) : null}
              style={styles.textInput}
              placeholder="Enter your information"
              placeholderTextColor="white"
              keyboardType="numeric" // Shows numeric keyboard on focus

            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (parseInt(healthCardNumber) == realNumber) {
                  navigation.navigate("WeFoundYou");
                } else {
                  navigation.navigate("WantToRegister"); //
                }
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
    backgroundColor: "transparent",
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7, // 70% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top:height*0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width ,
    height: height * 0.57, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.4, // Overlaps 20% of the top image
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
  title: {
    fontSize: 40,
    // fontWeight: '',
    color: "white",
    // marginBottom: 70,
    marginTop: "0",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: "20",
    marginBottom: "30",
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    color: "white",
    backgroundColor: "transparent", // Light background for better readability
    borderColor: "white",
    marginBottom: 50,
  },
  button: {
    width: "88%", // Make button the same width as the TextInput
    height: 50, // Adjust the height of the button
    backgroundColor: "#32CD32", // Parrot Green color
    justifyContent: "center",
    borderRadius: 25, // Apply border radius for rounded corners
    alignItems: "center",
    marginTop: 0, // Add space between button and previous field
    marginBottom: 30,
  },
  buttonText: {
    color: "white", // Button text color
    fontSize: 18, // Text size
    alignSelf:'center',
    fontWeight: "bold", // Make the text bold
  },
  header: {
    height: 100, // Increase height
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  iconContainer: {
    width: 40, // Fixed width for icons
    alignItems: "center", // Center icons
  },
  centerTextContainer: {
    flex: 1, // Take up remaining space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  centerText: {
    fontSize: 40,
    color: "black", // Make text visible
  },
});

export default ProvideInformation;

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
import { Ionicons } from "@expo/vector-icons"; // For icons (install if not already installed)
import StepIndicator from "react-native-step-indicator";

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
  const [healthCardNumber, setHealthCardNumber] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Step Indicator - Wrap it in a flexible View */}
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* <StepIndicator
      customStyles={customStyles}
      currentPosition={0} // Make sure this is dynamic later
      labels={labels}
    /> */}

          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>
              <Text style={{ color: "green" }}>_</Text>{" "}
              {/* First step in green */}
              <Text> _ _ _ _</Text> {/* Remaining steps in default black */}
            </Text>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.iconContainer}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.whiteBackground}>
        {/* Top Image covering 70% of the screen (Empty) */}
        <ImageBackground
          source={require("../../../assets/bgimgrg.png")}
          style={styles.topImage}
        />

        {/* Bottom Image covering 50% but overlapping 30% on top image */}
        <ImageBackground
          source={require("./image.jpg")}
          style={styles.bottomImage}
        >
          <View style={styles.overlayBottom}>
            <Text style={styles.title}>
              Provide Your {"\n"}
              {" Information"}
            </Text>
            <Text style={styles.subtitle}>
              We use health card number to find {"\n"}{" "}
              {"  your information in our system"}{" "}
            </Text>
            <TextInput
              onChange={(text) => {
                setHealthCardNumber(text);
              }}
              style={styles.textInput}
              placeholder="Enter your information"
              placeholderTextColor="white"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (healthCardNumber === realNumber) {
                  navigation.navigate("WantToRegister");
                } else {
                  navigation.navigate("WeFoundYou");
                }
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topImage: {
    width: width * 0.7,
    height: height * 0.7, // Covers 70% of the screen
    alignSelf: "center", // Center the image horizontally
    marginTop: 0, // No space on top
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomImage: {
    width: width,
    height: height * 0.5, // Covers bottom half of the screen
    position: "absolute",
    bottom: 0, // Anchored at the bottom
  },
  overlayBottom: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better contrast
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

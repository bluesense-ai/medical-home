import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
// import processbar from '../../../assets/'

type AuthHeaderProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  currentStep: number;
  totalSteps: number;
};

const AuthHeader = ({ navigation, currentStep, totalSteps }: AuthHeaderProps) => {
  // Calculate the width of the green bar as a percentage of the current step
  const progress = (currentStep / totalSteps) * 100;

  // Array of image sources for each step
  const stepImages = [
    require("../../../assets/processbar1.jpg"), // Image for step 1
    require("../../../assets/processbar2.jpg"), // Image for step 2
    require("../../../assets/processbar3.jpg"), // Image for step 3
    require("../../../assets/processbar4.jpg"), // Image for step 4
    require("../../../assets/processbar5.jpg"), // Image for step 5
  ];

  // Get the image for the current step
  const currentImage = stepImages[currentStep - 1];

  return (
    <View style={styles.Authheader}>
      {/* Back Arrow */}
      {/* {currentStep ? ( */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      {/* ) : null} */}

      {/* Progress Bar and Image */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.centerContainer}>
          {/* Display the image for the current step */}
          <Image source={currentImage} style={styles.image} />

          {/* Progress bar
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progress}%` }, // Dynamic width based on current step
              ]}
            />
          </View> */}
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.iconContainer}
      >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Authheader: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingStart:30,
    // paddingVertical:20,s
    paddingHorizontal: 15,
    position: "absolute", // Keeps it fixed at the top
    top: 0,
    width: "100%",
    zIndex: 10, // Ensures it stays on top of other elements
  },
  iconContainer: {
    marginTop:5,
    width: 30,
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    marginTop:10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    
    width: 150, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    resizeMode: "contain", // Ensures the image fits within the dimensions
  },
  progressContainer: {
    width: "100%",
    height: 5,
    backgroundColor: "#e0e0e0", // Light gray background for the progress bar
    marginTop: 10,
    borderRadius: 3,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green", // Green progress bar
    borderRadius: 3,
  },
});

export default AuthHeader;
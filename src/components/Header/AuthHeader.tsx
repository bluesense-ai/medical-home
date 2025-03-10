import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthHeaderProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  currentStep: number;
  totalSteps: number;
};

const AuthHeader = ({ navigation, currentStep, totalSteps }: AuthHeaderProps) => {
  // Generate step indicators (only bars, no numbers)
  const renderStepIndicators = () => {
    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View 
          key={i} 
          style={[
            styles.stepIndicator,
            i === currentStep ? styles.activeStep : null
          ]}
        />
      );
    }
    return indicators;
  };

  return (
    <View style={styles.authHeader}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Progress Indicators - Only Bars */}
      <View style={styles.progressContainer}>
        <View style={styles.stepsContainer}>
          {renderStepIndicators()}
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Welcome")}
        style={styles.iconContainer}
      >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authHeader: {
    height: 60,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
    marginTop: 40,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  stepIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: "#32CD32",
  },
});

export default AuthHeader;
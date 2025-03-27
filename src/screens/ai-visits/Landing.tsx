import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ImageSourcePropType,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../store/useTheme";
import { useState } from "react";

interface AIVisitsLandingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AIVisitsLanding: React.FC<AIVisitsLandingScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme((state) => state.theme);
  // const styles = theme === "dark" ? stylesDark : stylesLight;

  const patient = {
    name: "Patient Name",
    additionalContext: "Add any aditional context about the patient",
  };

  function action() {
    navigation.navigate("AIVisitsDashboard");
  }


  return (
    <ImageBackground
      source={require("../../../assets/images/dashboard-background.svg")}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <View style={styles.content}>
          <View style={styles.actionContainer}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.actionButtonGroup} onPress={action}>
                <Text style={styles.actionButtonText}>Dictation</Text>
                <Ionicons name="chevron-down" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <Text style={styles.patientName}>{patient.name}</Text> */}
          <TextInput style={styles.patientName} placeholder="Patient Name"></TextInput>
          <Text style={styles.headlines}>
            Add any aditional context about the patient
          </Text>
          <TextInput
            style={styles.additionalContext}
            multiline
            placeholder="Type Here..."
            textAlignVertical="top"
          />
          <Text style={styles.headlines}>Dictation Results</Text>
          <TextInput
            style={styles.dictationResults}
            multiline
            placeholder="Type Here..."
            textAlignVertical="top"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  imageStyle: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#004F62",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  actionButtonGroup: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#3499D6",
    padding: 12,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },
  actionButtonText: {
    color: "black",
    fontWeight: "500",
  },
  actionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  patientName: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: "gray",
    fontWeight: "500",
  },
  headlines: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
  },
  additionalContext: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200
  },
  dictationResults: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 400,
  },
})


// const stylesDark = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//   },
//   imageStyle: {
//     opacity: 0.5,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#272727",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: "flex-start",
//   },
//   actionButtonGroup: {
//     flexWrap: "wrap",
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 12,
//     paddingTop: 1,
//     paddingBottom: 1,
//     borderRadius: 8,
//     alignItems: "center",
//     gap: 10,
//   },
//   actionButtonText: {
//     color: "black",
//     fontWeight: "500",
//   },
//   actionContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   patientName: {
//     marginTop: 12,
//     backgroundColor: "#0F0F0F",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     color: "#F2F8FF",
//     fontWeight: "500",
//   },
//   additionalContext: {
//     color: "#717171",
//     marginTop: 12,
//   },
// });

// const stylesLight = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//   },
//   imageStyle: {
//     opacity: 0.5,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: "flex-start",
//   },
//   actionButtonGroup: {
//     flexWrap: "wrap",
//     flexDirection: "row",
//     backgroundColor: "#3499D6",
//     padding: 12,
//     paddingTop: 1,
//     paddingBottom: 1,
//     borderRadius: 8,
//     alignItems: "center",
//     gap: 10,
//   },
//   actionButtonText: {
//     color: "black",
//     fontWeight: "500",
//   },
//   actionContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   patientName: {
//     marginTop: 12,
//     backgroundColor: "#33C213",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     color: "#F2F8FF",
//     fontWeight: "500",
//   },
//   additionalContext: {
//     color: "#717171",
//     marginTop: 12,
//   },
// });

export default AIVisitsLanding;

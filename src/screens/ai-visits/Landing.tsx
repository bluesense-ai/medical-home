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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../store/useTheme";

interface AIVisitsLandingScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AIVisitsLanding: React.FC<AIVisitsLandingScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;

  const patient = {
    name: "Patient Name",
    additionalContext: "Add any aditional context about the patient",
  };

  function action() {
    navigation.navigate("AIVisitsDashboard");
  }

  return (
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
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.additionalContext}>
          {patient.additionalContext}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272727",
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
    backgroundColor: "#fff",
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
    backgroundColor: "#0F0F0F",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: "#F2F8FF",
    fontWeight: "500",
  },
  additionalContext: {
    color: "#717171",
    marginTop: 12,
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#33C213",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: "#F2F8FF",
    fontWeight: "500",
  },
  additionalContext: {
    color: "#717171",
    marginTop: 12,
  },
});

export default AIVisitsLanding;

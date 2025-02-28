import { StackNavigationProp } from "@react-navigation/stack";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { RootStackParamList } from "../../navigation/Router";
import DashboardPatientInfoForm from "./components/DashboardPatientInfo";
import { Header } from "./components/Header";

interface AIVisitsDashboardScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AIVisitsDashboard: React.FC<AIVisitsDashboardScreenProps> = ({
  navigation,
}) => {
  function action() {
    navigation.navigate("AIVisitsPage");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Header title="Dashboard" action={action} />
        <DashboardPatientInfoForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  inputStyle: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
    color: "#D9D9D9",
  },
});

export default AIVisitsDashboard;

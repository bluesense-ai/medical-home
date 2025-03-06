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
import { useTheme } from "../../store/useTheme";

interface AIVisitsDashboardScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AIVisitsDashboard: React.FC<AIVisitsDashboardScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;

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
});

export default AIVisitsDashboard;

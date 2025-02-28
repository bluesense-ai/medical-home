import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/Router";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { Header } from "./components/Header";
import VisitsPatientInfo from "./components/VisitsPatientInfo";

type AIVisitPatientScreenProps = StackNavigationProp<
  RootStackParamList,
  "AIVisitPatient"
>;

const AIVisitPatient: React.FC<AIVisitPatientScreenProps> = (props) => {
  console.log(props);
  function action() {}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Header title="Visits" action={action} />
        <VisitsPatientInfo />
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

export default AIVisitPatient;

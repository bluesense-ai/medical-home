import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/Router";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { Header } from "./components/Header";
import VisitsPatientInfo from "./components/VisitsPatientInfo";
import { patients } from "../../data/patients";

type Props = StackScreenProps<RootStackParamList, "AIVisitPatient">;

const AIVisitPatient: React.FC<Props> = (props) => {
  const patientId = props.route.params.id;
  const patient = patients.find((p) => p.id === patientId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Header title="Visits" action={() => {}} />
        {!patient ? (
          <Text>Patient not found</Text>
        ) : (
          <VisitsPatientInfo patient={patient} />
        )}
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

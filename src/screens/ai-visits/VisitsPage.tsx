import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { Header } from "./components/Header";
import VisitsWorkflow from "./components/VisitsWorkflow";
import { useTheme } from "../../store/useTheme";

interface AIVisitsPageScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const AIVisitsPage: React.FC<AIVisitsPageScreenProps> = () => {
  const theme = useTheme((state) => state.theme);
  // const styles = theme === "dark" ? stylesDark : stylesLight;

  function action() { }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Header title="Visits" action={action} />
        <VisitsWorkflow />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

// const stylesDark = StyleSheet.create({
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
// });

// const stylesLight = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },

//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: "flex-start",
//   },
// });

export default AIVisitsPage;

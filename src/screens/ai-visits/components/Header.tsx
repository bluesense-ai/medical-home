import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../../../theme/colors";
import { useTheme } from "../../../store/useTheme";

type HeaderProps = {
  title: string;
  action: () => void;
};

export function Header(props: HeaderProps) {
  const theme = useTheme((state) => state.theme);
  // const styles = theme === "dark" ? stylesDark : stylesLight;

  const { title, action } = props;

  return (
    <View style={styles.actionContainer}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity style={styles.actionButtonGroup} onPress={action}>
          <Text style={styles.actionButtonText}>{title}</Text>
          <Ionicons name="chevron-down" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
  },
  actionButtonGroup: {

    flexWrap: "wrap",
    flexDirection: "row",
    // backgroundColor: "#3499D6",
    backgroundColor: "white",
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
});

// const stylesDark = StyleSheet.create({
//   title: {
//     color: colors.base.white,
//     fontSize: 20,
//     fontWeight: "bold",
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
// });

// const stylesLight = StyleSheet.create({
//   title: {
//     color: colors.base.black,
//     fontSize: 20,
//     fontWeight: "bold",
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
// });

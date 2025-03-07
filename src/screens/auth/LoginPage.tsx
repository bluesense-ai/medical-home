import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../store/useTheme";
import { useUserStore } from "../../store/useUserStore";
import { api } from "../../api/fetch";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

const { height, width } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const theme = useTheme((state) => state.theme);

  const [username, setLocalUsername] = useState("");
  const [otpChannel, setOtpChannel] = useState("sms");

  const setUser = useUserStore((state) => state.setUser);
  const { mutate, error, data } = api.useMutation(
    "post",
    "/auth/provider-login",
    {
      onSuccess: () => {
        Alert.alert("Success", "Code sent successfully!");
        navigation.navigate("LoginSwitchVerification");
      },
      onError: (error) => {
        Alert.alert("Error", JSON.stringify(error) || "An error occurred");
      },
    }
  );

  const handleLogin = async () => {
    if (!username) {
      Alert.alert("Error", "Please enter a username");
      return;
    }
    setUser({ username });

    // commented for development
    navigation.navigate("LoginSwitchVerification");
    // mutate(username, otpChannel);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>{/* Content goes here */}</View>
      {/* Card at the bottom of the screen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Log In</Text>
        <Text style={styles.creditSubTitle}>Enter your username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="black"
          value={username}
          onChangeText={setLocalUsername}
        />
        <Pressable style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242222",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 1,
    alignSelf: "center",
    width: width * 0.9,
    marginTop: 150,
    borderRadius: 15,
    overflow: "hidden",
    opacity: 0.6,
    backgroundColor: "white",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.4,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  creditSubTitle: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 45,
  },
  input: {
    alignContent: "center",
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  submitButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#32CD32",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 35,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;

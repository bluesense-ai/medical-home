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
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { useProvider } from "../../store/useProvider";
import { useUserStore } from "../../store/useUserStore";
import { api } from "../../api/fetch";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

const { height, width } = Dimensions.get("window");

const LoginSwitchVerification = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [accessCode, setAccessCode] = useState("");
  const provider = useProvider((state) => state.provider);
  const username = useUserStore((state) => state.user?.username);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate, error, data } = api.useMutation(
    "post",
    "/auth/verify-verification-code-provider",
    {
      onSuccess: ({ data }) => {
        Alert.alert("Success", "Access code verified!");

        if (!data) throw new Error("No data returned from the server");
        setUser(data);

        if (provider === "doctor") {
          navigation.navigate("DashboardScreen");
        } else {
          navigation.navigate("MainTabs");
        }
      },
      onError: (error) => {
        Alert.alert("Error", JSON.stringify(error) || "An error occurred");
      },
    }
  );

  const handleVerification = async () => {
    if (!accessCode) {
      Alert.alert("Error", "Please enter the access code");
      return;
    }
    mutate({ body: { accessCode, otpChannel: "sms", username } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>{/* Content goes here */}</View>
      {/* Card at the bottom of the screen */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verification</Text>
        <Text style={styles.creditSubTitle}>
          Find your access code via SMS in your phone or via email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Access Code"
          placeholderTextColor="grey"
          value={accessCode}
          onChangeText={setAccessCode}
        />
        <Pressable style={styles.submitButton} onPress={handleVerification}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
    width: width * 0.8,
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

export default LoginSwitchVerification;

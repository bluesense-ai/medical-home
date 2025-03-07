import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import AuthHeader from "../../components/Header/AuthHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { api } from "../../api/fetch";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "RegisterVerification">;

const RegisterVerification = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedId, setselectedId] = useState("");
  const radioButtons = [
    {
      id: "sms",
      label: "Phone Number",
      value: "Phone Number",
      marginBottom: 10,
      marginLeft: 20,
      color: "white",
      labelStyle: { color: "white" },
    },
    {
      id: "email",
      label: "Email address",
      value: "Email address",
      marginBottom: 10,

      color: "white",
      labelStyle: { color: "white" },
    },
  ] satisfies RadioButtonProps[];

  const register = api.useMutation("post", "/auth/patient-register", {
    onSuccess: ({ patientId }) => {
      navigation.navigate("VerificationCode", {
        ...props.route.params,
        patientId: patientId!,
        otpChannel: selectedId,
      });
    },
    onError: (error) => {
      Alert.alert("Error", JSON.stringify(error));
    },
  });

  function handleRegister() {
    if (!selectedId) {
      Alert.alert("Error", "Please select a verification method");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (register.isPending) {
      return;
    }

    register.mutate({
      body: {
        firstName: props.route.params.firstName,
        lastName: props.route.params.lastName,
        dateOfBirth: props.route.params.dateOfBirth,
        sex: "Male",
        emailAddress: email,
        healthCardNumber: props.route.params.healthCardNumber,
        mobileNumber: phoneNumber,
        otpChannel: selectedId,
        preferredClinicId: props.route.params.clinicId,
      },
    });
  }

  return (
    <View style={styles.container}>
      {/* Background Image covering only the bottom half */}
      <View style={styles.whiteBackground}>
        <AuthHeader navigation={navigation} currentStep={4} totalSteps={4} />

        <View style={styles.topImageWrapper}>
          <ImageBackground
            source={require("../../../assets/bgimgrg2.jpg")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.bottomImageWrapper}>
          <ImageBackground
            source={require("./image.jpg")}
            style={styles.bottomImage}
          >
            {/* Form Overlay */}
            <View style={styles.overlay}>
              {/* Heading */}
              <Text style={styles.title}>Register</Text>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ddd"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#ddd"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <Text style={styles.label}>
                How would you like to verify your account
              </Text>
              <View
                style={{
                  marginBottom: 80,
                  alignItems: "flex-start",
                  width: "100%",
                  marginLeft: 30,
                }}
              >
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setselectedId}
                  selectedId={selectedId}
                  layout="column"
                  containerStyle={{
                    gap: 6,
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                />
              </View>

              {/* Register Button */}
              <Pressable
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={register.isPending}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top: height * 0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width,
    height: height,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.3,
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: height * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  label: {
    alignSelf: "flex-start",
    color: "white",
    fontSize: 16,
    marginLeft: "5%",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  registerButton: {
    width: "88%",
    height: 50,
    backgroundColor: "#32CD32",
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RegisterVerification;

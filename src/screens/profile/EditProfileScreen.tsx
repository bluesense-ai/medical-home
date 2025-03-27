import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePatientStore } from "../../store/useUserStore";
import type { RootStackParamList } from "../../navigation/types";
import * as ImagePicker from "expo-image-picker";
import { useUpdateCurrentPatientProfile } from "../../api/mutations";

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const patient = usePatientStore((state) => state.patient)!;

  const [formData, setFormData] = useState({
    first_name: patient.first_name,
    last_name: patient.last_name,
    sex: patient.sex,
    pronouns: patient.pronouns,
    date_of_birth: patient.date_of_birth,
    email_address: patient.email_address,
    phone_number: patient.phone_number,
    picture: patient.picture,
  });
  const [image, setImage] = React.useState<string | null>(null);

  const updateProfileMutation = useUpdateCurrentPatientProfile();

  const handleUpdateProfile = () => {
    console.log("Handling profile update with data:", formData);
    if (!patient.health_card_number) {
      Alert.alert("Health card number is missing");
      return;
    }

    updateProfileMutation.mutate(
      {
        params: { path: { health_card_number: patient.health_card_number } },
        body: formData as any,
      },
      {
        onSuccess() {
          Alert.alert("Success", "Profile updated successfully", [
            { text: "OK", onPress: () => navigation.navigate("MainTabs") },
          ]);
        },
        onError() {
          Alert.alert("Error", "Failed to update profile. Please try again.");
        },
      }
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission required to access photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.base.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image
              source={
                image
                  ? { uri: image }
                  : patient.picture
                  ? { uri: patient.picture }
                  : require("../../../assets/icons/avatar.png")
              }
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color={colors.base.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <InputField
            label="First name"
            value={formData.first_name}
            onChangeText={(value) => handleInputChange("first_name", value)}
          />
          <InputField label="Middle name (Optional)" />
          <InputField
            label="Last name"
            value={formData.last_name}
            onChangeText={(value) => handleInputChange("last_name", value)}
          />
          <InputField
            label="Sex"
            value={formData.sex || ""}
            onChangeText={(value) => handleInputChange("sex", value)}
          />
          <InputField
            label="Pronouns"
            value={formData.pronouns || ""}
            onChangeText={(value) => handleInputChange("pronouns", value)}
          />
          <InputField
            label="Date of birth"
            value={formData.date_of_birth}
            onChangeText={(value) => handleInputChange("date_of_birth", value)}
          />
          <InputField
            label="Health card number"
            value={patient.health_card_number || "Not provided"}
            onChangeText={(value) =>
              handleInputChange("health_card_number", value)
            }
          />
          <InputField
            label="Email"
            value={formData.email_address}
            onChangeText={(value) => handleInputChange("email_address", value)}
          />
          <InputField
            label="Phone"
            value={formData.phone_number}
            onChangeText={(value) => handleInputChange("phone_number", value)}
          />
        </View>

        {/* Done Button */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => handleUpdateProfile()}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.doneButtonText}>Done</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

interface InputFieldProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder=""
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.base.lightGray,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 28,
    textAlign: "center",
    alignSelf: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  profileImageContainer: {
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: colors.main.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.base.black,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.base.black,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: colors.base.lightGray,
    backgroundColor: colors.base.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: colors.main.secondary,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: "center",
    marginBottom: 45,
    marginTop: 45,
    alignSelf: "center",
  },
  doneButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditProfileScreen;

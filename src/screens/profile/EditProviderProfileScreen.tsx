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
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useProviderStore } from "../../store/useUserStore";
import type { RootStackParamList } from "../../navigation/types";
import * as ImagePicker from "expo-image-picker";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const EditProviderProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const provider = useProviderStore((state) => state.provider);
  const setProvider = useProviderStore((state) => state.setProvider);

  const [formData, setFormData] = useState({
    first_name: provider?.first_name,
    last_name: provider?.last_name,
    middle_name: provider?.middle_name || "",
    email_address: provider?.email_address,
    phone_number: provider?.phone_number,
    mnc_number: provider?.mnc_number,
    provider_status: provider?.provider_status,
    sex: provider?.sex || "",
    date_of_birth: "",
    picture: provider?.picture,
  });
  const [image, setImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdateProfile = () => {
    console.log("Handling provider profile update with data:", formData);
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // Güncelleme başarılı diyelim şimdilik
      if (provider) {
        const updatedProvider = {
          ...provider,
          first_name: formData.first_name || provider.first_name,
          middle_name: formData.middle_name || provider.middle_name,
          last_name: formData.last_name || provider.last_name,
          email_address: formData.email_address || provider.email_address,
          phone_number: formData.phone_number || provider.phone_number,
          mnc_number: formData.mnc_number || provider.mnc_number,
          provider_status: formData.provider_status || provider.provider_status,
          sex: formData.sex || provider.sex,
          picture: formData.picture || provider.picture
        };
        
        // Provider store'da kullanılacak formatta güncelliyoruz
        setProvider({
          user: updatedProvider,
          access_token: provider.access_token
        });
      }
      
      setIsLoading(false);
      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.navigate("DashboardScreen") },
      ]);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmDate = (selectedDate: any) => {
    if (selectedDate) {
      // Convert date to YYYY-MM-DD format
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      handleInputChange("date_of_birth", formattedDate);
      setShowDatePicker(false);
    }
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
      handleInputChange("picture", result.assets[0].uri);
    }
  };

  if (!provider) {
    navigation.navigate("LoginPage");
    return <Text>Redirecting to login page...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.base.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Provider Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <View style={styles.profileContainer}>
              <Image
                source={
                  image || provider.picture
                    ? { uri: image || provider.picture }
                    : require("../../../assets/icons/avatar.png")
                }
                style={image || provider.picture ? styles.profileImage : styles.profileIcon}
              />
            </View>
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
          <InputField
            label="Middle name (Optional)"
            value={formData.middle_name}
            onChangeText={(value) => handleInputChange("middle_name", value)}
          />
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
          
          {/* Date of Birth Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={formData.date_of_birth ? styles.dateText : styles.placeholderText}>
                {formData.date_of_birth || "Select date of birth"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <InputField
            label="MNC Number"
            value={formData.mnc_number}
            onChangeText={(value) => handleInputChange("mnc_number", value)}
          />
          <InputField
            label="Provider Status"
            value={formData.provider_status}
            onChangeText={(value) => handleInputChange("provider_status", value)}
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
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.doneButtonText}>Done</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        transparent={true}
        visible={showDatePicker}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { padding: 0 }]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date of Birth</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.modalCloseText}>Done</Text>
                </TouchableOpacity>
              </View>
              <CalendarPicker
                onDateChange={handleConfirmDate}
                maxDate={new Date()}
                minDate={new Date(1900, 0, 1)}
                selectedDayColor={colors.main.primary}
                selectedDayTextColor="#FFFFFF"
                todayBackgroundColor="transparent"
                months={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                textStyle={{
                  color: '#000000',
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingTop: 50,
    backgroundColor: colors.base.white,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 43,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
  },
  profileContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main.secondary,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profileIcon: {
    width: 32,
    height: 32,
  },
  editImageButton: {
    position: "absolute",
    right: -4,
    bottom: -4,
    backgroundColor: colors.main.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.base.white,
  },
  form: {
    width: "100%",
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
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
    fontSize: 12,
    fontWeight: "500",
  },
  doneButton: {
    backgroundColor: colors.main.secondary,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: "center",
    marginBottom: 45,
    marginTop: 32,
    alignSelf: "center",
  },
  doneButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    color: colors.base.black,
    paddingVertical: 12,
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "500",
    color: '#666',
    paddingVertical: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: colors.main.primary,
    fontWeight: "600",
  },
});

export default EditProviderProfileScreen; 
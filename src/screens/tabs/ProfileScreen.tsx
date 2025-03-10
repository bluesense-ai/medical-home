import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useUserStore } from "../../store/useUserStore";

interface PersonalInfo {
  name: string;
  healthCardNumber: string;
  dateOfBirth: string;
  sex: string;
  pronouns: string;
  phone: string;
  email: string;
}

const PERSONAL_INFO: PersonalInfo = {
  name: "Santiago Silva",
  healthCardNumber: "123456789",
  dateOfBirth: "2001/01/18",
  sex: "Male",
  pronouns: "He/Him",
  phone: "306 (123) 4567",
  email: "santiago@pgrminc.com",
};

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            // Clear user data from store
            setUser(null);
            // Navigate to Welcome screen
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../../assets/images/profile-placeholder.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{PERSONAL_INFO.name}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <InfoItem
            label="Health card number"
            value={PERSONAL_INFO.healthCardNumber}
          />
          <InfoItem label="Date of birth" value={PERSONAL_INFO.dateOfBirth} />
          <InfoItem label="Sex" value={PERSONAL_INFO.sex} />
          <InfoItem label="Pronouns" value={PERSONAL_INFO.pronouns} />
          <InfoItem label="Phone" value={PERSONAL_INFO.phone} />
          <InfoItem label="Email" value={PERSONAL_INFO.email} />
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 28,
    marginTop: 28,
    textAlign: "center",
    alignSelf: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.base.black,
  },
  infoCard: {
    width: "100%",
    backgroundColor: colors.main.info,
    borderRadius: 2,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 42,
  },
  infoItem: {
    gap: 18,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.base.white,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
    color: colors.base.white,
    fontWeight: "regular",
  },
  editButton: {
    backgroundColor: colors.main.secondary,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: "semibold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: "center",
    marginBottom: 80,
  },
  logoutButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: "semibold",
  },
});

export default ProfileScreen;

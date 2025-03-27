import React, { useMemo } from "react";
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
import { usePatientStore } from "../../store/useUserStore";
import moment from "moment";
import { useSelectedProvider } from "../../store/useProvider";

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const patient = usePatientStore((state) => state.patient);
  const setPatient = usePatientStore((state) => state.setPatient);

  const resetProvider = useSelectedProvider((state) => state.resetProvider);

  React.useEffect(() => {
    if (patient) {
      console.log("ProfileScreen - Current Patient Data:", patient);
    }
  }, [patient]);

  // Format date to display in a readable format
  const formatDate = useMemo(
    () => (dateString: string | null) => {
      if (!dateString) return "Not provided";
      const date = new Date(dateString);
      // Format date to YYYY/MM/DD
      return moment(date).format("YYYY/MM/DD");
    },
    []
  );

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
            setPatient(null);
            resetProvider();
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

  if (!patient) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <Text style={styles.title}>Personal Information</Text>

          {/* Profile Image */}
          <View style={styles.TopContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={
                  patient.picture
                    ? { uri: patient.picture }
                    : require("../../../assets/icons/avatar.png")
                }
                style={
                  patient.picture ? styles.profileImage : styles.profileIcon
                }
              />
            </View>
            <Text
              style={styles.name}
            >{`${patient.first_name} ${patient.last_name}`}</Text>
          </View>

          {/* Info Card */}
          <InfoItem
            label="Health card number"
            value={patient.health_card_number || "Not provided"}
          />
          <InfoItem
            label="Date of birth"
            value={formatDate(patient.date_of_birth) || "Not provided"}
          />
          <InfoItem label="Sex" value={patient.sex || "Not provided"} />
          <InfoItem
            label="Pronouns"
            value={patient.pronouns || "Not provided"}
          />
          <InfoItem
            label="Phone"
            value={patient.phone_number || "Not provided"}
          />
          <InfoItem
            label="Email"
            value={patient.email_address || "Not provided"}
          />
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Logout Button, not in figma :( */}
        {__DEV__ && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
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
    paddingBottom: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 61,
    color: colors.base.white,
    textAlign: "center",
    alignSelf: "center",
  },
  TopContainer: {
    alignItems: "center",
  },
  profileContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    backgroundColor: colors.main.secondary,
    borderRadius: 50,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.base.white,
  },
  infoCard: {
    width: "100%",
    backgroundColor: colors.main.primary,
    borderRadius: 12,
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
    fontWeight: "600",
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
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProfileScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useUserStore } from "../../store/useUserStore";

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const profile = useUserStore((state) => state.user);

  if (!profile) {
    return null;
  }

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
          <Text style={styles.name}>
            {profile.first_name + " " + profile.last_name}
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <InfoItem
            label="Health card number"
            value={profile.health_card_number}
          />
          <InfoItem label="Date of birth" value={profile.date_of_birth} />
          <InfoItem label="Sex" value={profile.sex} />
          <InfoItem
            label="Pronouns"
            value={profile.pronouns ?? "no pronouns"}
          />
          <InfoItem label="Phone" value={profile.phone_number} />
          <InfoItem label="Email" value={profile.email_address} />
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
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
    marginBottom: 80,
  },
  editButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: "semibold",
  },
});

export default ProfileScreen;

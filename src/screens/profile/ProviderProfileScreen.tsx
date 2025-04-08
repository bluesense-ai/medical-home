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
import { useProviderStore } from "../../store/useUserStore";
import moment from "moment";
import { useSelectedProvider } from "../../store/useProvider";

const ProviderProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const provider = useProviderStore((state) => state.provider);
  const setProvider = useProviderStore((state) => state.setProvider);
  const resetProvider = useSelectedProvider((state) => state.resetProvider);

  React.useEffect(() => {
    if (provider) {
      console.log("ProviderProfileScreen - Current Provider Data:", provider);
    }
  }, [provider]);

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
            setProvider(null);
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

  if (!provider) {
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
                  provider.picture
                    ? { uri: provider.picture }
                    : require("../../../assets/icons/avatar.png")
                }
                style={
                  provider.picture ? styles.profileImage : styles.profileIcon
                }
              />
            </View>
            <Text
              style={styles.name}
            >{`${provider.first_name || ""} ${provider.last_name || ""}`}</Text>
          </View>

          {/* Info Card */}
          <InfoItem
            label="Provider ID"
            value={provider.id || "Not provided"}
          />
          <InfoItem
            label="First Name"
            value={provider.first_name || "Not provided"}
          />
          <InfoItem
            label="Last Name"
            value={provider.last_name || "Not provided"}
          />
          <InfoItem
            label="Middle Name"
            value={provider.middle_name || "Not provided"}
          />
          <InfoItem
            label="Email"
            value={provider.email_address || "Not provided"}
          />
          <InfoItem
            label="Phone"
            value={provider.phone_number || "Not provided"}
          />
          <InfoItem
            label="MNC Number"
            value={provider.mnc_number || "Not provided"}
          />
          <InfoItem
            label="Provider Status"
            value={provider.provider_status || "Not provided"}
          />
          <InfoItem
            label="Sex"
            value={provider.sex || "Not provided"}
          />
          <InfoItem
            label="Created At"
            value={formatDate(provider.createdAt) || "Not provided"}
          />
          <InfoItem
            label="Updated At"
            value={formatDate(provider.updatedAt) || "Not provided"}
          />
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProviderProfileScreen")}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Logout Button - Sadece geliştirme ortamında görünür */}
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
    marginBottom: 120,
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
    position: "absolute",
    bottom: 40,
  },
  logoutButtonText: {
    color: colors.base.white,
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProviderProfileScreen; 
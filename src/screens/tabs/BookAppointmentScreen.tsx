import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../api/fetch";

const BookAppointmentScreen = () => {
  const [selectedProviderId, setSelectedProvider] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"walkIn" | "selectProvider">(
    "walkIn"
  );
  const [showProviders, setShowProviders] = useState(false);

  const providersQuery = api.useQuery("get", "/providers/get-all-providers");
  const providers = providersQuery.data ?? [];

  const status =
    providersQuery.status === "pending"
      ? "Loading..."
      : providersQuery.status === "error"
      ? "Error: " + JSON.stringify(providersQuery.error)
      : "Select Provider";

  const selectedProvider =
    providers.find((p) => p.id === selectedProviderId)?.user_name || status;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require("../../../assets/images/doctor-patient.png")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Book Your{"\n"}Appointment{"\n"}Today!
            </Text>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "walkIn" && styles.activeTab,
                  { borderTopLeftRadius: 25, borderBottomLeftRadius: 25 },
                ]}
                onPress={() => setActiveTab("walkIn")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "walkIn" && styles.activeTabText,
                  ]}
                >
                  Walk In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "selectProvider" && styles.activeTab,
                  { borderTopRightRadius: 25, borderBottomRightRadius: 25 },
                ]}
                onPress={() => setActiveTab("selectProvider")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "selectProvider" && styles.activeTabText,
                  ]}
                >
                  Select Provider
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowProviders(true)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedProvider || status}
              </Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={colors.base.black}
              />
            </TouchableOpacity>

            <Modal
              visible={showProviders}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowProviders(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowProviders(false)}
              >
                <View style={styles.modalContent}>
                  <ScrollView>
                    {providers.map((provider) => (
                      <TouchableOpacity
                        key={provider.id}
                        style={styles.providerItem}
                        onPress={() => {
                          setSelectedProvider(provider.id!);
                          setShowProviders(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.providerItemText,
                            selectedProviderId === provider.id &&
                              styles.selectedProviderText,
                          ]}
                        >
                          {provider.first_name! + " " + provider.last_name!}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 0.5,
    transform: [{ scale: 1 }, { translateY: 320 }],
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.base.white,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 48,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.base.white,
    borderRadius: 25,
    marginHorizontal: 28,
    height: 48,
    width: "100%",
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeTab: {
    backgroundColor: colors.main.secondary,
    borderRadius: 0,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.base.white,
  },
  activeTabText: {
    color: colors.base.white,
  },
  dropdownButton: {
    backgroundColor: colors.base.white,
    borderRadius: 25,
    paddingHorizontal: 16,
    width: 240,
    marginTop: 20,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: colors.base.black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.base.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    maxHeight: "50%",
  },
  providerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  providerItemText: {
    fontSize: 16,
    color: colors.base.black,
  },
  selectedProviderText: {
    color: colors.main.secondary,
    fontWeight: "bold",
  },
});

export default BookAppointmentScreen;

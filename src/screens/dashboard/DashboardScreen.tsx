import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { colors } from "../../theme/colors";
import DashboardBackground from "../../components/DashboardBackground";
import AnimatedSection from "../../components/AnimatedSection";
import DashboardMenuButtons from "../../components/DashboardMenuButtons";
import { useTheme } from "../../store/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useProviderStore } from "../../store/useUserStore";

const DashboardScreen: React.FC = () => {
  const theme = useTheme((state) => state.theme);
  const styles = theme === "dark" ? stylesDark : stylesLight;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const provider = useProviderStore(state => state.provider)
  
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Background Shape */}
        <View style={styles.backgroundContainer}>
          <DashboardBackground
            fill={colors.main.secondary
            }/>
        </View>

        {/* Profile Image */}
        <AnimatedSection isInitial delay={100} style={styles.header}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            {provider && provider.picture ? (
              <Image
                source={{ uri: provider.picture }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.defaultAvatarContainer}>
                <Ionicons name="person" size={24} color={colors.main.primary} />
              </View>
            )}
          </TouchableOpacity>
        </AnimatedSection>

        {/* Menu Buttons */}
        <View style={styles.content}>
          <DashboardMenuButtons />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.darkGray,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 40,
  },
  backgroundContainer: {
    position: "absolute",
    width: 390,
    height: 774,
    left: 0,
    bottom: 0,
    transform: [
      { scale: 1 }
    ],
    transformOrigin: "bottom left",
    zIndex: -1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 74,
    paddingBottom: 19,
    alignItems: "flex-end",
    zIndex: 1,
  },
  profileButton: {
    width: 58,
    height: 58,
    overflow: "hidden",
    borderRadius: 29,
    elevation: 5,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 75,
  },
  defaultAvatarContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
    backgroundColor: colors.base.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 40,
  },
  backgroundContainer: {
    position: "absolute",
    width: 390,
    height: 774,
    left: 0,
    bottom: 0,
    transform: [
      { scale: 1 }
    ],
    transformOrigin: "bottom left",
    zIndex: -1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 74,
    paddingBottom: 19,
    alignItems: "flex-end",
    zIndex: 1,
  },
  profileButton: {
    width: 58,
    height: 58,
    overflow: "hidden",
    borderRadius: 29,
    elevation: 5,
    shadowColor: colors.base.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 70,
  },
  defaultAvatarContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
    backgroundColor: colors.base.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;

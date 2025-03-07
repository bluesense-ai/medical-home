import AuthHeader from "../../components/Header/AuthHeader";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import GreenProfile from "../../components/Svg/GreenProfile";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "WeFoundYou">;

const WeFoundYou = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    const showContentTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setCurrentStep(3);
      fadeIn.start();
    }, 2000);

    const navigateTimer = setTimeout(() => {
      fadeOut.start(() =>
        navigation.navigate("LoginVerification", {
          ...props.route.params,
        })
      );
    }, 5000);

    return () => {
      clearTimeout(showContentTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
        {/* Header */}
        <AuthHeader
          navigation={navigation}
          currentStep={currentStep}
          totalSteps={4}
        />
        {/* Background Image covering only bottom half */}
        <View style={styles.topImageWrapper}>
          <ImageBackground
            source={require("../../../assets/bgimgrg2.jpg")}
            style={styles.topImage}
          />
        </View>
        <View style={styles.bottomImageWrapper}>
          <ImageBackground
            source={require("./image.jpg")}
            style={styles.imageBackground}
          >
            {/* Uniform Bottom Overlay */}
            <View style={styles.overlay}>
              {loading ? (
                <ActivityIndicator size="large" color="#32CD32" />
              ) : showContent ? (
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <GreenProfile
                    width={50}
                    height={30}
                    style={{ marginBottom: 20, padding: 0 }}
                  />
                  <Text style={styles.title}>We Found You</Text>
                  <Text style={styles.description}>
                    We have found your health card number in our system as a
                    current patient, now you'll be redirected to the log in
                    screen.
                  </Text>
                </Animated.View>
              ) : null}
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
    height: height * 0.5,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.1,
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
    fontSize: 22,
    fontWeight: "normal",
    color: "#32CD32",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  header: {
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 40,
    color: "black",
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default WeFoundYou;

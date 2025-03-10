import AuthHeader from "../../../components/Header/AuthHeader";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  Image,
} from "react-native";
import GreenProfile from "../../../components/Svg/GreenProfile";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { colors } from "../../../theme/colors";

const { height, width } = Dimensions.get("window");

type Props = StackScreenProps<RootStackParamList, "WeFoundYou">;

const WeFoundYou = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const imageSlideAnim = useState(new Animated.Value(20))[0];

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const slideDown = Animated.timing(imageSlideAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    // Start initial animations
    Animated.parallel([fadeIn, slideDown]).start();

    const showContentTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setCurrentStep(3);
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
    <SafeAreaView style={styles.container}>
      <AuthHeader
        navigation={navigation}
        currentStep={currentStep}
        totalSteps={4}
      />
      
      {/* Image Section - Animated */}
      <Animated.View 
        style={[
          styles.imageContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: imageSlideAnim }] 
          }
        ]}
      >
        <Image 
          source={require("../../../../assets/images/bgimgrg2.jpg")} 
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      
      {/* Card at the bottom of the screen */}
      <View style={styles.card}>
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
                style={{ marginBottom: 20 }}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 46,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.5,
    backgroundColor: colors.main.primary,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.main.secondary,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    width: width * 0.8,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "white",
    lineHeight: 24,
  },
});

export default WeFoundYou;

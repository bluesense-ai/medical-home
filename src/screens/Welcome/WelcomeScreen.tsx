import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, SafeAreaView, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import Toggle from '../../components/Toggle/Toggle';
import AuthButton from '../../components/Buttons/AuthButton';
import WelcomeHeader from '../../components/Header/WelcomeHeader';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Router';

const WelcomeScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fadeAnim1 = new Animated.Value(1);
  const fadeAnim2 = new Animated.Value(0);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  // Temporarily navigate to Dashboard for development
  const handleLogin = () => {
    // Geçici olarak authentication'ı kaldırıyoruz
    // setIsAuthenticated(true);
    navigation.navigate('DashboardScreen');
  };

  const textColor = isEnabled ? "white" : "black";

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(4000),
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(4000),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isEnabled ? 'black' : colors.base.white }]}>
      <View style={styles.topBar}>
        <View style={styles.toggleContainer}>
          <Toggle isEnabled={isEnabled} onToggle={toggleSwitch} />
        </View>
      </View>

      <WelcomeHeader
        title="Hello!"
        subtitle="Welcome to medical home."
        titleColor={textColor}
        subtitleColor={textColor}
      />

      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('../../../assets/images/welcome.png')}
          style={[styles.welcomeImage, { opacity: fadeAnim1, position: 'absolute' }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('../../../assets/images/doctor-patient.png')}
          style={[styles.welcomeImage, { opacity: fadeAnim2, position: 'absolute' }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <AuthButton
          title="Log in"
          onPress={handleLogin}
          variant="outline"
        />

        {!isEnabled && (
          <AuthButton
            title="Register"
            onPress={() => navigation.navigate('RegisterPage')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  toggleContainer: {
    alignItems: "flex-end",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: 'relative',
  },
  welcomeImage: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 40,
    gap: 16,
  },
});

export default WelcomeScreen;

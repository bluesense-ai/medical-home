// import React, { useState } from 'react';
// import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
// import { colors } from '../../theme/colors';
// import Toggle from '../../components/Toggle/Toggle';
// import AuthButton from '../../components/Buttons/AuthButton';
// import WelcomeHeader from '../../components/Header/WelcomeHeader';
// import { useAuthStore } from '../../store/useAuthStore';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../navigation/Router';

// const WelcomeScreen: React.FC = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   const handleLogin = () => setIsAuthenticated(true);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.topBar}>
//         <View style={styles.toggleContainer}>
//           <Toggle isEnabled={isEnabled} onToggle={toggleSwitch} />
//         </View>
//       </View>

//       <WelcomeHeader
//         title="Hello!"
//         subtitle="Welcome to medical home."
//       />

//       <View style={styles.imageContainer}>
//         <Image
//           source={require('../../../assets/images/welcome.png')}
//           style={styles.welcomeImage}
//           resizeMode="contain"
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <AuthButton
//           title="Log in"
//           onPress={handleLogin}
//           variant="outline"
//         />
//         <AuthButton
//           title="Register"
//           onPress={() => navigation.navigate('RegisterPage')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.base.white,
//   },
//   topBar: {
//     paddingHorizontal: 24,
//     paddingTop: 33,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   toggleContainer: {
//     alignItems: 'flex-end',
//   },
//   imageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   welcomeImage: {
//     width: '100%',
//     height: '80%',
//   },
//   buttonContainer: {
//     paddingHorizontal: 24,
//     paddingBottom: 40,
//     gap: 16,
//   },
// });

// export default WelcomeScreen;

import React, { useState } from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { colors } from "../../theme/colors";
import Toggle from "../../components/Toggle/Toggle";
import AuthButton from "../../components/Buttons/AuthButton";
import WelcomeHeader from "../../components/Header/WelcomeHeader";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/Router";

const WelcomeScreen: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const handleLogin = () => setIsAuthenticated(true);

  const handleLogin = async () => {
    await setIsAuthenticated(true); // Önce authentication'ı güncelle
    if (isEnabled) {
      navigation.navigate('LoginPage');
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const textColor = isEnabled ? 'white' : 'black';

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
        <Image
          source={require("../../../assets/images/welcome.png")}
          style={styles.welcomeImage}
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

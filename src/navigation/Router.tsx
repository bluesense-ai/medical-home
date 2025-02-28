import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/useAuthStore';

// Screens
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import BottomTabs from './BottomTabs';
import RegisterPage from '../screens/auth/RegisterPage';
import RegisterPage2 from '../screens/auth/RegisterPage2';
import VerificationCode from '../screens/auth/VerificationCode';
import RegisterVerification from '../screens/auth/RegisterVerification';
import WantToRegister from '../screens/auth/WantToRegister';
import HomeScreen from '../screens/tabs/HomeScreen';
import LoginPage from '../screens/auth/LoginPage';
import LoginSwitchVerification from '../screens/auth/LoginSwitchVerification';

export type RootStackParamList = {
  Welcome: undefined;
  Loading: undefined;
  MainTabs: undefined;
  EditProfile: undefined;
  RegisterPage: undefined;
  RegisterPage2: undefined;
  RegisterVerification: undefined;
  VerificationCode: undefined;
  WantToRegister: undefined;
  HomeScreen: undefined;
  LoginPage: undefined;
  LoginSwitchVerification: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
          <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
          <Stack.Screen name="VerificationCode" component={VerificationCode} />
          <Stack.Screen name="WantToRegister" component={WantToRegister} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />


        </>
      )}
      <Stack.Screen name='LoginPage' component={LoginPage} />
      <Stack.Screen name="LoginSwitchVerification" component={LoginSwitchVerification} />
    </Stack.Navigator>
  );
};

export default Router;



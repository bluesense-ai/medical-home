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
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DashboardEventsScreen from '../screens/dashboard/DashboardEventsScreen';
import HomeScreen from "../screens/tabs/HomeScreen";
import ProvideInformation from '../screens/auth/ProvideInformation';
import WeFoundYou from '../screens/auth/WeFoundYou';
import VerificationCodeLogin from '../screens/auth/VerificationCodeLogin';
import LoginVerification from '../screens/auth/LoginVerification';
import LoginPage from '../screens/auth/LoginPage';
import LoginSwitchVerification from '../screens/auth/LoginSwitchVerification';
import AIVisitsLanding from '../screens/ai-visits/Landing';
import AIVisitsDashboard from '../screens/ai-visits/Dashboard';
import AIVisitsPage from '../screens/ai-visits/VisitsPage';
import type { Patient } from '../data/patients';
import AIVisitPatient from '../screens/ai-visits/VisitPatient';
import EventDetailScreen from '../screens/dashboard/EventDetailScreen';
import YearlyCalendarScreen from '../screens/dashboard/YearlyCalendarScreen';

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
  DashboardScreen: undefined;
  DashboardEventsScreen: { selectedDate?: string };
  HomeScreen: undefined;
  ProvideInformation: undefined;
  WeFoundYou: undefined;
  VerificationCodeLogin: undefined;
  LoginVerification: undefined;
  LoginPage: undefined;
  LoginSwitchVerification: undefined;
  AIVisitsLanding: undefined;
  AIVisitsDashboard: undefined;
  AIVisitsPage: undefined;
  AIVisitPatient: { id: Patient['id'] };
  EventDetail: undefined;
  YearlyCalendar: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
      <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="WantToRegister" component={WantToRegister} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="VerificationCodeLogin" component={VerificationCodeLogin} />
      <Stack.Screen name="WeFoundYou" component={WeFoundYou} />
      <Stack.Screen name="LoginVerification" component={LoginVerification} />
      <Stack.Screen name="ProvideInformation" component={ProvideInformation} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="DashboardEventsScreen" component={DashboardEventsScreen} />
      <Stack.Screen name="AIVisitsLanding" component={AIVisitsLanding} />
      <Stack.Screen name="AIVisitsDashboard" component={AIVisitsDashboard} />
      <Stack.Screen name="AIVisitsPage" component={AIVisitsPage} />
      <Stack.Screen name="AIVisitPatient" component={AIVisitPatient} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name='LoginPage' component={LoginPage} />
      <Stack.Screen name="LoginSwitchVerification" component={LoginSwitchVerification} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="YearlyCalendar" component={YearlyCalendarScreen} />
    </Stack.Navigator>
  );
};

export default Router;


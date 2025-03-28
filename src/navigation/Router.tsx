import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Screens
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import BottomTabs from './BottomTabs';
import ProviderBottomTabs from './ProviderBottomTabs';
import RegisterPage from '../screens/auth/patient/RegisterPage';
import RegisterPage2 from '../screens/auth/patient/RegisterPage2';
import VerificationCode from '../screens/auth/patient/VerificationCode';
import RegisterVerification from '../screens/auth/patient/RegisterVerification';
import WantToRegister from '../screens/auth/patient/WantToRegister';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DashboardEventsScreen from '../screens/dashboard/DashboardEventsScreen';
import HomeScreen from "../screens/tabs/HomeScreen";
import ProvideInformation from '../screens/auth/patient/ProvideInformation';
import WeFoundYou from '../screens/auth/patient/WeFoundYou';
import LoginVerification from '../screens/auth/patient/LoginVerification';
import LoginPage from '../screens/auth/provider/LoginPage';
import LoginSwitchVerification from '../screens/auth/provider/LoginSwitchVerification';
import AIVisitsLanding from '../screens/ai-visits/Landing';
import AIVisitsDashboard from '../screens/ai-visits/Dashboard';
import AIVisitsPage from '../screens/ai-visits/VisitsPage';
import AIVisitPatient from '../screens/ai-visits/VisitPatient';
import EventDetailScreen from '../screens/dashboard/EventDetailScreen';
import YearlyCalendarScreen from '../screens/dashboard/YearlyCalendarScreen';
import ProviderProfileScreen from '../screens/profile/ProviderProfileScreen';
import EditProviderProfileScreen from '../screens/profile/EditProviderProfileScreen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventFormScreen from '../screens/dashboard/EventFormScreen';


const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
        <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        <Stack.Screen name="WantToRegister" component={WantToRegister} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
        <Stack.Screen name="ProviderBottomTabs" component={ProviderBottomTabs} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name='LoginPage' component={LoginPage} />
        <Stack.Screen name="LoginSwitchVerification" component={LoginSwitchVerification} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="YearlyCalendar" component={YearlyCalendarScreen} />
        <Stack.Screen name="EventForm" component={EventFormScreen} />
        <Stack.Screen name="ProviderProfileScreen" component={ProviderProfileScreen} />
        <Stack.Screen name="EditProviderProfileScreen" component={EditProviderProfileScreen} />
      </Stack.Navigator>
    </QueryClientProvider>
  );
};

export default Router;


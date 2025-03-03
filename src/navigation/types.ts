import { Event } from '../store/useCalendarStore';

// Serileştirilebilir Event tipi
export interface SerializableEvent extends Omit<Event, 'startDate' | 'endDate'> {
  startDate: string | null;
  endDate: string | null;
}

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
  AIVisitPatient: { id: string };
  EventDetail: { event: SerializableEvent };
  YearlyCalendar: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  Settings: undefined;
}; 
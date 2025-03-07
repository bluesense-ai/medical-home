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
  RegisterPage2: { healthCardNumber: string; clinicId: string };
  RegisterVerification: RootStackParamList["RegisterPage2"] & { firstName: string, lastName: string, dateOfBirth: string };
  VerificationCode: { patientId: string, otpChannel: string }
  WantToRegister: undefined;
  ProvideInformation: undefined;
  WeFoundYou: { healthCardNumber: string, otpChannel: string, patientId: string };
  LoginVerification: { healthCardNumber: string, otpChannel: string, patientId: string };
  DashboardScreen: undefined;
  DashboardEventsScreen: { selectedDate?: string };
  HomeScreen: undefined;
  LoginPage: undefined;
  LoginSwitchVerification: { userName: string, otpChannel: string };
  AIVisitsLanding: undefined;
  AIVisitsDashboard: undefined;
  AIVisitsPage: undefined;
  AIVisitPatient: { id: string };
  EventDetail: { event: SerializableEvent };
  YearlyCalendar: undefined;
  EventForm: { selectedDate?: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  Settings: undefined;
}; 
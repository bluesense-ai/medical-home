import { Event } from '../store/useCalendarStore';

// Serileştirilebilir Event tipi
export interface SerializableEvent extends Omit<Event, 'startDate' | 'endDate'> {
  startDate: string | null;
  endDate: string | null;
}


export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
  Settings: undefined;
}; 
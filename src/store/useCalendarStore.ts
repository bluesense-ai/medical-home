import { create } from 'zustand';
import moment from 'moment';
import { mockEvents } from '../data/mockEvents';

export type EventType = 'urgent' | 'regular' | 'check-up' | 'consultation';

export interface Event {
  id: string;
  title: string;
  color: string;
  type: EventType;
  patientName: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  assignedStaff: string;
  healthCardNumber: string;
  notes?: string;
  meetingDetails?: string;
}

interface CalendarStore {
  events: Event[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsForDate: (date: string) => Event[];
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: [...mockEvents],
  selectedDate: moment().format('YYYY-MM-DD'),
  
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  addEvent: async (event) => {
    const newEvent = { ...event, id: Math.random().toString() };
    
    // Update state immediately
    set((state) => {
      const updatedEvents = [...state.events, newEvent];
      return {
        events: updatedEvents,
      };
    });

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // No need to update state after API success
        // because state is already updated
        resolve();
      }, 1000);
    });
  },

  deleteEvent: async (id) => {
    // Update state immediately
    set((state) => ({
      events: state.events.filter((event) => event.id !== id)
    }));

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  getEventsForDate: (date) => {
    const { events } = get();
    return events.filter((event) => 
      moment(event.startDate).format('YYYY-MM-DD') === date
    ).sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
  },
}));

export default useCalendarStore; 
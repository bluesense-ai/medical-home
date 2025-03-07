import { create } from 'zustand';
import { getEvents, createEvent, deleteEvent, updateEvent } from '../api/eventService';

export interface Event {
  id: string;
  title: string;
  color: string;
  type: 'urgent' | 'regular' | 'check-up' | 'consultation';
  patientName: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate: Date;
  assignedStaff: string;
  healthCardNumber: string;
  notes: string;
  meetingDetails: string;
}

interface CalendarState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
}

const useCalendarStore = create<CalendarState>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,
  
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('Fetching events from store...');
      const events = await getEvents();
      console.log(`Fetched ${events.length} events`);
      set({ events, isLoading: false });
    } catch (error) {
      console.error('Error fetching events:', error);
      set({ error: 'Failed to fetch events', isLoading: false });
    }
  },
  
  addEvent: async (eventData) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Adding new event:', eventData);
      const newEvent = await createEvent(eventData);
      set((state) => ({ 
        events: [...state.events, newEvent],
        isLoading: false 
      }));
      console.log('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      set({ error: 'Failed to add event', isLoading: false });
    }
  },
  
  removeEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Removing event with ID:', id);
      await deleteEvent(id);
      set((state) => ({ 
        events: state.events.filter(event => event.id !== id),
        isLoading: false 
      }));
      console.log('Event removed successfully');
    } catch (error) {
      console.error('Error removing event:', error);
      set({ error: 'Failed to remove event', isLoading: false });
    }
  },
  
  updateEvent: async (updatedEvent) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Updating event:', updatedEvent);
      await updateEvent(updatedEvent);
      set((state) => ({ 
        events: state.events.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        ),
        isLoading: false 
      }));
      console.log('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      set({ error: 'Failed to update event', isLoading: false });
    }
  },
}));

export default useCalendarStore; 
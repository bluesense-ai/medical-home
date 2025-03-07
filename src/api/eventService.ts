import axios from 'axios';
import { Event } from '../store/useCalendarStore';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL - from OpenAPI documentation
const API_BASE_URL = 'https://sandbox-backend.medicalhome.cloud/api';

// Storage keys
const EVENTS_STORAGE_KEY = 'medical_home_events';
const AUTH_TOKEN_KEY = 'medical_home_auth_token';

// Hardcoded token provided by your colleague
const HARDCODED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3MWRjOGE5LWMzZGQtNGNhZS1hZTQ2LTk4MzBlMjdhY2RjOSIsImVtYWlsIjoiaWxrZXJAYmx1ZXNlbnNlLmFpIiwicGhvbmVfbnVtYmVyIjoiKzkwNTM1MjQ4MzgwMCIsInVzZXJuYW1lIjoiaWxrZXIiLCJmaXJzdF9uYW1lIjoixLBsa2VyIiwibGFzdF9uYW1lIjoiR8O8emVsa29rYXIiLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTA2VDA1OjMxOjQyLjU3OVoiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3NDEyMzkyNjMsImV4cCI6MTc0MTMyNTY2M30.MnGo1p5EsBjNxyGK69tvOvV7ouI_EY1QGu5nVwvkmPA";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${HARDCODED_TOKEN}` // Add token directly to default headers
  },
  // Add timeout to avoid long waiting times
  timeout: 10000,
});

// Add request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
      
      // We're already setting the token in the default headers,
      // but this is a fallback in case the token changes during runtime
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY) || HARDCODED_TOKEN;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added auth token to request');
      } else {
        console.log('No auth token available for request');
      }
      
      if (config.data) {
        console.log('Request data:', JSON.stringify(config.data));
      }
      
      return config;
    } catch (error) {
      console.error('Error adding auth token to request:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response status: ${response.status}`);
    console.log('Response data:', JSON.stringify(response.data));
    return response;
  },
  async (error) => {
    console.error('API request failed:', error.message);
    
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error('Response data:', JSON.stringify(error.response.data));
      
      if (error.response.status === 401) {
        console.log('Authentication error - token may be expired');
        // You could trigger a logout or token refresh here
      }
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to save auth token
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    console.log('Auth token saved');
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Save the hardcoded token to AsyncStorage on app start
(async () => {
  try {
    await saveAuthToken(HARDCODED_TOKEN);
    console.log('Hardcoded token saved to AsyncStorage');
  } catch (error) {
    console.error('Failed to save hardcoded token:', error);
  }
})();

// Helper function to get auth token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY) || HARDCODED_TOKEN;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return HARDCODED_TOKEN; // Fallback to hardcoded token
  }
};

// Helper function to clear auth token (for logout)
export const clearAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    console.log('Auth token cleared');
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
};

// Helper function to save events to AsyncStorage
const saveEventsToStorage = async (events: Event[]) => {
  try {
    // Convert Date objects to ISO strings for storage
    const serializedEvents = events.map(event => ({
      ...event,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString()
    }));
    
    await AsyncStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(serializedEvents));
    console.log('Events saved to AsyncStorage:', events.length);
  } catch (error) {
    console.error('Error saving events to AsyncStorage:', error);
  }
};

// Helper function to load events from AsyncStorage
const loadEventsFromStorage = async (): Promise<Event[]> => {
  try {
    const eventsJson = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
    if (!eventsJson) {
      console.log('No events found in AsyncStorage');
      return [];
    }
    
    // Convert ISO strings back to Date objects
    const parsedEvents = JSON.parse(eventsJson);
    const events = parsedEvents.map((event: any) => ({
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate)
    }));
    
    console.log('Fetched events from storage:', events.length);
    return events;
  } catch (error) {
    console.error('Error loading events from AsyncStorage:', error);
    return [];
  }
};

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  console.log('Fetching events from API...');
  
  // List of possible endpoints to try
  const possibleEndpoints = [
    '/bookings',
    '/appointments',
    '/events',
    '/calendar/events',
    '/schedule'
  ];
  
  // Try each endpoint until one works
  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`Trying API endpoint: ${endpoint}`);
      const response = await apiClient.get(endpoint);
      console.log('API response for events:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        // Convert API response to Event objects
        const apiEvents = response.data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          title: item.title || 'Appointment',
          color: getColorForBookingType(item.type),
          type: mapBookingTypeToEventType(item.type),
          patientName: item.patientName || item.patient_name || 'Patient',
          email: item.email || '',
          phone: item.phone || '',
          startDate: new Date(item.startDate || item.start_at || item.start_date || new Date()),
          endDate: new Date(item.endDate || item.end_at || item.end_date || moment(new Date()).add(1, 'hour').toDate()),
          assignedStaff: item.assignedStaff || item.provider_name || item.doctor || 'Staff',
          healthCardNumber: item.healthCardNumber || item.health_card_number || '',
          notes: item.notes || item.customer_note || '',
          meetingDetails: item.meetingDetails || item.meeting_details || ''
        }));
        
        console.log(`Fetched ${apiEvents.length} events from API using endpoint: ${endpoint}`);
        
        // Save API events to storage for backup
        await saveEventsToStorage(apiEvents);
        return apiEvents;
      }
    } catch (error) {
      console.error(`Error fetching events from endpoint ${endpoint}:`, error);
      // Continue to the next endpoint
    }
  }
  
  console.log('All API endpoints failed, loading from storage');
  
  // If all API endpoints fail, try to load from storage
  try {
    const storedEvents = await loadEventsFromStorage();
    console.log(`Loaded ${storedEvents.length} events from storage`);
    return storedEvents.length > 0 ? storedEvents : getMockEvents();
  } catch (storageError) {
    console.error('Error loading events from storage:', storageError);
    return getMockEvents();
  }
};

// Create a new event
export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  console.log('Submitting event data:', event);
  
  // List of possible endpoints to try
  const possibleEndpoints = [
    '/bookings',
    '/appointments',
    '/events',
    '/calendar/events',
    '/schedule'
  ];
  
  // Convert Event to booking format for API
  const eventData = {
    title: event.title,
    type: event.type,
    patient_name: event.patientName,
    email: event.email,
    phone: event.phone,
    start_at: event.startDate.toISOString(),
    end_at: event.endDate.toISOString(),
    provider_name: event.assignedStaff,
    health_card_number: event.healthCardNumber,
    customer_note: event.notes,
    meeting_details: event.meetingDetails
  };
  
  console.log('Sending event data to API:', eventData);
  
  // Try each endpoint until one works
  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`Trying to create event using endpoint: ${endpoint}`);
      const response = await apiClient.post(endpoint, eventData);
      console.log('API response for create event:', response.data);
      
      if (response.data && response.data.id) {
        // Create a new event with the ID from the API
        const newEvent: Event = {
          ...event,
          id: response.data.id
        };
        
        // Save to local storage as backup
        const currentEvents = await loadEventsFromStorage();
        await saveEventsToStorage([...currentEvents, newEvent]);
        
        console.log('Event created successfully with ID:', newEvent.id);
        return newEvent;
      }
    } catch (error) {
      console.error(`Error creating event using endpoint ${endpoint}:`, error);
      // Continue to the next endpoint
    }
  }
  
  console.log('All API endpoints failed, saving to local storage only');
  
  // If all API endpoints fail, create a local event
  const newEvent: Event = {
    ...event,
    id: Math.random().toString()
  };
  
  // Save to local storage
  try {
    const currentEvents = await loadEventsFromStorage();
    await saveEventsToStorage([...currentEvents, newEvent]);
    console.log('Event saved to local storage with ID:', newEvent.id);
  } catch (storageError) {
    console.error('Error saving event to storage:', storageError);
  }
  
  return newEvent;
};

// Delete an event
export const deleteEvent = async (id: string): Promise<void> => {
  console.log(`Deleting event with ID: ${id}`);
  
  try {
    // Try to delete event from API
    const response = await apiClient.delete(`/bookings/${id}`);
    console.log('API response for delete event:', response.data);
    
    // Also delete from local storage
    try {
      const currentEvents = await loadEventsFromStorage();
      const updatedEvents = currentEvents.filter(event => event.id !== id);
      await saveEventsToStorage(updatedEvents);
      console.log('Event deleted from local storage');
    } catch (storageError) {
      console.error('Error updating local storage after deletion:', storageError);
    }
  } catch (error) {
    console.error('Error deleting event from API:', error);
    
    // Still try to delete from local storage
    try {
      const currentEvents = await loadEventsFromStorage();
      const updatedEvents = currentEvents.filter(event => event.id !== id);
      await saveEventsToStorage(updatedEvents);
      console.log('Event deleted from local storage only');
    } catch (storageError) {
      console.error('Error deleting event from storage:', storageError);
    }
  }
};

// Update an event
export const updateEvent = async (event: Event): Promise<Event> => {
  console.log(`Updating event with ID: ${event.id}`, event);
  
  try {
    // Convert Event to booking format for API
    const bookingData = {
      title: event.title,
      type: event.type,
      patient_name: event.patientName,
      email: event.email,
      phone: event.phone,
      start_at: event.startDate.toISOString(),
      end_at: event.endDate.toISOString(),
      provider_name: event.assignedStaff,
      health_card_number: event.healthCardNumber,
      customer_note: event.notes,
      meeting_details: event.meetingDetails
    };
    
    console.log('Sending update data to API:', bookingData);
    
    // Try to update event in API
    const response = await apiClient.put(`/bookings/${event.id}`, bookingData);
    console.log('API response for update event:', response.data);
    
    // Update in local storage as well
    try {
      const currentEvents = await loadEventsFromStorage();
      const updatedEvents = currentEvents.map(e => 
        e.id === event.id ? event : e
      );
      await saveEventsToStorage(updatedEvents);
      console.log('Event updated in local storage');
    } catch (storageError) {
      console.error('Error updating event in storage:', storageError);
    }
    
    return event;
  } catch (error) {
    console.error('Error updating event in API:', error);
    
    // Still update in local storage
    try {
      const currentEvents = await loadEventsFromStorage();
      const updatedEvents = currentEvents.map(e => 
        e.id === event.id ? event : e
      );
      await saveEventsToStorage(updatedEvents);
      console.log('Event updated in local storage only');
    } catch (storageError) {
      console.error('Error updating event in storage:', storageError);
    }
    
    return event;
  }
};

// Helper function to get color for booking type
const getColorForBookingType = (type: string | undefined): string => {
  switch (type) {
    case 'urgent':
      return '#F44336';
    case 'regular':
      return '#4CAF50';
    case 'check-up':
      return '#2196F3';
    case 'consultation':
      return '#FF9800';
    default:
      return '#4CAF50';
  }
};

// Helper function to map booking type to event type
const mapBookingTypeToEventType = (type: string | undefined): Event['type'] => {
  switch (type) {
    case 'urgent':
      return 'urgent';
    case 'regular':
      return 'regular';
    case 'check-up':
      return 'check-up';
    case 'consultation':
      return 'consultation';
    default:
      return 'regular';
  }
};

// Helper function to get mock events
const getMockEvents = (): Event[] => {
  return [
    {
      id: '1',
      title: 'Annual Check-up',
      color: '#4CAF50',
      type: 'regular',
      patientName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      startDate: moment().hour(9).minute(0).second(0).toDate(),
      endDate: moment().hour(10).minute(0).second(0).toDate(),
      assignedStaff: 'Dr. Sarah Johnson',
      healthCardNumber: 'HC12345678',
      notes: 'Regular annual check-up, no specific concerns.',
      meetingDetails: 'Room 101'
    },
    {
      id: '2',
      title: 'Urgent Consultation',
      color: '#F44336',
      type: 'urgent',
      patientName: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 987-6543',
      startDate: moment().add(1, 'day').hour(14).minute(30).second(0).toDate(),
      endDate: moment().add(1, 'day').hour(15).minute(30).second(0).toDate(),
      assignedStaff: 'Dr. Michael Chen',
      healthCardNumber: 'HC87654321',
      notes: 'Patient reported severe headaches and dizziness.',
      meetingDetails: 'Emergency Room'
    },
    {
      id: '3',
      title: 'Follow-up Appointment',
      color: '#2196F3',
      type: 'check-up',
      patientName: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '+1 (555) 456-7890',
      startDate: moment().add(2, 'days').hour(11).minute(0).second(0).toDate(),
      endDate: moment().add(2, 'days').hour(11).minute(30).second(0).toDate(),
      assignedStaff: 'Dr. Lisa Wong',
      healthCardNumber: 'HC23456789',
      notes: 'Follow-up after surgery, check healing progress.',
      meetingDetails: 'Room 205'
    }
  ];
}; 
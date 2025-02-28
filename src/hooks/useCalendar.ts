import { useState, useEffect } from 'react';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Platform } from 'react-native';

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: 'short' | 'meeting' | 'urgent' | 'regular';
  notes?: string;
}

interface UseCalendarReturn {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  createEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

const useCalendar = (): UseCalendarReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarId, setCalendarId] = useState<string | null>(null);

  const getDefaultCalendarSource = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendars = calendars.filter(each => 
        each.source.name === (Platform.OS === 'ios' ? 'Default' : 'Medical Home Calendar')
      );
      return defaultCalendars.length > 0 ? defaultCalendars[0].source : null;
    } catch (e) {
      console.error('Error getting default calendar source:', e);
      return null;
    }
  };

  const createCalendar = async () => {
    try {
      const defaultCalendarSource = Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Medical Home Calendar', type: Calendar.SourceType.LOCAL } as Calendar.Source;

      if (!defaultCalendarSource && Platform.OS === 'ios') {
        throw new Error('Could not get default calendar source');
      }

      const newCalendarId = await Calendar.createCalendarAsync({
        title: 'Medical Home Calendar',
        color: '#247401',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource?.id,
        source: defaultCalendarSource || undefined,
        name: 'medicalHomeCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
        allowsModifications: true,
        allowedAvailabilities: [Calendar.Availability.BUSY],
        allowedReminders: [Calendar.AlarmMethod.ALERT, Calendar.AlarmMethod.SOUND],
        allowedAttendeeTypes: [Calendar.AttendeeType.REQUIRED, Calendar.AttendeeType.OPTIONAL],
      });

      await AsyncStorage.setItem('calendarId', newCalendarId);
      return newCalendarId;
    } catch (e) {
      console.error('Error creating calendar:', e);
      throw new Error('Failed to create calendar');
    }
  };

  const getOrCreateCalendarId = async () => {
    try {
      const storedCalendarId = await AsyncStorage.getItem('calendarId');
      if (storedCalendarId) {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const calendar = calendars.find(cal => cal.id === storedCalendarId);
        if (calendar) {
          return storedCalendarId;
        }
      }
      return await createCalendar();
    } catch (e) {
      console.error('Error getting or creating calendar:', e);
      throw new Error('Failed to get or create calendar');
    }
  };

  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Calendar permission denied');
    }
  };

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await requestCalendarPermissions();
      const id = await getOrCreateCalendarId();
      setCalendarId(id);

      const startDate = moment().startOf('month').toDate();
      const endDate = moment().endOf('month').toDate();

      const calendarEvents = await Calendar.getEventsAsync(
        [id],
        startDate,
        endDate
      );

      setEvents(calendarEvents.map(event => ({
        id: event.id,
        title: event.title,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        type: event.notes?.includes('type:') 
          ? event.notes.split('type:')[1].trim() as Event['type']
          : 'regular',
        notes: event.notes?.replace(/type:.*$/, '').trim(),
      })));

    } catch (e) {
      console.error('Error loading events:', e);
      setError('An error occurred while loading events');
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (event: Omit<Event, 'id'>) => {
    try {
      if (!calendarId) {
        throw new Error('Calendar not found');
      }

      await Calendar.createEventAsync(calendarId, {
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        notes: `${event.notes || ''}\ntype:${event.type}`,
        timeZone: Localization.timezone,
        alarms: [{
          relativeOffset: -30, // 30 minutes before
          method: Calendar.AlarmMethod.ALERT,
        }],
      });

      await loadEvents();
    } catch (e) {
      console.error('Error creating event:', e);
      throw e;
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    createEvent,
    deleteEvent: async (eventId: string) => {
      try {
        await Calendar.deleteEventAsync(eventId);
        await loadEvents();
      } catch (e) {
        console.error('Error deleting event:', e);
        throw new Error('An error occurred while deleting the event');
      }
    },
    refreshEvents: loadEvents,
  };
};

export default useCalendar; 
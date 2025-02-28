import { create } from 'zustand';
import moment from 'moment';

interface CalendarState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: moment(date).startOf('day').toDate() }),
})); 
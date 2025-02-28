declare module 'react-native-calendar-picker' {
  import { ComponentType } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';
  import { Moment } from 'moment';

  interface CalendarPickerProps {
    allowRangeSelection?: boolean;
    selectedStartDate?: Date;
    selectedEndDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    weekdays?: string[];
    months?: string[];
    previousTitle?: string;
    nextTitle?: string;
    selectedDayColor?: string;
    selectedDayTextColor?: string;
    todayBackgroundColor?: string;
    todayTextStyle?: TextStyle;
    textStyle?: TextStyle;
    customDatesStyles?: any[];
    scaleFactor?: number;
    monthTitleStyle?: TextStyle;
    yearTitleStyle?: TextStyle;
    dayLabelsWrapper?: ViewStyle;
    onDateChange?: (date: Moment, type?: string) => void;
  }

  const CalendarPicker: ComponentType<CalendarPickerProps>;
  export default CalendarPicker;
} 
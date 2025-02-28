import { Moment } from 'moment';
import { TextStyle, ViewStyle } from 'react-native';

declare module 'react-native-calendar-picker' {
  export interface CustomDayComponentType {
    date: Moment;
    state: 'disabled' | 'today' | 'selected' | '';
  }

  export interface CalendarPickerProps {
    allowRangeSelection?: boolean;
    minDate?: Date;
    maxDate?: Date;
    weekdays?: string[];
    months?: string[];
    startFromMonday?: boolean;
    showDayStragglers?: boolean;
    onDateChange: (date: Moment) => void;
    selectedDayColor?: string;
    selectedDayTextColor?: string;
    todayBackgroundColor?: string;
    todayTextStyle?: TextStyle;
    monthTitleStyle?: TextStyle;
    yearTitleStyle?: TextStyle;
    dayLabelsWrapper?: ViewStyle;
    textStyle?: TextStyle;
    previousTitle?: string;
    nextTitle?: string;
    previousTitleStyle?: TextStyle;
    nextTitleStyle?: TextStyle;
    customDatesStyles?: {
      containerStyle?: ViewStyle;
      textStyle?: TextStyle;
    }[];
    customDayComponent?: (props: CustomDayComponentType) => JSX.Element;
  }

  const CalendarPicker: React.FC<CalendarPickerProps>;
  export default CalendarPicker;
} 
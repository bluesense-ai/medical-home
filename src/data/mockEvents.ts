import { Event } from '../store/useCalendarStore';
import moment from 'moment';
import { colors } from '../theme/colors';

// Business hours configuration
export const BUSINESS_HOURS = {
  start: 7, // 7 AM
  end: 20, // 8 PM
};

// Helper function to create dates within business hours
const createDate = (day: number, hour: number, minute: number = 0): Date => {
  const date = moment().date(day);
  // Ensure hour is within business hours
  const validHour = Math.max(BUSINESS_HOURS.start, Math.min(hour, BUSINESS_HOURS.end));
  date.hour(validHour).minute(minute).second(0);
  return date.toDate();
};

export const mockEvents: Event[] = [
  // Today's events
  {
    id: '1',
    title: 'Regular Check-up',
    color: colors.secondary.gray,
    type: 'regular',
    patientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234 567 8900',
    startDate: createDate(moment().date(), 9, 0), // 9 AM
    endDate: createDate(moment().date(), 10, 0),
    assignedStaff: 'Dr. Sarah Wilson',
    healthCardNumber: '123456789',
    notes: 'Annual physical examination'
  },
  {
    id: '2',
    title: 'Emergency Consultation',
    color: colors.secondary.red,
    type: 'urgent',
    patientName: 'Emma Johnson',
    email: 'emma.j@email.com',
    phone: '+1 234 567 8901',
    startDate: createDate(moment().date(), 11, 30),
    endDate: createDate(moment().date(), 12, 30),
    assignedStaff: 'Dr. Michael Brown',
    healthCardNumber: '987654321',
    notes: 'Acute abdominal pain'
  },

  // Tomorrow's events
  {
    id: '3',
    title: 'Dental Check-up',
    color: colors.secondary.coral,
    type: 'check-up',
    patientName: 'David Wilson',
    email: 'david.w@email.com',
    phone: '+1 234 567 8902',
    startDate: createDate(moment().date() + 1, 14, 0), // 2 PM
    endDate: createDate(moment().date() + 1, 15, 0),
    assignedStaff: 'Dr. Emily Davis',
    healthCardNumber: '456789123',
    notes: 'Regular dental cleaning'
  },
  {
    id: '4',
    title: 'Specialist Consultation',
    color: colors.secondary.lightRed,
    type: 'consultation',
    patientName: 'Sophie Miller',
    email: 'sophie.m@email.com',
    phone: '+1 234 567 8903',
    startDate: createDate(moment().date() + 1, 16, 30), // 4:30 PM
    endDate: createDate(moment().date() + 1, 17, 30),
    assignedStaff: 'Dr. James Wilson',
    healthCardNumber: '789123456',
    notes: 'Follow-up appointment'
  },

  // Day after tomorrow's events
  {
    id: '5',
    title: 'Pediatric Check-up',
    color: colors.secondary.gray,
    type: 'regular',
    patientName: 'Oliver Brown',
    email: 'parent@email.com',
    phone: '+1 234 567 8904',
    startDate: createDate(moment().date() + 2, 8, 30), // 8:30 AM
    endDate: createDate(moment().date() + 2, 9, 30),
    assignedStaff: 'Dr. Sarah Wilson',
    healthCardNumber: '321654987',
    notes: 'Regular pediatric check-up'
  },
  {
    id: '6',
    title: 'Urgent Care',
    color: colors.secondary.red,
    type: 'urgent',
    patientName: 'Liam Taylor',
    email: 'liam.t@email.com',
    phone: '+1 234 567 8905',
    startDate: createDate(moment().date() + 2, 11, 0), // 11 AM
    endDate: createDate(moment().date() + 2, 12, 0),
    assignedStaff: 'Dr. Michael Brown',
    healthCardNumber: '147258369',
    notes: 'High fever and severe headache'
  },
  {
    id: '7',
    title: 'Vaccination',
    color: colors.secondary.coral,
    type: 'check-up',
    patientName: 'Ava Martinez',
    email: 'ava.m@email.com',
    phone: '+1 234 567 8906',
    startDate: createDate(moment().date() + 2, 14, 30), // 2:30 PM
    endDate: createDate(moment().date() + 2, 15, 0),
    assignedStaff: 'Dr. Emily Davis',
    healthCardNumber: '963852741',
    notes: 'Regular vaccination schedule'
  },

  // Next week's events
  {
    id: '8',
    title: 'Cardiology Consultation',
    color: colors.secondary.lightRed,
    type: 'consultation',
    patientName: 'William Anderson',
    email: 'william.a@email.com',
    phone: '+1 234 567 8907',
    startDate: createDate(moment().date() + 7, 10, 0), // 10 AM
    endDate: createDate(moment().date() + 7, 11, 0),
    assignedStaff: 'Dr. James Wilson',
    healthCardNumber: '852963741',
    notes: 'Heart condition follow-up'
  },
  {
    id: '9',
    title: 'Physical Therapy',
    color: colors.secondary.gray,
    type: 'regular',
    patientName: 'Isabella Garcia',
    email: 'isabella.g@email.com',
    phone: '+1 234 567 8908',
    startDate: createDate(moment().date() + 7, 13, 30), // 1:30 PM
    endDate: createDate(moment().date() + 7, 14, 30),
    assignedStaff: 'Dr. Sarah Wilson',
    healthCardNumber: '741852963',
    notes: 'Post-surgery rehabilitation'
  },
  {
    id: '10',
    title: 'Emergency Surgery',
    color: colors.secondary.red,
    type: 'urgent',
    patientName: 'Mason Thompson',
    email: 'mason.t@email.com',
    phone: '+1 234 567 8909',
    startDate: createDate(moment().date() + 7, 15, 0), // 3 PM
    endDate: createDate(moment().date() + 7, 17, 0),
    assignedStaff: 'Dr. Michael Brown',
    healthCardNumber: '369852147',
    notes: 'Appendectomy'
  }
]; 
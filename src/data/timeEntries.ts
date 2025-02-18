import { TimeEntry } from '../types';

export const timeEntries: TimeEntry[] = [
  {
    id: '1',
    employeeId: '2',
    date: '2024-03-10',
    clockIn: '08:00',
    clockOut: '16:30',
    totalHours: 8.5,
    approved: true
  },
  {
    id: '2',
    employeeId: '2',
    date: '2024-03-11',
    clockIn: '08:15',
    clockOut: '16:45',
    totalHours: 8.5,
    approved: true
  },
  {
    id: '3',
    employeeId: '3',
    date: '2024-03-10',
    clockIn: '09:00',
    clockOut: '17:00',
    totalHours: 8,
    approved: true
  }
];
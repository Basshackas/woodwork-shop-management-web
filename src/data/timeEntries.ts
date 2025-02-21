import { TimeEntry } from '../types';

export const timeEntries: TimeEntry[] = [
  {
    id: '1',
    employeeId: '2',
    projectId: '3',
    taskId: 'task-1',
    date: '2024-03-10',
    clockIn: '08:00',
    clockOut: '16:30',
    totalHours: 8.5,
    regularHours: 8,
    overtimeHours: 0.5,
    approved: true,
    approvedBy: 'Michael Chen',
    notes: 'Completed cabinet assembly',
    location: 'Workshop A'
  },
  {
    id: '2',
    employeeId: '2',
    projectId: '3',
    taskId: 'task-2',
    date: '2024-03-11',
    clockIn: '08:15',
    clockOut: '16:45',
    totalHours: 8.5,
    regularHours: 8,
    overtimeHours: 0.5,
    approved: true,
    approvedBy: 'Michael Chen',
    notes: 'Sanding and finishing',
    location: 'Workshop A'
  },
  {
    id: '3',
    employeeId: '3',
    projectId: '2',
    taskId: 'task-3',
    date: '2024-03-10',
    clockIn: '09:00',
    clockOut: '17:00',
    totalHours: 8,
    regularHours: 8,
    overtimeHours: 0,
    approved: true,
    approvedBy: 'Michael Chen',
    notes: 'Tool maintenance and organization',
    location: 'Workshop B'
  }
];

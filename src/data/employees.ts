import { Employee } from '../types';

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Michael Chen',
    role: 'Senior Craftsman',
    email: 'michael.chen@example.com',
    phone: '(555) 123-4567',
    employmentType: 'salary',
    salary: 75000,
    projectIds: ['1', '2']
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    role: 'Junior Woodworker',
    email: 'emma.rodriguez@example.com',
    phone: '(555) 234-5678',
    employmentType: 'wage',
    hourlyRate: 25,
    projectIds: ['3']
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Workshop Assistant',
    email: 'james.wilson@example.com',
    phone: '(555) 345-6789',
    employmentType: 'wage',
    hourlyRate: 20,
    projectIds: []
  }
];
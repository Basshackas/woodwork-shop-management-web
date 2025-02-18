import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Custom Dining Table',
    status: 'in-progress',
    clientName: 'John Smith',
    startDate: '2024-02-01',
    dueDate: '2024-03-15',
    description: 'Handcrafted dining table with matching chairs',
    estimatedHours: 40,
    materials: []
  },
  {
    id: '2',
    title: 'Kitchen Cabinets',
    status: 'pending',
    clientName: 'Sarah Johnson',
    startDate: '2024-03-01',
    dueDate: '2024-04-15',
    description: 'Custom kitchen cabinet set',
    estimatedHours: 60,
    materials: []
  },
  {
    id: '3',
    title: 'Outdoor Bench Set',
    status: 'completed',
    clientName: 'Mike Williams',
    startDate: '2024-01-15',
    dueDate: '2024-02-28',
    description: 'Weather-resistant outdoor bench set',
    estimatedHours: 30,
    materials: []
  }
];
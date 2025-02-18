import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'Table Saw',
    status: 'available',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15'
  },
  {
    id: '2',
    name: 'Router',
    status: 'in-use',
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-03-10'
  },
  {
    id: '3',
    name: 'Band Saw',
    status: 'maintenance',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-03-20'
  }
];
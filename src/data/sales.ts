import { SaleTransaction } from '../types';

export const sales: SaleTransaction[] = [
  {
    id: '1',
    customerName: 'John Smith',
    items: [
      { id: '1', name: 'Custom Dining Table', quantity: 1, price: 2500 },
      { id: '2', name: 'Dining Chairs', quantity: 6, price: 300 }
    ],
    totalAmount: 4300,
    date: '2024-02-28'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    items: [
      { id: '3', name: 'Kitchen Cabinets Set', quantity: 1, price: 8000 }
    ],
    totalAmount: 8000,
    date: '2024-02-25'
  }
];
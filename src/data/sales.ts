import { SaleTransaction } from '../types';

export const sales: SaleTransaction[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerType: 'retail',
    items: [
      { id: '1', name: 'Custom Dining Table', quantity: 1, price: 2500, description: 'Handcrafted oak dining table' },
      { id: '2', name: 'Dining Chairs', quantity: 6, price: 300, description: 'Matching oak dining chairs' }
    ],
    totalAmount: 4300,
    date: '2024-03-15',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    invoiceNumber: 'INV-2024-001',
    dueDate: '2024-03-29',
    notes: 'Custom order with rush delivery',
    attachments: []
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerType: 'corporate',
    items: [
      { id: '3', name: 'Kitchen Cabinets Set', quantity: 1, price: 8000, description: 'Complete kitchen cabinet set' }
    ],
    totalAmount: 8000,
    date: '2024-03-14',
    paymentStatus: 'pending',
    paymentMethod: 'bank_transfer',
    invoiceNumber: 'INV-2024-002',
    dueDate: '2024-03-28',
    notes: 'Corporate office renovation project',
    attachments: []
  },
  {
    id: '3',
    customerName: 'Mike Williams',
    customerType: 'retail',
    items: [
      { id: '4', name: 'Coffee Table', quantity: 1, price: 800, description: 'Modern design coffee table' },
      { id: '5', name: 'Side Tables', quantity: 2, price: 400, description: 'Matching side tables' }
    ],
    totalAmount: 1600,
    date: '2024-03-13',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    invoiceNumber: 'INV-2024-003',
    dueDate: '2024-03-27',
    notes: 'Living room set',
    attachments: []
  },
  {
    id: '4',
    customerName: 'Emily Brown',
    customerType: 'wholesale',
    items: [
      { id: '6', name: 'Bar Stools', quantity: 12, price: 150, description: 'Modern bar stools' },
      { id: '7', name: 'Dining Tables', quantity: 4, price: 1200, description: 'Restaurant dining tables' }
    ],
    totalAmount: 6600,
    date: '2024-03-12',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    invoiceNumber: 'INV-2024-004',
    dueDate: '2024-03-26',
    notes: 'Restaurant furniture order',
    attachments: []
  },
  {
    id: '5',
    customerName: 'David Clark',
    customerType: 'retail',
    items: [
      { id: '8', name: 'Bookshelf', quantity: 2, price: 900, description: 'Custom built-in bookshelf' }
    ],
    totalAmount: 1800,
    date: '2024-03-11',
    paymentStatus: 'overdue',
    paymentMethod: 'credit_card',
    invoiceNumber: 'INV-2024-005',
    dueDate: '2024-03-25',
    notes: 'Home office furniture',
    attachments: []
  }
];

// Time ranges
export const TIME_RANGES = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
} as const;

// Status colors
export const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  available: 'bg-green-100 text-green-800',
  'in-use': 'bg-blue-100 text-blue-800',
  maintenance: 'bg-red-100 text-red-800'
} as const;

// Project statuses
export const PROJECT_STATUSES = [
  'pending',
  'in-progress', 
  'completed',
  'on-hold',
  'cancelled'
] as const;

// Payment methods
export const PAYMENT_METHODS = [
  'credit_card',
  'bank_transfer',
  'cash',
  'check'
] as const;
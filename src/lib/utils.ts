import { STATUS_COLORS } from './constants';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getStatusColor(status: keyof typeof STATUS_COLORS): string {
  return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
}

export function generateChartData(type: 'sales' | 'expenses', range: 'week' | 'month' | 'year') {
  const data = [];
  const baseValue = type === 'sales' ? 5000 : 2000;
  const variance = type === 'sales' ? 2000 : 1000;

  let points: number;
  let format: Intl.DateTimeFormatOptions;

  switch (range) {
    case 'week':
      points = 7;
      format = { weekday: 'short' };
      break;
    case 'month':
      points = 30;
      format = { day: 'numeric', month: 'short' };
      break;
    case 'year':
      points = 12;
      format = { month: 'short' };
      break;
  }

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date();
    if (range === 'year') {
      date.setMonth(date.getMonth() - i);
    } else {
      date.setDate(date.getDate() - i);
    }
    
    data.push({
      name: date.toLocaleDateString('en-US', format),
      value: Math.max(0, baseValue + Math.random() * variance - variance / 2)
    });
  }

  return data;
}
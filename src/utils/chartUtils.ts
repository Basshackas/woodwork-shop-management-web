type ChartDataType = 'sales' | 'expenses';
type TimeRange = 'week' | 'month' | 'year';

export function generateChartData(type: ChartDataType, range: TimeRange) {
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
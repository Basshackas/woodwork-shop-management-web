import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { generateChartData } from '../../utils/chartUtils';

interface ExpenseChartProps {
  isDashboard?: boolean;
  timeRange?: 'week' | 'month' | 'year';
}

export function ExpenseChart({ isDashboard = false, timeRange = 'week' }: ExpenseChartProps) {
  const data = generateChartData('expenses', timeRange);
  const textColor = isDashboard ? '#374151' : '#fff';

  return (
    <div className={isDashboard ? 'h-full' : 'h-32'}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: textColor }}
          />
          <YAxis 
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={{ stroke: textColor }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#f87171"
            fillOpacity={1}
            fill="url(#expenseGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
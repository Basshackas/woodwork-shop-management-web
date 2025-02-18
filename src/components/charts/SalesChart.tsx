import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { generateChartData } from '../../utils/chartUtils';

interface SalesChartProps {
  isDashboard?: boolean;
  timeRange?: 'week' | 'month' | 'year';
}

export function SalesChart({ isDashboard = false, timeRange = 'week' }: SalesChartProps) {
  const data = generateChartData('sales', timeRange);
  const textColor = isDashboard ? '#374151' : '#fff';

  return (
    <div className={isDashboard ? 'h-full' : 'h-32'}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
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
            stroke="#fbbf24"
            fillOpacity={1}
            fill="url(#salesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

export function StatCard({ icon, title, value, trend, trendType = 'neutral' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-sm ${
          trendType === 'positive' ? 'text-green-600' :
          trendType === 'negative' ? 'text-red-600' :
          'text-gray-500'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-700 font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

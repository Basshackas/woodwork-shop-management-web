import React from 'react';
import { sales } from '../../data/sales';

export function RecentTransactions() {
  const recentSales = sales.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {recentSales.map((sale) => (
          <div key={sale.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-medium">{sale.customerName}</p>
              <p className="text-sm text-gray-500">{sale.date}</p>
            </div>
            <span className="text-lg font-semibold">${sale.totalAmount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
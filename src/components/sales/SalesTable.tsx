import React, { useState } from 'react';
import { sales } from '../../data/sales';
import { SaleTransaction } from '../../types';

export function SalesTable() {
  const [sortField, setSortField] = useState<keyof SaleTransaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedSales = [...sales]
    .filter(sale => 
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }
      return sortDirection === 'asc'
        ? a[sortField] > b[sortField] ? 1 : -1
        : b[sortField] > a[sortField] ? 1 : -1;
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sales Transactions</h2>
        <input
          type="text"
          placeholder="Search by customer..."
          className="px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Items</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.map(sale => (
              <tr key={sale.id} className="border-b">
                <td className="py-2">{sale.date}</td>
                <td className="py-2">{sale.customerName}</td>
                <td className="py-2">
                  {sale.items.map(item => (
                    <div key={item.id} className="text-sm">
                      {item.quantity}x {item.name} @ ${item.price}
                    </div>
                  ))}
                </td>
                <td className="py-2 text-right">${sale.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
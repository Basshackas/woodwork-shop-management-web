import React, { useState } from 'react';
import { Download, Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: 'salary' | 'bonus' | 'reimbursement';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  description: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 2500,
    type: 'salary',
    status: 'completed',
    reference: 'PAY-2024-03-15',
    description: 'Bi-weekly salary payment'
  },
  {
    id: '2',
    date: '2024-03-01',
    amount: 2500,
    type: 'salary',
    status: 'completed',
    reference: 'PAY-2024-03-01',
    description: 'Bi-weekly salary payment'
  },
  {
    id: '3',
    date: '2024-02-15',
    amount: 500,
    type: 'bonus',
    status: 'completed',
    reference: 'BON-2024-02-15',
    description: 'Performance bonus'
  }
];

export function PaymentHistory() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || payment.type === filterType;
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment History</h3>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Payments</p>
            <p className="text-xl font-bold">${totalAmount.toLocaleString()}</p>
          </div>
          <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
            <Download size={16} />
            Export History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="salary">Salary</option>
          <option value="bonus">Bonus</option>
          <option value="reimbursement">Reimbursement</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payment.type === 'salary' ? 'bg-blue-100 text-blue-800' :
                    payment.type === 'bonus' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {payment.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  ${payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-amber-600 hover:text-amber-700">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-400" size={20} />
            <div>
              <p className="font-medium">Next Payment</p>
              <p className="text-sm text-gray-600">March 31, 2024</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="text-gray-400" size={20} />
            <div>
              <p className="font-medium">YTD Earnings</p>
              <p className="text-sm text-gray-600">$15,000</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Filter className="text-gray-400" size={20} />
            <div>
              <p className="font-medium">Tax Withholdings</p>
              <p className="text-sm text-gray-600">$3,750 (25%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
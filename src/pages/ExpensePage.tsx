import React, { useState } from 'react';
import { ExpenseChart } from '../components/charts/ExpenseChart';
import { expenses } from '../data/expenses';
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  FileText,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Sliders,
  X,
  Upload,
  Receipt,
  CreditCard
} from 'lucide-react';
import { Expense } from '../types';

export function ExpensePage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof Expense>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    name: '',
    category: 'materials',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    recurring: false,
    paymentMethod: 'credit_card'
  });

  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(expense => 
        selectedStatus === 'approved' ? expense.approved : !expense.approved
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction * (aValue - bValue);
      }
      
      return 0;
    });
  };

  const filteredExpenses = getFilteredExpenses();
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleSort = (field: keyof Expense) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewExpense(false);
    setNewExpense({
      name: '',
      category: 'materials',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      recurring: false,
      paymentMethod: 'credit_card'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expense Management</h1>
          <p className="text-gray-600">Track and manage your business expenses</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Download size={20} />
            Export
          </button>
          <button
            onClick={() => setShowNewExpense(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus size={20} />
            New Expense
          </button>
        </div>
      </div>

      {showNewExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Expense</h2>
              <button 
                onClick={() => setShowNewExpense(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expense Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
                  >
                    <option value="materials">Materials</option>
                    <option value="tools">Tools</option>
                    <option value="utilities">Utilities</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newExpense.paymentMethod}
                    onChange={(e) => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="check">Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Receipt</label>
                  <div className="mt-1 flex items-center">
                    <label className="block w-full">
                      <span className="sr-only">Choose receipt file</span>
                      <input type="file" className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-amber-50 file:text-amber-700
                        hover:file:bg-amber-100
                      "/>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newExpense.recurring}
                  onChange={(e) => setNewExpense({ ...newExpense, recurring: e.target.checked })}
                  className="rounded text-amber-600"
                />
                <label htmlFor="recurring" className="text-sm text-gray-700">
                  This is a recurring expense
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewExpense(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-red-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +8.4% from last period
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Monthly</p>
              <p className="text-2xl font-bold">${(totalExpenses / 3).toLocaleString()}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <ArrowDownRight size={16} />
                -2.3% from last period
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold">
                {filteredExpenses.filter(e => !e.approved).length}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowDownRight size={16} />
                -4.1% from last period
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cost Reduction</p>
              <p className="text-2xl font-bold">12.3%</p>
              <p className="text-sm text-purple-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +2.5% from target
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-amber-800 text-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Expense Trends</h2>
              <p className="text-3xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'week' ? 'bg-white text-amber-800' : 'hover:bg-white/10'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'month' ? 'bg-white text-amber-800' : 'hover:bg-white/10'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'year' ? 'bg-white text-amber-800' : 'hover:bg-white/10'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <ExpenseChart timeRange={timeRange} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    category === 'materials' ? 'bg-blue-500' :
                    category === 'tools' ? 'bg-green-500' :
                    category === 'utilities' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`} />
                  <span className="capitalize">{category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">${total.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">
                    {((total / totalExpenses) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Expense Transactions</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <Sliders size={16} className="inline-block mr-1" />
                Filters
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                <Download size={16} className="inline-block mr-1" />
                Export
              </button>
            </div>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? '' : 'hidden'}`}>
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="materials">Materials</option>
              <option value="tools">Tools</option>
              <option value="utilities">Utilities</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </select>
            <select
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('date')}>
                  Date
                  {sortField === 'date' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}>
                  Name
                  {sortField === 'name' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('category')}>
                  Category
                  {sortField === 'category' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}>
                  Amount
                  {sortField === 'amount' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                    {expense.recurring && (
                      <span className="text-xs text-amber-600">Recurring</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      expense.category === 'materials' ? 'bg-blue-100 text-blue-800' :
                      expense.category === 'tools' ? 'bg-green-100 text-green-800' :
                      expense.category === 'utilities' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${expense.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      expense.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-amber-600 hover:text-amber-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
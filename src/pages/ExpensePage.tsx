import React, { useState, useMemo } from 'react';
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
  CreditCard,
  Building2,
  Wallet,
  Package,
  Zap,
  Truck,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Share2,
  Percent
} from 'lucide-react'; 
import { Expense } from '../types';

// Enhanced analytics calculations
const calculateAnalytics = (expenseData: Expense[]) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  const lastMonthExpenses = expenseData.filter(expense => new Date(expense.date) >= thirtyDaysAgo);

  // Calculate total expenses
  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0);
  const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate average expense
  const averageExpense = totalExpenses / (expenseData.length || 1);
  const lastMonthAverage = lastMonthTotal / (lastMonthExpenses.length || 1);

  // Calculate growth rates
  const expenseGrowth = totalExpenses > 0 ? ((lastMonthTotal - totalExpenses) / totalExpenses) * 100 : 0;

  // Calculate category distribution
  const categoryTotals = expenseData.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate recurring vs one-time expenses
  const recurringExpenses = expenseData.filter(expense => expense.recurring);
  const recurringTotal = recurringExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const recurringPercentage = totalExpenses > 0 ? (recurringTotal / totalExpenses) * 100 : 0;

  // Payment method distribution
  const paymentMethods = expenseData.reduce((acc, expense) => {
    acc[expense.paymentMethod] = (acc[expense.paymentMethod] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalExpenses,
    lastMonthTotal,
    averageExpense,
    lastMonthAverage,
    expenseGrowth,
    categoryTotals,
    recurringTotal,
    recurringPercentage,
    paymentMethods
  };
};

export function ExpensePage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof Expense>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'transactions' | 'analytics'>('overview');
  const [expandedExpense, setExpandedExpense] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date()
  ]);

  const analytics = useMemo(() => calculateAnalytics(expenses), [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = 
        expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'approved' ? expense.approved : !expense.approved);
      const matchesDateRange = new Date(expense.date) >= dateRange[0] && 
        new Date(expense.date) <= dateRange[1];
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDateRange;
    }).sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'date') {
        return direction * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return direction * (String(a[sortField]).localeCompare(String(b[sortField])));
    });
  }, [expenses, searchTerm, selectedCategory, selectedStatus, dateRange, sortField, sortDirection]);

  const expenseTrends = useMemo(() => {
    const trends = filteredExpenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(trends).map(([month, amount]) => ({
      month,
      amount,
      growth: amount ? ((amount - (trends[month] || 0)) / (trends[month] || 1)) * 100 : 0
    }));
  }, [filteredExpenses]);

  const topCategories = useMemo(() => {
    const categories = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, total]) => ({ name, total }));
  }, [filteredExpenses]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'materials':
        return <Package className="w-4 h-4" />;
      case 'tools':
        return <Zap className="w-4 h-4" />; // Replaced Tool with Zap or any other suitable icon
      case 'utilities':
        return <Zap className="w-4 h-4" />;
      case 'maintenance':
        return <Truck className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expense Management</h1>
          <p className="text-gray-600">Track and analyze your business expenses</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Share2 size={20} />
            Share Report
          </button>
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

      {/* View Selection Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'overview' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('transactions')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'transactions' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setSelectedView('analytics')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'analytics' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Analytics
        </button>
      </div>

      {selectedView === 'overview' && (
        <>
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold">${analytics.totalExpenses.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    analytics.expenseGrowth >= 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {analytics.expenseGrowth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analytics.expenseGrowth).toFixed(1)}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Expense</p>
                  <p className="text-2xl font-bold">${analytics.averageExpense.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    analytics.lastMonthAverage >= analytics.averageExpense ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {analytics.lastMonthAverage >= analytics.averageExpense ? 
                      <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(((analytics.lastMonthAverage - analytics.averageExpense) / 
                      analytics.averageExpense) * 100).toFixed(1)}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recurring Expenses</p>
                  <p className="text-2xl font-bold">${analytics.recurringTotal.toLocaleString()}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <Percent size={16} />
                    {analytics.recurringPercentage.toFixed(1)}% of total
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold">
                    {filteredExpenses.filter(e => !e.approved).length}
                  </p>
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <Clock size={16} />
                    Requires attention
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-amber-800 text-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Expense Overview</h2>
                  <p className="text-3xl font-bold mt-2">${analytics.totalExpenses.toLocaleString()}</p>
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                        {getCategoryIcon(category.name)}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{category.name}</p>
                        <p className="text-sm text-gray-600">
                          ${category.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm ${
                      index === 0 ? 'text-red-600' :
                      index === 1 ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>
                      {((category.total / analytics.totalExpenses) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods and Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
              <div className="space-y-4">
                {Object.entries(analytics.paymentMethods).map(([method, amount]) => (
                  <div key={method} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {method === 'credit_card' ? <CreditCard className="text-blue-600" size={20} /> :
                       method === 'cash' ? <DollarSign className="text-green-600" size={20} /> :
                       <Building2 className="text-purple-600" size={20} />}
                      <span className="capitalize">{method.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">${amount.toLocaleString()}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            method === 'credit_card' ? 'bg-blue-500' :
                            method === 'cash' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${(amount / analytics.totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
              <div className="space-y-4">
                {Object.entries(analytics.categoryTotals).map(([category, total]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(category)}
                      </div>
                      <span className="capitalize">{category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">${total.toLocaleString()}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${(total / analytics.totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

{selectedView === 'transactions' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="mt-1 flex gap-4">
                    <input
                      type="date"
                      className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={dateRange[0].toISOString().split('T')[0]}
                      onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
                    />
                    <input
                      type="date"
                      className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={dateRange[1].toISOString().split('T')[0]}
                      onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
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
                </select>
                <select
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => setSortField('date')}>
                    Date
                    {sortField === 'date' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => setSortField('name')}>
                    Description
                    {sortField === 'name' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => setSortField('amount')}>
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
                  <React.Fragment key={expense.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedExpense(expandedExpense === expense.id ? null : expense.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                        <div className="text-sm text-gray-500">{expense.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        <button className="text-amber-600 hover:text-amber-900">
                          {expandedExpense === expense.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedExpense === expense.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Payment Method</p>
                              <p className="mt-1 capitalize">{expense.paymentMethod.replace('_', ' ')}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Vendor</p>
                              <p className="mt-1">{expense.vendor || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Receipt</p>
                              {expense.receipt ? (
                                <button className="mt-1 text-amber-600 hover:text-amber-700">
                                  View Receipt
                                </button>
                              ) : (
                                <p className="mt-1 text-gray-500">No receipt attached</p>
                              )}
                            </div>
                          </div>
                          {expense.recurring && (
                            <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-blue-600">
                                <Clock size={16} />
                                <span>Recurring Expense</span>
                              </div>
                              <p className="mt-1 text-sm text-blue-600">
                                This expense is automatically recorded {expense.frequency}
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'analytics' && (
        <div className="space-y-6">
          {/* Expense Trends Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Expense Trends</h2>
              <div className="space-y-4">
                {expenseTrends.map(trend => (
                  <div key={trend.month} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium">{trend.month}</p>
                        <p className="text-sm text-gray-600">${trend.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      trend.growth >= 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {trend.growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(trend.growth).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">By Category</h3>
                  <div className="space-y-2">
                    {Object.entries(analytics.categoryTotals).map(([category, total]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: `${(total / analytics.totalExpenses) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {((total / analytics.totalExpenses) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">By Payment Method</h3>
                  <div className="space-y-2">
                    {Object.entries(analytics.paymentMethods).map(([method, amount]) => (
                      <div key={method} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(amount / analytics.totalExpenses) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {((amount / analytics.totalExpenses) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Expense Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-yellow-800">High Expense Categories</p>
                    <p className="text-sm text-yellow-600">
                      Materials expenses are 25% higher than last month
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <TrendingUp className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Cost Reduction</p>
                    <p className="text-sm text-green-600">
                      Utility costs reduced by 15% through efficiency measures
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Receipt className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-blue-800">Recurring Expenses</p>
                    <p className="text-sm text-blue-600">
                      {analytics.recurringPercentage.toFixed(1)}% of expenses are recurring
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                  <BarChart2 className="text-purple-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-purple-800">Budget Utilization</p>
                    <p className="text-sm text-purple-600">
                      Currently at 85% of monthly budget allocation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

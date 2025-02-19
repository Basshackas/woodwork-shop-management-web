import React, { useState, useMemo } from 'react';
import { SalesChart } from '../components/charts/SalesChart';
import { sales } from '../data/sales';
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
  CreditCard,
  Receipt,
  UserPlus,
  Package,
  Mail,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  Percent,
  ShoppingCart,
  AlertTriangle,
  RefreshCw,
  Share2
} from 'lucide-react';
import { SaleTransaction, SaleItem } from '../types';

// Enhanced analytics calculations
const calculateAnalytics = (salesData: SaleTransaction[]) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  const lastMonthSales = salesData.filter(sale => new Date(sale.date) >= thirtyDaysAgo);

  // Calculate total sales and revenue
  const totalSales = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const lastMonthTotal = lastMonthSales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  // Calculate average order value
  const averageOrderValue = totalSales / salesData.length;
  const lastMonthAverage = lastMonthTotal / lastMonthSales.length;

  // Calculate growth rates
  const revenueGrowth = ((lastMonthTotal - totalSales) / totalSales) * 100;
  const transactionGrowth = ((lastMonthSales.length - salesData.length) / salesData.length) * 100;

  // Calculate customer metrics
  const uniqueCustomers = new Set(salesData.map(sale => sale.customerName)).size;
  const repeatCustomers = salesData.reduce((acc, sale) => {
    acc[sale.customerName] = (acc[sale.customerName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const repeatRate = (Object.values(repeatCustomers).filter(count => count > 1).length / uniqueCustomers) * 100;

  // Payment method distribution
  const paymentMethods = salesData.reduce((acc, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalSales,
    lastMonthTotal,
    averageOrderValue,
    lastMonthAverage,
    revenueGrowth,
    transactionGrowth,
    uniqueCustomers,
    repeatRate,
    paymentMethods
  };
};

export function SalesPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSale, setShowNewSale] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof SaleTransaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date()
  ]);
  const [selectedView, setSelectedView] = useState<'overview' | 'transactions' | 'analytics'>('overview');
  const [expandedSale, setExpandedSale] = useState<string | null>(null);

  // Calculate analytics using the memoized helper
  const analytics = useMemo(() => calculateAnalytics(sales), []);

  // Enhanced filtering
  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      const matchesSearch = 
        sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = selectedPaymentStatus === 'all' || sale.paymentStatus === selectedPaymentStatus;
      const matchesDateRange = new Date(sale.date) >= dateRange[0] && new Date(sale.date) <= dateRange[1];
      
      return matchesSearch && matchesStatus && matchesDateRange;
    }).sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'date') {
        return direction * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return direction * (String(a[sortField]).localeCompare(String(b[sortField])));
    });
  }, [sales, searchTerm, selectedPaymentStatus, dateRange, sortField, sortDirection]);

  // Calculate sales trends
  const salesTrends = useMemo(() => {
    const trends = filteredSales.reduce((acc, sale) => {
      const month = new Date(sale.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + sale.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(trends).map(([month, amount]) => ({
      month,
      amount,
      growth: ((amount - (trends[month] || 0)) / (trends[month] || 1)) * 100
    }));
  }, [filteredSales]);

  // Calculate top products
  const topProducts = useMemo(() => {
    const products = filteredSales.flatMap(sale => sale.items)
      .reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + (item.quantity * item.price);
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(products)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, revenue]) => ({ name, revenue }));
  }, [filteredSales]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Management</h1>
          <p className="text-gray-600">Track and analyze your sales performance</p>
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
            onClick={() => setShowNewSale(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus size={20} />
            New Sale
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
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${analytics.totalSales.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    analytics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.revenueGrowth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(analytics.revenueGrowth).toFixed(1)}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Order Value</p>
                  <p className="text-2xl font-bold">${analytics.averageOrderValue.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    analytics.lastMonthAverage >= analytics.averageOrderValue ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.lastMonthAverage >= analytics.averageOrderValue ? 
                      <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(((analytics.lastMonthAverage - analytics.averageOrderValue) / 
                      analytics.averageOrderValue) * 100).toFixed(1)}% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Retention</p>
                  <p className="text-2xl font-bold">{analytics.repeatRate.toFixed(1)}%</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    {analytics.uniqueCustomers} total customers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">68.2%</p>
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +3.2% from last month
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-amber-800 text-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Revenue Overview</h2>
                  <p className="text-3xl font-bold mt-2">${analytics.totalSales.toLocaleString()}</p>
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
              <SalesChart timeRange={timeRange} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Top Products</h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          ${product.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm ${
                      index === 0 ? 'text-green-600' :
                      index === 1 ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>
                      {((product.revenue / analytics.totalSales) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods and Customer Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
              <div className="space-y-4">
                {Object.entries(analytics.paymentMethods).map(([method, count]) => (
                  <div key={method} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {method === 'credit_card' ? <CreditCard className="text-blue-600" size={20} /> :
                       method === 'cash' ? <DollarSign className="text-green-600" size={20} /> :
                       <Receipt className="text-purple-600" size={20} />}
                      <span className="capitalize">{method.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{count} transactions</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            method === 'credit_card' ? 'bg-blue-500' :
                            method === 'cash' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${(count / sales.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Customer Insights</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold">{analytics.uniqueCustomers}</p>
                  <p className="text-sm text-green-600">+12.3% this month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Repeat Rate</p>
                  <p className="text-2xl font-bold">{analytics.repeatRate.toFixed(1)}%</p>
                  <p className="text-sm text-blue-600">+5.2% this month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Avg. Time Between Orders</p>
                  <p className="text-2xl font-bold">15.2 days</p>
                  <p className="text-sm text-green-600">-2.3 days improvement</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">4.8/5.0</p>
                  <p className="text-sm text-green-600">+0.2 this month</p>
                </div>
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
                  placeholder="Search transactions..."
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
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={selectedCustomerType}
                  onChange={(e) => setSelectedCustomerType(e.target.value)}
                >
                  <option value="all">All Customer Types</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
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
                      onClick={() => setSortField('customerName')}>
                    Customer
                    {sortField === 'customerName' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => setSortField('totalAmount')}>
                    Total
                    {sortField === 'totalAmount' && (
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
                {filteredSales.map((sale) => (
                  <React.Fragment key={sale.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedSale(expandedSale === sale.id ? null : sale.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                        <div className="text-sm text-gray-500">{sale.customerType}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {sale.items.length} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        ${sale.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sale.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          sale.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sale.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-amber-600 hover:text-amber-900">
                          {expandedSale === sale.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedSale === sale.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                <p className="mt-1">{sale.paymentMethod}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Invoice Number</p>
                                <p className="mt-1">{sale.invoiceNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Due Date</p>
                                <p className="mt-1">{sale.dueDate}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-2">Items</p>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Quantity</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {sale.items.map((item) => (
                                    <tr key={item.id}>
                                      <td className="px-4 py-2">{item.name}</td>
                                      <td className="px-4 py-2 text-right">{item.quantity}</td>
                                      <td className="px-4 py-2 text-right">${item.price}</td>
                                      <td className="px-4 py-2 text-right">${item.quantity * item.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                  <tr>
                                    <td colSpan={3} className="px-4 py-2 text-right font-medium">Total</td>
                                    <td className="px-4 py-2 text-right font-medium">${sale.totalAmount}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                                Download Invoice
                              </button>
                              <button className="px-3 py-1 text-sm bg-amber-600 text-white rounded hover:bg-amber-700">
                                Send to Customer
                              </button>
                            </div>
                          </div>
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
          {/* Sales Performance Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <span className="text-green-600 text-sm">+5.2%</span>
                </div>
                <p className="text-2xl font-bold">68.2%</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '68.2%' }} />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Sales Target</p>
                  <span className="text-amber-600 text-sm">92.5%</span>
                </div>
                <p className="text-2xl font-bold">$92,500</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '92.5%' }} />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <span className="text-blue-600 text-sm">96%</span>
                </div>
                <p className="text-2xl font-bold">4.8/5.0</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Trends Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Sales Trends</h2>
              <div className="space-y-4">
                {salesTrends.map(trend => (
                  <div key={trend.month} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium">{trend.month}</p>
                        <p className="text-sm text-gray-600">${trend.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      trend.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trend.growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(trend.growth).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">By Payment Method</h3>
                  <div className="space-y-2">
                    {Object.entries(analytics.paymentMethods).map(([method, count]) => (
                      <div key={method} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: `${(count / sales.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {((count / sales.length) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">By Customer Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retail</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                        </div>
                        <span className="text-sm text-gray-600">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wholesale</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                        </div>
                        <span className="text-sm text-gray-600">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Corporate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }} />
                        </div>
                        <span className="text-sm text-gray-600">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-600">Customer Acquisition</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">{analytics.uniqueCustomers}</p>
                      <p className="text-sm text-gray-600">Total Customers</p>
                    </div>
                    <Users className="text-amber-600" size={24} />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>New vs Returning</span>
                      <span className="text-green-600">+12.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-600">Average Order Value</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">${analytics.averageOrderValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Per Transaction</p>
                    </div>
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Growth Rate</span>
                      <span className="text-green-600">+8.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-600">Customer Retention</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">{analytics.repeatRate.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Repeat Purchase Rate</p>
                    </div>
                    <RefreshCw className="text-blue-600" size={24} />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Target Progress</span>
                      <span className="text-blue-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts and Recommendations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Insights & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-yellow-800">Low Stock Alert</p>
                    <p className="text-sm text-yellow-600">
                      5 popular products are running low on inventory. Consider restocking soon.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <TrendingUp className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Sales Opportunity</p>
                    <p className="text-sm text-green-600">
                      Customer purchase patterns suggest potential for upselling in the premium category.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Users className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-blue-800">Customer Segment Growth</p>
                    <p className="text-sm text-blue-600">
                      Corporate client segment shows 25% growth. Consider developing targeted promotions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                  <BarChart2 className="text-purple-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-purple-800">Performance Insight</p>
                    <p className="text-sm text-purple-600">
                      Weekend sales show consistent growth. Consider extending hours during peak times.
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

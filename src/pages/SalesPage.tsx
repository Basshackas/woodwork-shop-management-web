import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { SaleTransaction, SaleItem } from '../types';

export function SalesPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSale, setShowNewSale] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof SaleTransaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [newSale, setNewSale] = useState<Partial<SaleTransaction>>({
    customerName: '',
    items: [],
    totalAmount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentStatus: 'pending',
    paymentMethod: 'credit_card'
  });
  const [newItem, setNewItem] = useState<Partial<SaleItem>>({
    name: '',
    quantity: 1,
    price: 0
  });

  // Calculate total sales
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  // Calculate average order value
  const averageOrderValue = totalSales / sales.length;

  // Calculate unique customers
  const repeatCustomers = new Set(sales.map(sale => sale.customerName)).size;

  // Filter and sort sales
  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedPaymentStatus === 'all' || sale.paymentStatus === selectedPaymentStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
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

  const handleSort = (field: keyof SaleTransaction) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const addItemToSale = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      setNewSale({
        ...newSale,
        items: [...(newSale.items || []), {
          id: String(Date.now()),
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price,
          description: newItem.description || ''
        } as SaleItem],
        totalAmount: (newSale.totalAmount || 0) + (newItem.quantity * newItem.price)
      });
      setNewItem({
        name: '',
        quantity: 1,
        price: 0
      });
    }
  };

  const removeItem = (itemId: string) => {
    const item = newSale.items?.find(i => i.id === itemId);
    if (item) {
      setNewSale({
        ...newSale,
        items: newSale.items?.filter(i => i.id !== itemId) || [],
        totalAmount: (newSale.totalAmount || 0) - (item.quantity * item.price)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowNewSale(false);
    setNewSale({
      customerName: '',
      items: [],
      totalAmount: 0,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: 'pending',
      paymentMethod: 'credit_card'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Management</h1>
          <p className="text-gray-600">Track and manage your sales transactions</p>
        </div>
        <div className="flex gap-2">
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

      {/* New Sale Form Modal */}
      {showNewSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Sale</h2>
              <button 
                onClick={() => setShowNewSale(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.customerName}
                      onChange={(e) => setNewSale({ ...newSale, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.customerEmail}
                      onChange={(e) => setNewSale({ ...newSale, customerEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.customerPhone}
                      onChange={(e) => setNewSale({ ...newSale, customerPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Type</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.customerType}
                      onChange={(e) => setNewSale({ ...newSale, customerType: e.target.value })}
                    >
                      <option value="retail">Retail</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Items</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Item Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addItemToSale}
                    className="w-full px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200"
                  >
                    Add Item
                  </button>

                  {/* Items List */}
                  <div className="mt-4 space-y-2">
                    {newSale.items?.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} x ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">${item.quantity * item.price}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.paymentMethod}
                      onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value })}
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={newSale.paymentStatus}
                      onChange={(e) => setNewSale({ ...newSale, paymentStatus: e.target.value as SaleTransaction['paymentStatus'] })}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>Total Amount:</span>
                    <span>${newSale.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewSale(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Create Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +12.5% from last period
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
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold">${averageOrderValue.toLocaleString()}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +5.3% from last period
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
              <p className="text-sm text-gray-600">Unique Customers</p>
              <p className="text-2xl font-bold">{repeatCustomers}</p>
              <p className="text-sm text-purple-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +8.1% from last period
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold">68.2%</p>
              <p className="text-sm text-amber-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +3.2% from last period
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-amber-800 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <p className="text-3xl font-bold mt-2">${totalSales.toLocaleString()}</p>
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

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sales Transactions</h3>
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
                  placeholder="Search sales..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
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
                    onClick={() => handleSort('customerName')}>
                  Customer
                  {sortField === 'customerName' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalAmount')}>
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
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                    <div className="text-sm text-gray-500">{sale.customerType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {sale.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-gray-500">${item.price}</span>
                        </div>
                      ))}
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
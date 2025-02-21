import React, { useState } from 'react';
import { Client, PaymentRecord, Invoice } from '../../types';
import {
  DollarSign,
  Calendar,
  Download,
  Send,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Plus,
  Filter,
  Search
} from 'lucide-react';

interface PaymentHistoryProps {
  client: Client;
}

export function PaymentHistory({ client }: PaymentHistoryProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<PaymentRecord>>({
    amount: 0,
    method: 'bank_transfer',
    status: 'pending',
    reference: '',
    notes: ''
  });

  const filteredInvoices = client.invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment addition logic here
    setShowAddPayment(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Billed</p>
              <p className="text-2xl font-bold">${client.totalBilled.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold">${client.totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-bold">${client.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Terms</p>
              <p className="text-2xl font-bold">{client.paymentTerms || 'Net 30'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices and Payments */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Invoices & Payments</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddPayment(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <Plus size={20} />
                Record Payment
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="divide-y">
          {filteredInvoices.map(invoice => (
            <div key={invoice.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Invoice #{invoice.number}</h3>
                    <p className="text-sm text-gray-600">
                      Issued: {new Date(invoice.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  <p className="mt-1 font-medium">
                    ${invoice.total.toLocaleString()}
                    {invoice.balance > 0 && (
                      <span className="text-sm text-red-600 ml-2">
                        (${invoice.balance.toLocaleString()} due)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 justify-end">
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <Download size={16} />
                  Download
                </button>
                <button className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                  <Send size={16} />
                  Send Reminder
                </button>
                <button
                  onClick={() => setSelectedInvoice(selectedInvoice === invoice.id ? null : invoice.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  {selectedInvoice === invoice.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                  {selectedInvoice === invoice.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {selectedInvoice === invoice.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Payment History</h4>
                  <div className="space-y-2">
                    {client.paymentHistory
                      .filter(payment => payment.invoiceId === invoice.id)
                      .map(payment => (
                        <div
                          key={payment.id}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(payment.date).toLocaleDateString()}</span>
                            <span className="text-gray-600">
                              via {payment.method.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">
                              ${payment.amount.toLocaleString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Record Payment</h2>
              <button
                onClick={() => setShowAddPayment(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Invoice</option>
                  {client.invoices
                    .filter(invoice => invoice.balance > 0)
                    .map(invoice => (
                      <option key={invoice.id} value={invoice.id}>
                        #{invoice.number} - ${invoice.balance.toLocaleString()} due
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    className="block w-full pl-7 pr-3 py-2 border rounded-lg"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value as PaymentRecord['method'] })}
                  required
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Reference Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newPayment.reference}
                  onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
                  placeholder="e.g., Check number or transaction ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  placeholder="Any additional payment details"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPayment(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

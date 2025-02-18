import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, Repeat, ChevronRight, Plus } from 'lucide-react';

interface ScheduledPayment {
  id: string;
  amount: number;
  date: string;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  description: string;
  account: string;
}

export function PaymentScheduling() {
  const [scheduledPayments, setScheduledPayments] = useState<ScheduledPayment[]>([
    {
      id: '1',
      amount: 2500,
      date: '2024-03-31',
      frequency: 'bi-weekly',
      description: 'Regular salary payment',
      account: 'Chase Bank (...4567)'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<ScheduledPayment>>({
    amount: 0,
    date: '',
    frequency: 'one-time',
    description: '',
    account: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payment: ScheduledPayment = {
      id: String(scheduledPayments.length + 1),
      ...newPayment as Omit<ScheduledPayment, 'id'>
    };
    setScheduledPayments([...scheduledPayments, payment]);
    setShowAddForm(false);
    setNewPayment({
      amount: 0,
      date: '',
      frequency: 'one-time',
      description: '',
      account: ''
    });
  };

  const cancelScheduledPayment = (id: string) => {
    if (confirm('Are you sure you want to cancel this scheduled payment?')) {
      setScheduledPayments(payments => payments.filter(payment => payment.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Scheduled Payments</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
        >
          <Plus size={16} />
          Schedule Payment
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newPayment.date}
                onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newPayment.frequency}
                onChange={(e) => setNewPayment({
                  ...newPayment,
                  frequency: e.target.value as ScheduledPayment['frequency']
                })}
              >
                <option value="one-time">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newPayment.account}
                onChange={(e) => setNewPayment({ ...newPayment, account: e.target.value })}
                required
              >
                <option value="">Select account</option>
                <option value="Chase Bank (...4567)">Chase Bank (...4567)</option>
                <option value="Wells Fargo (...8901)">Wells Fargo (...8901)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-lg"
              value={newPayment.description}
              onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Schedule Payment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {scheduledPayments.map(payment => (
          <div key={payment.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Calendar className="text-amber-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">${payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{payment.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock size={14} />
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Repeat size={14} />
                      {payment.frequency.charAt(0).toUpperCase() + payment.frequency.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cancelScheduledPayment(payment.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {scheduledPayments.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled payments</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by scheduling your first payment.
          </p>
        </div>
      )}
    </div>
  );
}
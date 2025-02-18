import React, { useState } from 'react';
import { expenses } from '../../data/expenses';
import { Expense } from '../../types';

export function ExpenseManager() {
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    name: '',
    category: 'materials',
    amount: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New expense:', newExpense);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Expense Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Expense Name"
          className="px-4 py-2 border rounded-lg"
          value={newExpense.name}
          onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
        />
        <select
          className="px-4 py-2 border rounded-lg"
          value={newExpense.category}
          onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value as Expense['category'] }))}
        >
          <option value="materials">Materials</option>
          <option value="tools">Tools</option>
          <option value="utilities">Utilities</option>
          <option value="maintenance">Maintenance</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="px-4 py-2 border rounded-lg"
          value={newExpense.amount}
          onChange={(e) => setNewExpense(prev => ({ ...prev, amount: Number(e.target.value) }))}
        />
        <input
          type="date"
          className="px-4 py-2 border rounded-lg"
          value={newExpense.date}
          onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id} className="border-b">
                <td className="py-2">{expense.date}</td>
                <td className="py-2">{expense.name}</td>
                <td className="py-2 capitalize">{expense.category}</td>
                <td className="py-2 text-right">${expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
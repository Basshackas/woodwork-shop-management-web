import React, { useState } from 'react';
import { Ban as Bank, CreditCard, FileText, Shield, AlertTriangle } from 'lucide-react';

interface BankAccount {
  id: string;
  accountType: 'checking' | 'savings';
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  primary: boolean;
}

export function PaymentSettings() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      accountType: 'checking',
      bankName: 'Chase Bank',
      accountNumber: '****4567',
      routingNumber: '****1234',
      primary: true
    }
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<BankAccount>>({
    accountType: 'checking',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    primary: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account: BankAccount = {
      id: String(bankAccounts.length + 1),
      ...newAccount as Omit<BankAccount, 'id'>
    };
    setBankAccounts([...bankAccounts, account]);
    setShowAddAccount(false);
    setNewAccount({
      accountType: 'checking',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      primary: false
    });
  };

  const setPrimaryAccount = (id: string) => {
    setBankAccounts(accounts =>
      accounts.map(account => ({
        ...account,
        primary: account.id === id
      }))
    );
  };

  const removeAccount = (id: string) => {
    if (confirm('Are you sure you want to remove this account?')) {
      setBankAccounts(accounts => accounts.filter(account => account.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment Settings</h3>
        <button
          onClick={() => setShowAddAccount(true)}
          className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
        >
          <Bank size={16} />
          Add Bank Account
        </button>
      </div>

      {showAddAccount && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newAccount.accountType}
                onChange={(e) => setNewAccount({
                  ...newAccount,
                  accountType: e.target.value as 'checking' | 'savings'
                })}
              >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newAccount.bankName}
                onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Routing Number</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newAccount.routingNumber}
                onChange={(e) => setNewAccount({ ...newAccount, routingNumber: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="primary"
              checked={newAccount.primary}
              onChange={(e) => setNewAccount({ ...newAccount, primary: e.target.checked })}
              className="rounded text-amber-600"
            />
            <label htmlFor="primary" className="text-sm text-gray-700">
              Set as primary account
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddAccount(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Add Account
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {bankAccounts.map(account => (
          <div key={account.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Bank className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">{account.bankName}</p>
                  <p className="text-sm text-gray-600">
                    {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} •••• {account.accountNumber.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {account.primary ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Primary
                  </span>
                ) : (
                  <button
                    onClick={() => setPrimaryAccount(account.id)}
                    className="text-sm text-amber-600 hover:text-amber-700"
                  >
                    Set as Primary
                  </button>
                )}
                <button
                  onClick={() => removeAccount(account.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <AlertTriangle size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Tax Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400" size={20} />
              <div>
                <p className="font-medium">W-2 Form (2023)</p>
                <p className="text-sm text-gray-600">Available for download</p>
              </div>
            </div>
            <button className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
              <FileText size={16} />
              Download W-2
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400" size={20} />
              <div>
                <p className="font-medium">1099 Form (2023)</p>
                <p className="text-sm text-gray-600">Available for download</p>
              </div>
            </div>
            <button className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
              <FileText size={16} />
              Download 1099
            </button>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Payment Security</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-500 mt-1" size={20} />
            <div>
              <p className="font-medium text-blue-800">Your payment information is secure</p>
              <p className="text-sm text-blue-600 mt-1">
                We use bank-level security measures to protect your financial information. All data is encrypted and stored securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
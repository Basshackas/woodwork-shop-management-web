import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Mail,
  Building, // Replaced Bank with Building
  CreditCard,
  Lock,
  Save,
  Clock,
  Database,
  HardDrive,
  Cloud,
  AlertTriangle,
  Laptop,
  Smartphone,
  X,
  Plus,
  Link,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

interface LinkedAccount {
  id: string;
  bankName: string;
  accountType: 'checking' | 'savings' | 'credit';
  accountNumber: string;
  lastSync: string;
  balance: number;
  status: 'active' | 'error' | 'pending';
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'security' | 'billing' | 'accounts'>('general');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [emailNotifications, setEmailNotifications] = useState({
    projectUpdates: true,
    taskAssignments: true,
    deadlineReminders: true,
    systemAlerts: false
  });
  const [companyInfo, setCompanyInfo] = useState({
    name: 'CraftManager Pro',
    address: '123 Business St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '(555) 123-4567',
    email: 'contact@craftmanager.pro'
  });
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      accountType: 'checking',
      accountNumber: '****4567',
      lastSync: '2024-03-15 14:30',
      balance: 15420.50,
      status: 'active'
    },
    {
      id: '2',
      bankName: 'Bank of America',
      accountType: 'credit',
      accountNumber: '****8901',
      lastSync: '2024-03-15 14:30',
      balance: 2340.75,
      status: 'error'
    }
  ]);

  const banks = [
    { id: 'chase', name: 'Chase Bank' },
    { id: 'bofa', name: 'Bank of America' },
    { id: 'wells', name: 'Wells Fargo' },
    { id: 'citi', name: 'Citibank' },
    { id: 'capital_one', name: 'Capital One' }
  ];

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleLinkAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the bank authentication flow
    setShowLinkAccount(false);
    setSelectedBank('');
  };

  const handleRemoveAccount = (accountId: string) => {
    if (confirm('Are you sure you want to remove this account?')) {
      setLinkedAccounts(accounts => accounts.filter(acc => acc.id !== accountId));
    }
  };

  const handleSyncAccount = (accountId: string) => {
    // In a real app, this would trigger a sync with the bank's API
    setLinkedAccounts(accounts =>
      accounts.map(acc =>
        acc.id === accountId
          ? { ...acc, lastSync: new Date().toLocaleString() }
          : acc
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'general' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <Settings size={20} />
                General
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'appearance' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <Palette size={20} />
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'notifications' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <Bell size={20} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'security' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <Shield size={20} />
                Security
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'billing' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <CreditCard size={20} />
                Billing
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'accounts' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50'
                }`}
              >
                <Building size={20} /> {/* Changed to Building icon */}
                Linked Accounts
              </button>
            </nav>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="text-green-500" size={16} />
                  <span className="text-sm">Database</span>
                </div>
                <span className="text-sm text-green-500">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="text-green-500" size={16} />
                  <span className="text-sm">Cloud Storage</span>
                </div>
                <span className="text-sm text-green-500">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="text-yellow-500" size={16} />
                  <span className="text-sm">Backup Service</span>
                </div>
                <span className="text-sm text-yellow-500">Degraded</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-9">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Company Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Company Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.city}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={companyInfo.state}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, state: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Regional Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Regional Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="CST">Central Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Appearance Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 border rounded-lg ${
                        theme === 'light' ? 'border-amber-500 bg-amber-50' : ''
                      }`}
                    >
                      <div className="h-20 bg-white border rounded-lg mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 border rounded-lg ${
                        theme === 'dark' ? 'border-amber-500 bg-amber-50' : ''
                      }`}
                    >
                      <div className="h-20 bg-gray-900 border rounded-lg mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-4 border rounded-lg ${
                        theme === 'system' ? 'border-amber-500 bg-amber-50' : ''
                      }`}
                    >
                      <div className="h-20 bg-gradient-to-r from-white to-gray-900 border rounded-lg mb-2"></div>
                      <p className="text-sm font-medium">System</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Project Updates</p>
                    <p className="text-sm text-gray-600">Get notified about project status changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications.projectUpdates}
                      onChange={(e) => setEmailNotifications({
                        ...emailNotifications,
                        projectUpdates: e.target.checked
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Task Assignments</p>
                    <p className="text-sm text-gray-600">Receive notifications for new task assignments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications.taskAssignments}
                      onChange={(e) => setEmailNotifications({
                        ...emailNotifications,
                        taskAssignments: e.target.checked
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Deadline Reminders</p>
                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications.deadlineReminders}
                      onChange={(e) => setEmailNotifications({
                        ...emailNotifications,
                        deadlineReminders: e.target.checked
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-gray-600">Receive system maintenance and update notifications</p>
                    </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailNotifications.systemAlerts}
                      onChange={(e) => setEmailNotifications({
                        ...emailNotifications,
                        systemAlerts: e.target.checked
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                    <div className="mt-2 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="text-amber-600" size={24} />
                        <div>
                          <p className="font-medium">Two-Factor Authentication is disabled</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700">Password Requirements</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Minimum 8 characters
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        At least one uppercase letter
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        At least one number
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        At least one special character
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Laptop className="text-amber-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-600">Last active: Just now</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Smartphone className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-gray-600">Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Revoke Access
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-800">Delete Account</p>
                      <p className="text-sm text-red-600">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div>
                    <p className="text-lg font-semibold">Professional Plan</p>
                    <p className="text-sm text-gray-600">$49/month</p>
                  </div>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-600" size={24} />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/24</p>
                      </div>
                    </div>
                    <button className="text-amber-600 hover:text-amber-700">Edit</button>
                  </div>
                  <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
                    <Plus size={20} />
                    Add Payment Method
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Billing History</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">March 2024</p>
                      <p className="text-sm text-gray-600">Professional Plan</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">$49.00</span>
                      <button className="text-amber-600 hover:text-amber-700">Download</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">February 2024</p>
                      <p className="text-sm text-gray-600">Professional Plan</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">$49.00</span>
                      <button className="text-amber-600 hover:text-amber-700">Download</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">January 2024</p>
                      <p className="text-sm text-gray-600">Professional Plan</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">$49.00</span>
                      <button className="text-amber-600 hover:text-amber-700">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              {/* Account Linking Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Linked Accounts</h2>
                    <p className="text-gray-600">Manage your connected bank accounts for automatic transaction tracking</p>
                  </div>
                  <button
                    onClick={() => setShowLinkAccount(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    <Plus size={20} />
                    Link New Account
                  </button>
                </div>

                {/* Linked Accounts List */}
                <div className="space-y-4">
                  {linkedAccounts.map(account => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg">
                          <Building className="w-6 h-6 text-amber-600" /> {/* Changed to Building icon */}
                        </div>
                        <div>
                          <h3 className="font-medium">{account.bankName}</h3>
                          <p className="text-sm text-gray-600">
                            {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} •••• {account.accountNumber.slice(-4)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Last synced: {account.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${account.balance.toLocaleString()}</p>
                          <span className={`text-sm ${
                            account.status === 'active' ? 'text-green-600' :
                            account.status === 'error' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSyncAccount(account.id)}
                            className="p-2 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-gray-100"
                            title="Sync Account"
                          >
                            <RefreshCw size={20} />
                          </button>
                          <button
                            onClick={() => handleRemoveAccount(account.id)}
                            className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                            title="Remove Account"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {linkedAccounts.length === 0 && (
                    <div className="text-center py-8">
                      <Building className="mx-auto h-12 w-12 text-gray-400" /> {/* Changed to Building icon */}
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No linked accounts</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Get started by linking your first bank account.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Security Notice */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium text-blue-800">Secure Account Linking</h3>
                    <p className="mt-1 text-sm text-blue-600">
                      We use bank-level security measures to protect your financial information. Your credentials are never stored and all data is encrypted.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-900 mb-4">Recent Sync Activity</h3>
                <div className="space-y-4">
                  {linkedAccounts.map(account => (
                    <div key={account.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="text-gray-400" size={16} />
                        <div>
                          <p className="text-sm font-medium">{account.bankName}</p>
                          <p className="text-xs text-gray-500">Last sync: {account.lastSync}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        account.status === 'active' ? 'bg-green-100 text-green-800' :
                        account.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {account.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Link Account Modal */}
          {showLinkAccount && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Link New Account</h2>
                  <button
                    onClick={() => setShowLinkAccount(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleLinkAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select Bank</label>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      required
                    >
                      <option value="">Choose a bank...</option>
                      {banks.map(bank => (
                        <option key={bank.id} value={bank.id}>{bank.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lock className="text-amber-600 mt-1" size={20} />
                      <p className="text-sm text-gray-600">
                        You'll be redirected to your bank's secure login page to complete the connection.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowLinkAccount(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                    >
                      <Link size={20} />
                      Connect Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Mail,
  Building,
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
  Plus
} from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'security' | 'billing'>('general');
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

  const handleSaveSettings = () => {
    // Handle saving settings
    alert('Settings saved successfully!');
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
        </div>
      </div>
    </div>
  );
}
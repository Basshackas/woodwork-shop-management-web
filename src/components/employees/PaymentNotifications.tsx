import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Sliders, Check, X } from 'lucide-react';

interface NotificationSetting {
  type: 'payment_received' | 'payment_scheduled' | 'payment_failed' | 'tax_documents';
  email: boolean;
  push: boolean;
  sms: boolean;
}

export function PaymentNotifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      type: 'payment_received',
      email: true,
      push: true,
      sms: false
    },
    {
      type: 'payment_scheduled',
      email: true,
      push: false,
      sms: false
    },
    {
      type: 'payment_failed',
      email: true,
      push: true,
      sms: true
    },
    {
      type: 'tax_documents',
      email: true,
      push: false,
      sms: false
    }
  ]);

  const toggleNotification = (type: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(current =>
      current.map(setting =>
        setting.type === type
          ? { ...setting, [channel]: !setting[channel] }
          : setting
      )
    );
  };

  const getNotificationTitle = (type: string) => {
    return {
      payment_received: 'Payment Received',
      payment_scheduled: 'Payment Scheduled',
      payment_failed: 'Payment Failed',
      tax_documents: 'Tax Documents Available'
    }[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Bell size={16} />
          <span>Manage your payment alerts</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Notification Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Push
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                SMS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.map(setting => (
              <tr key={setting.type}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getNotificationTitle(setting.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => toggleNotification(setting.type, 'email')}
                    className={`p-2 rounded-full ${
                      setting.email ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Mail size={16} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => toggleNotification(setting.type, 'push')}
                    className={`p-2 rounded-full ${
                      setting.push ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Bell size={16} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => toggleNotification(setting.type, 'sms')}
                    className={`p-2 rounded-full ${
                      setting.sms ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Smartphone size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Sliders className="text-blue-500 mt-1" size={20} />
          <div>
            <p className="font-medium text-blue-800">Notification Delivery</p>
            <p className="text-sm text-blue-600 mt-1">
              Email notifications are sent immediately. Push notifications require browser permissions.
              SMS notifications may have carrier charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef } from 'react';
import { Clock, Check, X, DollarSign, Calendar, Download, Filter, AlertTriangle } from 'lucide-react';
import { timeEntries } from '../../data/timeEntries';
import { employees } from '../../data/employees';
import { Employee, TimeEntry, PayPeriod } from '../../types';

interface TimeTrackerProps {
  employee: Employee;
}

export function TimeTracker({ employee }: TimeTrackerProps) {
  const [showTimeEntry, setShowTimeEntry] = useState(false);
  const [showPayrollDetails, setShowPayrollDetails] = useState(false);
  const [selectedPayPeriod, setSelectedPayPeriod] = useState<string>('current');
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: ''
  });

  const payrollDetailsRef = useRef<HTMLDivElement>(null);

  // Group time entries by week
  const employeeEntries = timeEntries.filter(entry => entry.employeeId === employee.id);
  const weeklyEntries = groupEntriesByWeek(employeeEntries);

  // Calculate pay period totals
  const calculatePayPeriodTotals = (entries: TimeEntry[]) => {
    const regularHours = entries.reduce((sum, entry) => sum + (entry.regularHours || 0), 0);
    const overtimeHours = entries.reduce((sum, entry) => sum + (entry.overtimeHours || 0), 0);
    const regularPay = regularHours * (employee.hourlyRate || 0);
    const overtimePay = overtimeHours * ((employee.hourlyRate || 0) * 1.5);
    return {
      regularHours,
      overtimeHours,
      regularPay,
      overtimePay,
      totalPay: regularPay + overtimePay
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTimeEntry(false);
  };

  const scrollToPayrollDetails = () => {
    setShowPayrollDetails(true);
    setTimeout(() => {
      payrollDetailsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const PayrollDetails = () => {
    if (!showPayrollDetails) return null;

    const currentPeriod = {
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      entries: employeeEntries.filter(entry => 
        new Date(entry.date) >= new Date('2024-03-01') &&
        new Date(entry.date) <= new Date('2024-03-15')
      )
    };

    const totals = calculatePayPeriodTotals(currentPeriod.entries);

    return (
      <div ref={payrollDetailsRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl m-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Payroll Details</h2>
            <button 
              onClick={() => setShowPayrollDetails(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Regular Hours</h3>
              <p className="text-2xl font-bold text-green-600">{totals.regularHours}</p>
              <p className="text-sm text-gray-500">${totals.regularPay.toFixed(2)}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Overtime Hours</h3>
              <p className="text-2xl font-bold text-amber-600">{totals.overtimeHours}</p>
              <p className="text-sm text-gray-500">${totals.overtimePay.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Total Pay</h3>
              <p className="text-2xl font-bold text-blue-600">${totals.totalPay.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Before deductions</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Deductions</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Federal Tax (15%)</span>
                    <span>${(totals.totalPay * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Tax (5%)</span>
                    <span>${(totals.totalPay * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Security (6.2%)</span>
                    <span>${(totals.totalPay * 0.062).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicare (1.45%)</span>
                    <span>${(totals.totalPay * 0.0145).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 font-medium">
                    <div className="flex justify-between">
                      <span>Total Deductions</span>
                      <span>${(totals.totalPay * 0.2765).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Net Pay</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Take-home pay</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(totals.totalPay * (1 - 0.2765)).toFixed(2)}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Download size={16} />
                    Download Pay Stub
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Time Entry Details</h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regular Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overtime Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentPeriod.entries.map(entry => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.clockIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.clockOut}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.regularHours}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.overtimeHours}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            entry.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {entry.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (employee.employmentType !== 'wage') {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-900">Time & Payment Tracking</h4>
        <div className="flex gap-2">
          <button
            onClick={scrollToPayrollDetails}
            className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
          >
            <DollarSign size={16} />
            View Payroll
          </button>
          <button
            onClick={() => setShowTimeEntry(true)}
            className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
          >
            <Clock size={16} />
            Add Time Entry
          </button>
        </div>
      </div>

      {showTimeEntry && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="px-3 py-2 border rounded"
            />
            <input
              type="time"
              value={newEntry.clockIn}
              onChange={(e) => setNewEntry({ ...newEntry, clockIn: e.target.value })}
              className="px-3 py-2 border rounded"
              placeholder="Clock In"
            />
            <input
              type="time"
              value={newEntry.clockOut}
              onChange={(e) => setNewEntry({ ...newEntry, clockOut: e.target.value })}
              className="px-3 py-2 border rounded"
              placeholder="Clock Out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Add Entry
          </button>
        </form>
      )}

      <div className="space-y-6">
        {Object.entries(weeklyEntries).map(([weekStart, entries]) => {
          const totals = calculatePayPeriodTotals(entries);
          const isPaid = entries.every(entry => entry.approved);

          return (
            <div key={weekStart} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h5 className="font-medium">Week of {weekStart}</h5>
                  <p className="text-sm text-gray-500">
                    {entries.length} entries • {totals.regularHours + totals.overtimeHours} total hours
                  </p>
                </div>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                  >
                    <div>
                      <span className="font-medium">{entry.date}</span>
                      <span className="text-gray-500 ml-2">
                        {entry.clockIn} - {entry.clockOut}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {entry.regularHours + (entry.overtimeHours || 0)} hrs
                        {entry.overtimeHours ? ` (${entry.overtimeHours} OT)` : ''}
                      </span>
                      {entry.approved ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <AlertTriangle size={16} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm border-t pt-4">
                <div>
                  <p className="text-gray-600">Regular Hours</p>
                  <p className="font-medium text-gray-900">{totals.regularHours} hrs</p>
                  <p className="text-xs text-gray-500">${totals.regularPay.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Overtime Hours</p>
                  <p className="font-medium text-gray-900">{totals.overtimeHours} hrs</p>
                  <p className="text-xs text-gray-500">${totals.overtimePay.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Pay</p>
                  <p className="font-medium text-gray-900">${totals.totalPay.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Before deductions</p>
                </div>
                {!isPaid && (
                  <button className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700 self-center">
                    Process Payment
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <PayrollDetails />
    </div>
  );
}

function groupEntriesByWeek(entries: TimeEntry[]) {
  const weeks: Record<string, TimeEntry[]> = {};
  
  entries.forEach(entry => {
    const date = new Date(entry.date);
    date.setDate(date.getDate() - date.getDay()); // Get Sunday of the week
    const weekStart = date.toISOString().split('T')[0];
    
    if (!weeks[weekStart]) {
      weeks[weekStart] = [];
    }
    weeks[weekStart].push(entry);
  });

  return weeks;
}
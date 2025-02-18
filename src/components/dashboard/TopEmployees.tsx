import React from 'react';
import { employees } from '../../data/employees';

export function TopEmployees() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Top Employees</h2>
      <div className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-medium">{employee.name}</p>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{employee.projectIds.length} Projects</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
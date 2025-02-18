import React from 'react';
import { employees } from '../../data/employees';
import { projects } from '../../data/projects';

export function EmployeeManager() {
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee Management</h2>
        <div className="text-lg">
          Total Salary: <span className="font-bold">${totalSalary.toLocaleString()}/year</span>
        </div>
      </div>

      <div className="grid gap-6">
        {employees.map(employee => {
          const assignedProjects = projects.filter(p => 
            employee.projectIds.includes(p.id)
          );

          return (
            <div key={employee.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{employee.name}</h3>
                  <p className="text-gray-600">{employee.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{employee.email}</p>
                  <p className="text-sm text-gray-600">{employee.phone}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Assigned Projects:</h4>
                <div className="grid gap-2">
                  {assignedProjects.map(project => (
                    <div key={project.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{project.title}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
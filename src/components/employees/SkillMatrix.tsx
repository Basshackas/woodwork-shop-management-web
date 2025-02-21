import React from 'react';
import { Employee, Skill } from '../../types';

interface SkillMatrixProps {
  employees: Employee[];
}

export function SkillMatrix({ employees }: SkillMatrixProps) {
  // Get unique skills across all employees
  const allSkills = Array.from(
    new Set(
      employees.flatMap(emp => emp.skills?.map(skill => skill.name) || [])
    )
  ).sort();

  const getSkillLevel = (employee: Employee, skillName: string) => {
    return employee.skills?.find(skill => skill.name === skillName)?.level || null;
  };

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Team Skill Matrix</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 text-left">Employee</th>
              {allSkills.map(skill => (
                <th key={skill} className="py-2 text-left px-4">{skill}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="border-t">
                <td className="py-2">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </td>
                {allSkills.map(skill => {
                  const level = getSkillLevel(employee, skill);
                  return (
                    <td key={skill} className="py-2 px-4">
                      {level ? (
                        <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(level)}`}>
                          {level}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

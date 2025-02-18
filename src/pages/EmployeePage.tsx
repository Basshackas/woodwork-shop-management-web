import React, { useState } from 'react';
import { employees } from '../data/employees';
import { projects } from '../data/projects';
import { 
  Plus, Mail, Phone, Search, Filter, 
  Award, Calendar, Clock, ChevronDown,
  BarChart2, Star, Briefcase, BookOpen,
  UserPlus, Settings, AlertTriangle,
  Users as UsersIcon
} from 'lucide-react';
import { TimeTracker } from '../components/employees/TimeTracker';
import { Employee, Skill, Certification } from '../types';

export function EmployeePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'skills' | 'schedule'>('overview');

  const filteredEmployees = employees.filter(employee =>
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || employee.status === filterStatus) &&
    (filterDepartment === 'all' || employee.department === filterDepartment)
  );

  const departments = Array.from(new Set(employees.map(emp => emp.department)));
  const statuses = ['active', 'on-leave', 'terminated', 'probation'];

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 3.5) return 'text-amber-500';
    return 'text-red-500';
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-amber-100 text-amber-800';
      case 'beginner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EmployeeCard = ({ employee }: { employee: Employee }) => {
    const latestReview = employee.performance?.[0];
    const employeeProjects = projects.filter(p => employee.projectIds.includes(p.id));

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-700">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <p className="text-gray-600">{employee.role}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  employee.status === 'active' ? 'bg-green-100 text-green-800' :
                  employee.status === 'on-leave' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
                <span className="text-sm text-gray-500">{employee.department}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedEmployee(employee)}
              className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-100"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} />
            <span className="text-sm">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            <span className="text-sm">{employee.phone}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Projects</p>
              <p className="text-lg font-semibold">{employeeProjects.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Skills</p>
              <p className="text-lg font-semibold">{employee.skills?.length || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Rating</p>
              <p className={`text-lg font-semibold ${getPerformanceColor(latestReview?.rating || 0)}`}>
                {latestReview?.rating || '-'}
              </p>
            </div>
          </div>

          {employee.employmentType === 'wage' && (
            <TimeTracker employee={employee} />
          )}
        </div>
      </div>
    );
  };

  const EmployeeDetails = () => {
    if (!selectedEmployee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-700">
                  {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                <p className="text-gray-600">{selectedEmployee.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedEmployee.status === 'on-leave' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedEmployee.status}
                  </span>
                  <span className="text-sm text-gray-500">{selectedEmployee.department}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedEmployee(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'overview' ? 'border-amber-600 text-amber-600' : 'border-transparent'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'performance' ? 'border-amber-600 text-amber-600' : 'border-transparent'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'skills' ? 'border-amber-600 text-amber-600' : 'border-transparent'
              }`}
            >
              Skills & Certifications
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 border-b-2 ${
                activeTab === 'schedule' ? 'border-amber-600 text-amber-600' : 'border-transparent'
              }`}
            >
              Schedule
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={16} />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="text-gray-400" size={16} />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedEmployee.employmentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{selectedEmployee.startDate}</span>
                    </div>
                    {selectedEmployee.employmentType === 'salary' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Salary:</span>
                        <span className="font-medium">${selectedEmployee.salary?.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedEmployee.employmentType === 'wage' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hourly Rate:</span>
                        <span className="font-medium">${selectedEmployee.hourlyRate}/hr</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Current Projects</h3>
                <div className="grid grid-cols-1 gap-4">
                  {projects
                    .filter(p => selectedEmployee.projectIds.includes(p.id))
                    .map(project => (
                      <div key={project.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600">Due: {project.dueDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
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
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-600 mb-1">Average Rating</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {(selectedEmployee.performance?.reduce((sum, p) => sum + p.rating, 0) || 0) / 
                    (selectedEmployee.performance?.length || 1)}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-600 mb-1">Reviews</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedEmployee.performance?.length || 0}
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-600 mb-1">Project Completion</h4>
                  <p className="text-2xl font-bold text-amber-600">92%</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Performance History</h3>
                <div className="space-y-4">
                  {selectedEmployee.performance?.map(review => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{review.date}</p>
                          <p className="text-sm text-gray-600">Reviewer: {review.reviewer}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className={`w-5 h-5 ${getPerformanceColor(review.rating)}`} />
                          <span className={`font-bold ${getPerformanceColor(review.rating)}`}>
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Strengths</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {review.strengths.map((strength, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Areas for Improvement</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {review.improvements.map((improvement, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                                {improvement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedEmployee.skills?.map(skill => (
                    <div key={skill.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-gray-600">
                            {skill.yearsOfExperience} years experience
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm ${getSkillLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedEmployee.certifications?.map(cert => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-gray-600">{cert.issuingAuthority}</p>
                          <p className="text-sm text-gray-600">
                            Expires: {cert.expiryDate}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          cert.status === 'active' ? 'bg-green-100 text-green-800' :
                          cert.status === 'expired' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Work Schedule</h3>
                  <div className="space-y-2">
                    {selectedEmployee.availability?.schedule.map(day => (
                      <div key={day.day} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">{day.day}</span>
                        <div>
                          {day.shifts.map((shift, i) => (
                            <span key={i} className="text-sm text-gray-600">
                              {shift.start} - {shift.end}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Time Off</h3>
                  <div className="space-y-2">
                    {selectedEmployee.availability?.timeOff.map(timeOff => (
                      <div key={timeOff.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium capitalize">{timeOff.type}</p>
                            <p className="text-sm text-gray-600">
                              {timeOff.startDate} - {timeOff.endDate}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            timeOff.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {timeOff.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedEmployee.employmentType === 'wage' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Time Tracking</h3>
                  <TimeTracker employee={selectedEmployee} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <div className="flex gap-4">
          <div className="flex rounded-lg shadow overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 ${
                view === 'grid'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 ${
                view === 'list'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              List View
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UsersIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Briefcase size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold">
                {projects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Award size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold">4.2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Training Hours</p>
              <p className="text-2xl font-bold">128</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-lg"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-amber-700">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'on-leave' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.projectIds.length} Active
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className={`w-4 h-4 ${
                        getPerformanceColor(employee.performance?.[0]?.rating || 0)
                      }`} />
                      <span className="ml-1 text-sm font-medium">
                        {employee.performance?.[0]?.rating || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EmployeeDetails />
    </div>
  );
}
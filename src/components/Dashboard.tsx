import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Users, Calendar, Clock, Package, AlertTriangle, BarChart2, ArrowUpRight, ArrowDownRight, FileText, CheckSquare, UserPlus } from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { SalesChart } from './charts/SalesChart';
import { ExpenseChart } from './charts/ExpenseChart';
import { RecentTransactions } from './dashboard/RecentTransactions';
import { TopEmployees } from './dashboard/TopEmployees';
import { projects } from '../data/projects';
import { employees } from '../data/employees';
import { sales } from '../data/sales';
import { expenses } from '../data/expenses';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Calculate key metrics
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = (netProfit / totalRevenue) * 100;

  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const projectCompletionRate = (completedProjects / projects.length) * 100;

  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const utilization = employees.reduce((sum, emp) => sum + (emp.projectIds.length > 0 ? 1 : 0), 0) / employees.length * 100;

  // Calculate project health
  const projectHealth = projects.reduce((acc, project) => {
    const dueDate = new Date(project.dueDate);
    const today = new Date();
    const isOverdue = dueDate < today && project.status !== 'completed';
    const isAtRisk = !isOverdue && dueDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
    
    return {
      overdue: acc.overdue + (isOverdue ? 1 : 0),
      atRisk: acc.atRisk + (isAtRisk ? 1 : 0),
      onTrack: acc.onTrack + (!isOverdue && !isAtRisk ? 1 : 0)
    };
  }, { overdue: 0, atRisk: 0, onTrack: 0 });

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
            <FileText size={20} />
            Generate Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <UserPlus size={20} />
            New Project
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-green-600" />}
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend="+20.1% from last month"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
          title="Net Profit"
          value={`$${netProfit.toLocaleString()}`}
          trend={`${profitMargin.toFixed(1)}% margin`}
        />
        <StatCard
          icon={<CreditCard className="w-8 h-8 text-red-600" />}
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          trend="-2.3% from last month"
        />
        <StatCard
          icon={<BarChart2 className="w-8 h-8 text-purple-600" />}
          title="Average Order Value"
          value={`$${(totalRevenue / sales.length).toLocaleString()}`}
          trend="+15.2% from last month"
        />
      </div>

      {/* Project & Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Project Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>On Track</span>
                <span className="text-green-600">{projectHealth.onTrack}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(projectHealth.onTrack / projects.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>At Risk</span>
                <span className="text-yellow-600">{projectHealth.atRisk}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(projectHealth.atRisk / projects.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overdue</span>
                <span className="text-red-600">{projectHealth.overdue}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(projectHealth.overdue / projects.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold">{activeEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Team Utilization</span>
                <span>{utilization.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${utilization}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Projects per Employee</span>
              <span>{(activeProjects / activeEmployees).toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Project Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{activeProjects}</p>
              </div>
              <Package className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completion Rate</span>
                <span>{projectCompletionRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${projectCompletionRate}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Avg. Project Duration</span>
              <span>45 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'week' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'month' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'year' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-64">
            <SalesChart isDashboard timeRange={timeRange} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Expense Analysis</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'week' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'month' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 rounded-lg ${
                  timeRange === 'year' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-64">
            <ExpenseChart isDashboard timeRange={timeRange} />
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {projects.slice(0, 4).map(project => (
              <div key={project.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">Client: {project.clientName}</p>
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Important Alerts</h2>
          <div className="space-y-4">
            {projectHealth.overdue > 0 && (
              <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <p className="font-medium text-red-800">Overdue Projects</p>
                  <p className="text-sm text-red-600">
                    {projectHealth.overdue} {projectHealth.overdue === 1 ? 'project is' : 'projects are'} past due date
                  </p>
                </div>
              </div>
            )}
            {projectHealth.atRisk > 0 && (
              <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <p className="font-medium text-yellow-800">At-Risk Projects</p>
                  <p className="text-sm text-yellow-600">
                    {projectHealth.atRisk} {projectHealth.atRisk === 1 ? 'project' : 'projects'} need attention
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-blue-800">Upcoming Deadlines</p>
                <p className="text-sm text-blue-600">
                  3 projects due this week
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-800">Recent Completions</p>
                <p className="text-sm text-green-600">
                  2 projects completed this week
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Top Employees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <TopEmployees />
      </div>
    </div>
  );
}
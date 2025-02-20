import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard, Users, Calendar, Clock, Package, AlertTriangle, 
  BarChart2, ArrowUpRight, ArrowDownRight, FileText, CheckSquare, UserPlus, PenTool as Tool, 
  Truck, ShoppingBag, Boxes, Clipboard, Hammer, Warehouse, Activity, PieChart, Filter, 
  Download, Share2, RefreshCw, Search, ChevronDown
} from 'lucide-react';
import { StatCard } from './ui/StatCard';
import { SalesChart } from './charts/SalesChart';
import { ExpenseChart } from './charts/ExpenseChart';
import { RecentTransactions } from './dashboard/RecentTransactions';
import { projects } from '../data/projects';
import { employees } from '../data/employees';
import { sales } from '../data/sales';
import { expenses } from '../data/expenses';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'projects' | 'inventory'>('revenue');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
    const isAtRisk = !isOverdue && dueDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000;
    
    return {
      overdue: acc.overdue + (isOverdue ? 1 : 0),
      atRisk: acc.atRisk + (isAtRisk ? 1 : 0),
      onTrack: acc.onTrack + (!isOverdue && !isAtRisk ? 1 : 0)
    };
  }, { overdue: 0, atRisk: 0, onTrack: 0 });

  // Calculate monthly trends
  const monthlyData = {
    revenue: [42000, 38000, 45000, 48000, 52000, 49000],
    expenses: [31000, 28000, 32000, 35000, 38000, 36000],
    projects: [4, 3, 5, 6, 5, 4]
  };

  // Calculate KPIs
  const kpis = {
    revenueGrowth: ((monthlyData.revenue[5] - monthlyData.revenue[4]) / monthlyData.revenue[4]) * 100,
    expenseGrowth: ((monthlyData.expenses[5] - monthlyData.expenses[4]) / monthlyData.expenses[4]) * 100,
    projectGrowth: ((monthlyData.projects[5] - monthlyData.projects[4]) / monthlyData.projects[4]) * 100
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Filter size={20} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Download size={20} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Share2 size={20} />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects, clients, or tasks..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-green-600" />}
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend={`${kpis.revenueGrowth >= 0 ? '+' : ''}${kpis.revenueGrowth.toFixed(1)}% from last month`}
          trendType={kpis.revenueGrowth >= 0 ? 'positive' : 'negative'}
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
          title="Net Profit"
          value={`$${netProfit.toLocaleString()}`}
          trend={`${profitMargin.toFixed(1)}% margin`}
          trendType="positive"
        />
        <StatCard
          icon={<CreditCard className="w-8 h-8 text-red-600" />}
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          trend={`${kpis.expenseGrowth >= 0 ? '+' : ''}${kpis.expenseGrowth.toFixed(1)}% from last month`}
          trendType={kpis.expenseGrowth >= 0 ? 'negative' : 'positive'}
        />
        <StatCard
          icon={<BarChart2 className="w-8 h-8 text-purple-600" />}
          title="Active Projects"
          value={activeProjects.toString()}
          trend={`${kpis.projectGrowth >= 0 ? '+' : ''}${kpis.projectGrowth.toFixed(1)}% from last month`}
          trendType={kpis.projectGrowth >= 0 ? 'positive' : 'negative'}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
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
          <div className="h-80">
            <SalesChart isDashboard timeRange={timeRange} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
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
          <div className="h-80">
            <ExpenseChart isDashboard timeRange={timeRange} />
          </div>
        </div>
      </div>

      {/* Project Status and Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Project Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>On Track ({projectHealth.onTrack})</span>
              </div>
              <span>{((projectHealth.onTrack / projects.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>At Risk ({projectHealth.atRisk})</span>
              </div>
              <span>{((projectHealth.atRisk / projects.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Overdue ({projectHealth.overdue})</span>
              </div>
              <span>{((projectHealth.overdue / projects.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="flex rounded-full h-2">
                <div
                  className="bg-green-500 rounded-l-full"
                  style={{ width: `${(projectHealth.onTrack / projects.length) * 100}%` }}
                ></div>
                <div
                  className="bg-yellow-500"
                  style={{ width: `${(projectHealth.atRisk / projects.length) * 100}%` }}
                ></div>
                <div
                  className="bg-red-500 rounded-r-full"
                  style={{ width: `${(projectHealth.overdue / projects.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {projects.slice(0, 3).map(project => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-600">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Active Employees</h3>
                <p className="text-2xl font-bold text-green-600">{activeEmployees}</p>
                <p className="text-sm text-green-600">+2 this month</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Utilization Rate</h3>
                <p className="text-2xl font-bold text-blue-600">{utilization.toFixed(1)}%</p>
                <p className="text-sm text-blue-600">+5.2% from target</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-4">Top Performers</h3>
              <div className="space-y-3">
                {employees.slice(0, 3).map(employee => (
                  <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{employee.projectIds.length} projects</p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Alerts */}
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
            <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
              <Boxes className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-yellow-800">Low Stock Alert</p>
                <p className="text-sm text-yellow-600">5 items are running low on inventory</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <Tool className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-blue-800">Maintenance Required</p>
                <p className="text-sm text-blue-600">2 machines need maintenance</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-800">Quality Check</p>
                <p className="text-sm text-green-600">All quality metrics are within acceptable ranges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <RecentTransactions />
      </div>
    </div>
  );
}

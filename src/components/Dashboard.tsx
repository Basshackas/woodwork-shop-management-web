import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Users, Calendar, Clock, Package, AlertTriangle, BarChart2, ArrowUpRight, ArrowDownRight, FileText, CheckSquare, UserPlus, PenTool as Tool, Truck, ShoppingBag, Boxes, Clipboard, Hammer, Warehouse, Activity, PieChart } from 'lucide-react';
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

  // Calculate monthly trends
  const monthlyData = {
    revenue: [42000, 38000, 45000, 48000, 52000, 49000],
    expenses: [31000, 28000, 32000, 35000, 38000, 36000],
    projects: [4, 3, 5, 6, 5, 4]
  };

  // Mock inventory metrics
  const inventoryMetrics = {
    totalItems: 1250,
    lowStock: 45,
    outOfStock: 12,
    totalValue: 85000,
    reorderNeeded: 28,
    incomingDeliveries: 5,
    topCategories: [
      { name: 'Hardwood', value: 35 },
      { name: 'Tools', value: 25 },
      { name: 'Hardware', value: 20 },
      { name: 'Finishes', value: 15 },
      { name: 'Other', value: 5 }
    ]
  };

  // Mock production metrics
  const productionMetrics = {
    activeWorkstations: 8,
    totalWorkstations: 10,
    utilizationRate: 80,
    avgCompletionTime: 4.5,
    qualityScore: 95,
    wastageRate: 3.2,
    maintenanceNeeded: 2
  };

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

      {/* Quick Stats */}
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

      {/* Production Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Production Status</h3>
            <Tool className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Workstation Utilization</span>
                <span className="text-blue-600">{productionMetrics.utilizationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${productionMetrics.utilizationRate}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Active Stations</p>
                <p className="text-xl font-bold">{productionMetrics.activeWorkstations}/{productionMetrics.totalWorkstations}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Completion</p>
                <p className="text-xl font-bold">{productionMetrics.avgCompletionTime} days</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Quality Score</span>
              <span className="text-green-600 font-medium">{productionMetrics.qualityScore}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Wastage Rate</span>
              <span className="text-amber-600 font-medium">{productionMetrics.wastageRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Inventory Overview</h3>
            <Warehouse className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-bold">{inventoryMetrics.totalItems}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold">${inventoryMetrics.totalValue.toLocaleString()}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Stock Status</span>
                <span className="text-amber-600 font-medium">
                  {inventoryMetrics.lowStock} low stock
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '70%' }}
                  />
                </div>
                <span className="text-gray-600">70% optimal</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reorder Needed</span>
                <span className="text-red-600 font-medium">{inventoryMetrics.reorderNeeded} items</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Incoming Deliveries</span>
                <span className="text-green-600 font-medium">{inventoryMetrics.incomingDeliveries}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Project Metrics</h3>
            <Clipboard className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-xl font-bold">{activeProjects}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-xl font-bold">{projectCompletionRate.toFixed(1)}%</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Project Health</span>
                <span className="text-green-600">{projectHealth.onTrack} on track</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(projectHealth.onTrack / projects.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">At Risk</span>
                <span className="text-amber-600 font-medium">{projectHealth.atRisk} projects</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overdue</span>
                <span className="text-red-600 font-medium">{projectHealth.overdue} projects</span>
              </div>
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

      {/* Inventory Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Inventory Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {inventoryMetrics.topCategories.map(category => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    category.name === 'Hardwood' ? 'bg-blue-500' :
                    category.name === 'Tools' ? 'bg-green-500' :
                    category.name === 'Hardware' ? 'bg-yellow-500' :
                    category.name === 'Finishes' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                  <span>{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{category.value}%</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        category.name === 'Hardwood' ? 'bg-blue-500' :
                        category.name === 'Tools' ? 'bg-green-500' :
                        category.name === 'Hardware' ? 'bg-yellow-500' :
                        category.name === 'Finishes' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Stock Alerts</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Low Stock Items</span>
                  <span className="text-amber-600 font-medium">{inventoryMetrics.lowStock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Out of Stock</span>
                  <span className="text-red-600 font-medium">{inventoryMetrics.outOfStock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Reorder Needed</span>
                  <span className="text-blue-600 font-medium">{inventoryMetrics.reorderNeeded}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Incoming Deliveries</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{inventoryMetrics.incomingDeliveries} deliveries scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Next delivery: Tomorrow</span>
                </div>
              </div>
            </div>
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
            {inventoryMetrics.lowStock > 0 && (
              <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                <Boxes className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <p className="font-medium text-yellow-800">Low Stock Alert</p>
                  <p className="text-sm text-yellow-600">
                    {inventoryMetrics.lowStock} items are running low
                  </p>
                </div>
              </div>
            )}
            {productionMetrics.maintenanceNeeded > 0 && (
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                <Tool className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">Maintenance Required</p>
                  <p className="text-sm text-blue-600">
                    {productionMetrics.maintenanceNeeded} machines need maintenance
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-800">Quality Check</p>
                <p className="text-sm text-green-600">
                  All quality metrics are within acceptable ranges
                </p>
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

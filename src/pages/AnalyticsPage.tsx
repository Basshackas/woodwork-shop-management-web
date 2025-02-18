import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity,
  Users,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Pie,
  Cell
} from 'recharts';
import { analyticsData } from '../data/analytics';
import { projects } from '../data/projects';
import { employees } from '../data/employees';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const profitMargin = (analyticsData.profit / analyticsData.revenue) * 100;
  const revenueGrowth = ((analyticsData.monthlyTrends[2].revenue - analyticsData.monthlyTrends[1].revenue) / analyticsData.monthlyTrends[1].revenue) * 100;
  const projectEfficiency = (projects.filter(p => p.status === 'completed').length / projects.length) * 100;
  const employeeUtilization = (employees.reduce((sum, emp) => sum + (emp.availability?.utilization || 0), 0) / employees.length);

  const getMetricDetails = (metric: string) => {
    switch (metric) {
      case 'revenue':
        return {
          title: 'Revenue Breakdown',
          data: [
            { name: 'Project Revenue', value: analyticsData.revenue * 0.7 },
            { name: 'Service Revenue', value: analyticsData.revenue * 0.2 },
            { name: 'Other Revenue', value: analyticsData.revenue * 0.1 }
          ]
        };
      case 'expenses':
        return {
          title: 'Expense Breakdown',
          data: [
            { name: 'Labor', value: analyticsData.expenses * 0.45 },
            { name: 'Materials', value: analyticsData.expenses * 0.30 },
            { name: 'Overhead', value: analyticsData.expenses * 0.15 },
            { name: 'Other', value: analyticsData.expenses * 0.10 }
          ]
        };
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.name}: {entry.name.includes('Margin') ? formatPercent(entry.value) : formatCurrency(entry.value)}</span>
          </p>
        ))}
      </div>
    );
  };

  const DrillDownModal = () => {
    if (!selectedMetric) return null;
    const details = getMetricDetails(selectedMetric);
    if (!details) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{details.title}</h3>
            <button 
              onClick={() => setSelectedMetric(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={details.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#fbbf24"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {details.data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[
                        '#fbbf24', '#22c55e', '#3b82f6', '#8b5cf6'
                      ][index % 4]} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {details.data.map((item) => (
              <div key={item.name} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-lg font-semibold">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Business Analytics</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
            <Download size={20} />
            Export Report
          </button>
          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedMetric('revenue')}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(analyticsData.revenue)}</p>
              <p className={`text-sm ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                {revenueGrowth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {formatPercent(Math.abs(revenueGrowth))} from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold">{formatPercent(profitMargin)}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <Target size={16} />
                Target: {formatPercent(35)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Project Efficiency</p>
              <p className="text-2xl font-bold">{formatPercent(projectEfficiency)}</p>
              <p className="text-sm text-purple-600 flex items-center gap-1">
                <Clock size={16} />
                On-time: {formatPercent(85)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Team Utilization</p>
              <p className="text-2xl font-bold">{formatPercent(employeeUtilization)}</p>
              <p className="text-sm text-amber-600 flex items-center gap-1">
                <TrendingUp size={16} />
                Optimal: {formatPercent(85)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.monthlyTrends}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#fbbf24"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f87171"
                  fillOpacity={1}
                  fill="url(#expenseGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Project Margins</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.projectMargins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="projectId" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="margin" fill="#fbbf24" name="Profit Margin" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Forecasts</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.forecasts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="projectedRevenue"
                  stroke="#fbbf24"
                  name="Projected Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="projectedProfit"
                  stroke="#22c55e"
                  name="Projected Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                {
                  metric: 'Revenue Growth',
                  value: revenueGrowth,
                  target: 20
                },
                {
                  metric: 'Profit Margin',
                  value: profitMargin,
                  target: 35
                },
                {
                  metric: 'Project Efficiency',
                  value: projectEfficiency,
                  target: 90
                },
                {
                  metric: 'Team Utilization',
                  value: employeeUtilization,
                  target: 85
                },
                {
                  metric: 'Client Satisfaction',
                  value: 92,
                  target: 95
                }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Actual"
                  dataKey="value"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Financial Summary</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-right">This Month</th>
                <th className="py-3 text-right">Last Month</th>
                <th className="py-3 text-right">YTD</th>
                <th className="py-3 text-right">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">Revenue</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.monthlyTrends[2].revenue)}</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.monthlyTrends[1].revenue)}</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.revenue)}</td>
                <td className="py-3 text-right text-green-600">+{formatPercent(revenueGrowth)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Expenses</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.monthlyTrends[2].expenses)}</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.monthlyTrends[1].expenses)}</td>
                <td className="py-3 text-right">{formatCurrency(analyticsData.expenses)}</td>
                <td className="py-3 text-right text-red-600">+{formatPercent(5.2)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Project Revenue</td>
                <td className="py-3 text-right">{formatCurrency(250000)}</td>
                <td className="py-3 text-right">{formatCurrency(230000)}</td>
                <td className="py-3 text-right">{formatCurrency(1250000)}</td>
                <td className="py-3 text-right text-green-600">+{formatPercent(8.7)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Labor Costs</td>
                <td className="py-3 text-right">{formatCurrency(120000)}</td>
                <td className="py-3 text-right">{formatCurrency(115000)}</td>
                <td className="py-3 text-right">{formatCurrency(580000)}</td>
                <td className="py-3 text-right text-red-600">+{formatPercent(4.3)}</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">Net Profit</td>
                <td className="py-3 text-right font-semibold">{formatCurrency(analyticsData.monthlyTrends[2].profit)}</td>
                <td className="py-3 text-right font-semibold">{formatCurrency(analyticsData.monthlyTrends[1].profit)}</td>
                <td className="py-3 text-right font-semibold">{formatCurrency(analyticsData.profit)}</td>
                <td className="py-3 text-right text-green-600 font-semibold">+{formatPercent(12.5)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <DrillDownModal />
    </div>
  );
}
import React, { useState } from 'react';
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
  PieChart,
  Pie,
  Cell,
  Sector,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity,
  Users,
  Clock,
  Info,
  PieChart as PieChartIcon
} from 'lucide-react';
import { analyticsData } from '../data/analytics';
import { projects } from '../data/projects';
import { employees } from '../data/employees';
import { expenses } from '../data/expenses';
import { sales } from '../data/sales';

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

const revenueData = [
  { 
    name: 'Product Sales', 
    value: 45, 
    color: '#22c55e',
    description: 'Direct product revenue from woodworking items',
    trend: '+12.5%',
    amount: 450000
  },
  { 
    name: 'Services', 
    value: 25, 
    color: '#f59e0b',
    description: 'Installation and customization services',
    trend: '+8.3%',
    amount: 250000
  },
  { 
    name: 'Consulting', 
    value: 15, 
    color: '#3b82f6',
    description: 'Design consultation and planning',
    trend: '+15.2%',
    amount: 150000
  },
  { 
    name: 'Maintenance', 
    value: 15, 
    color: '#8b5cf6',
    description: 'Ongoing maintenance contracts',
    trend: '+5.7%',
    amount: 150000
  }
];

const expenseData = [
  { 
    name: 'Materials', 
    value: 30, 
    color: '#22c55e',
    description: 'Raw materials and supplies',
    trend: '+5.2%',
    amount: 300000
  },
  { 
    name: 'Labor', 
    value: 35, 
    color: '#f59e0b',
    description: 'Employee salaries and benefits',
    trend: '+7.8%',
    amount: 350000
  },
  { 
    name: 'Operations', 
    value: 20, 
    color: '#3b82f6',
    description: 'Facility and equipment costs',
    trend: '+3.1%',
    amount: 200000
  },
  { 
    name: 'Marketing', 
    value: 15, 
    color: '#8b5cf6',
    description: 'Advertising and promotion',
    trend: '+9.4%',
    amount: 150000
  }
];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
    name
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
        {name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
        {`${value}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <h3 className="font-bold text-gray-900">{data.name}</h3>
        {data.description && (
          <p className="text-sm text-gray-600 mt-1">{data.description}</p>
        )}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="font-bold text-gray-900">{formatCurrency(data.amount || data.value)}</p>
          </div>
          {data.trend && (
            <div>
              <p className="text-sm text-gray-600">Trend</p>
              <p className={`font-bold ${data.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {data.trend}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [activeRevenue, setActiveRevenue] = useState<number | undefined>();
  const [activeExpense, setActiveExpense] = useState<number | undefined>();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const profitMargin = (analyticsData.profit / analyticsData.revenue) * 100;
  const revenueGrowth = ((analyticsData.monthlyTrends[2].revenue - analyticsData.monthlyTrends[1].revenue) / analyticsData.monthlyTrends[1].revenue) * 100;
  const projectEfficiency = (projects.filter(p => p.status === 'completed').length / projects.length) * 100;
  const employeeUtilization = employees.reduce((sum, emp) => sum + (emp.projectIds.length > 0 ? 1 : 0), 0) / employees.length * 100;

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
      {/* Header Section */}
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

      {/* Stats Overview */}
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

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Revenue Distribution</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info size={16} />
              <span>Hover for details</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeRevenue}
                      activeShape={renderActiveShape}
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveRevenue(index)}
                      onMouseLeave={() => setActiveRevenue(undefined)}
                    >
                      {revenueData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center space-y-4">
              {revenueData.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-50 p-4 rounded-lg transition-all duration-300 ${
                    activeRevenue === index ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ 
                    ringColor: item.color,
                    transform: activeRevenue === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setActiveRevenue(index)}
                  onMouseLeave={() => setActiveRevenue(undefined)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm text-green-600">{item.trend}</p>
                  </div>
                  <div className="mt-2 flex justify-between items-baseline">
                    <p className="text-2xl font-bold">{item.value}%</p>
                    <p className="text-sm text-gray-600">{formatCurrency(item.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Expense Distribution</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Info size={16} />
              <span>Hover for details</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeExpense}
                      activeShape={renderActiveShape}
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveExpense(index)}
                      onMouseLeave={() => setActiveExpense(undefined)}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center space-y-4">
              {expenseData.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-50 p-4 rounded-lg transition-all duration-300 ${
                    activeExpense === index ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ 
                    ringColor: item.color,
                    transform: activeExpense === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setActiveExpense(index)}
                  onMouseLeave={() => setActiveExpense(undefined)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm text-red-600">{item.trend}</p>
                  </div>
                  <div className="mt-2 flex justify-between items-baseline">
                    <p className="text-2xl font-bold">{item.value}%</p>
                    <p className="text-sm text-gray-600">{formatCurrency(item.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Charts Section */}
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

      {/* Financial Forecasts and Performance Metrics */}
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

      {/* Financial Summary Table */}
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
                <td className="py-3 text-right">{formatCurrency(115000)} </td>
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

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
  Radar,
  ComposedChart,
  Scatter
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
  PieChart as PieChartIcon,
  Share2,
  Filter,
  RefreshCw,
  Zap,
  Package,
  ShoppingCart,
  Truck,
  AlertTriangle,
  FileText,
  Percent,
  CreditCard,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  PenTool as Tool
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

// Enhanced data for new visualizations
const productivityData = [
  { month: 'Jan', efficiency: 85, output: 120, target: 100 },
  { month: 'Feb', efficiency: 88, output: 125, target: 100 },
  { month: 'Mar', efficiency: 92, output: 135, target: 100 },
  { month: 'Apr', efficiency: 87, output: 122, target: 100 },
  { month: 'May', efficiency: 90, output: 130, target: 100 },
  { month: 'Jun', efficiency: 95, output: 140, target: 100 }
];

const qualityMetrics = [
  { category: 'Defect Rate', value: 1.2, target: 2, unit: '%' },
  { category: 'Customer Satisfaction', value: 4.8, target: 4.5, unit: '/5' },
  { category: 'On-Time Delivery', value: 96, target: 95, unit: '%' },
  { category: 'First-Time-Right', value: 92, target: 90, unit: '%' },
  { category: 'Rework Rate', value: 3.5, target: 5, unit: '%' }
];

const resourceUtilization = [
  { resource: 'Machinery', utilization: 85, downtime: 15, maintenance: 8 },
  { resource: 'Labor', utilization: 92, downtime: 8, maintenance: 0 },
  { resource: 'Materials', utilization: 78, downtime: 22, maintenance: 0 },
  { resource: 'Space', utilization: 88, downtime: 12, maintenance: 5 }
];

const marketingEffectiveness = [
  { channel: 'Social Media', leads: 150, conversion: 35, cost: 2500 },
  { channel: 'Trade Shows', leads: 80, conversion: 45, cost: 5000 },
  { channel: 'Referrals', leads: 120, conversion: 60, cost: 1000 },
  { channel: 'Website', leads: 200, conversion: 25, cost: 3000 }
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
  const [selectedView, setSelectedView] = useState<'overview' | 'operations' | 'financial' | 'marketing'>('overview');

  const profitMargin = (analyticsData.profit / analyticsData.revenue) * 100;
  const revenueGrowth = ((analyticsData.monthlyTrends[2].revenue - analyticsData.monthlyTrends[1].revenue) / analyticsData.monthlyTrends[1].revenue) * 100;
  const projectEfficiency = (projects.filter(p => p.status === 'completed').length / projects.length) * 100;
  const employeeUtilization = employees.reduce((sum, emp) => sum + (emp.projectIds.length > 0 ? 1 : 0), 0) / employees.length * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Business Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Share2 size={20} />
            Share Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Download size={20} />
            Export Data
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

      {/* View Selection */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'overview' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('operations')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'operations' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Operations
        </button>
        <button
          onClick={() => setSelectedView('financial')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'financial' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Financial
        </button>
        <button
          onClick={() => setSelectedView('marketing')}
          className={`px-4 py-2 border-b-2 ${
            selectedView === 'marketing' ? 'border-amber-600 text-amber-600' : 'border-transparent'
          }`}
        >
          Marketing
        </button>
      </div>

      {selectedView === 'overview' && (
        <>
          {/* KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${analyticsData.revenue.toLocaleString()}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
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

          {/* Productivity Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Productivity Trends</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="output" fill="#fbbf24" name="Output" />
                    <Line type="monotone" dataKey="efficiency" stroke="#22c55e" name="Efficiency" />
                    <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" name="Target" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Quality Metrics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={qualityMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Current" dataKey="value" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="target" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Resource Utilization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Resource Utilization</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceUtilization} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="resource"type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="utilization" stackId="a" fill="#22c55e" name="Utilization" />
                    <Bar dataKey="downtime" stackId="a" fill="#f87171" name="Downtime" />
                    <Bar dataKey="maintenance" stackId="a" fill="#fbbf24" name="Maintenance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Marketing ROI</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={marketingEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Leads" />
                    <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#22c55e" name="Conversion Rate %" />
                    <Scatter yAxisId="left" dataKey="cost" fill="#f87171" name="Cost per Lead" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Insights & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <TrendingUp className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Efficiency Improvement</p>
                    <p className="text-sm text-green-600">Production efficiency has increased by 15% through optimized workflows and reduced bottlenecks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-yellow-800">Resource Allocation</p>
                    <p className="text-sm text-yellow-600">Machine utilization is below target in the finishing department. Consider rebalancing workload.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Target className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-blue-800">Quality Metrics</p>
                    <p className="text-sm text-blue-600">First-time-right rate exceeds target by 2%. Maintain current quality control measures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                  <Users className="text-purple-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-purple-800">Team Performance</p>
                    <p className="text-sm text-purple-600">Cross-training program has improved team flexibility and reduced production delays.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedView === 'operations' && (
        <div className="space-y-6">
          {/* Production Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Tool className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Equipment Efficiency</p>
                  <p className="text-2xl font-bold">92.5%</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +3.2% from last month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Production Output</p>
                  <p className="text-2xl font-bold">1,250 units</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +8.5% from target
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Defect Rate</p>
                  <p className="text-2xl font-bold">1.2%</p>
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <ArrowDownRight size={16} />
                    -0.3% from last month
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Production Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Production Efficiency</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#22c55e" name="Efficiency" />
                    <Line type="monotone" dataKey="output" stroke="#fbbf24" name="Output" />
                    <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Resource Allocation</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="resource" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="utilization" fill="#22c55e" name="Utilization" />
                    <Bar dataKey="downtime" fill="#f87171" name="Downtime" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Quality Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {qualityMetrics.map(metric => (
                  <div key={metric.category} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{metric.category}</span>
                      <span className={`${
                        metric.value >= metric.target ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.value >= metric.target ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={qualityMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis />
                    <Radar name="Actual" dataKey="value" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="target" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Maintenance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Tool className="text-yellow-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-yellow-800">Upcoming Maintenance</p>
                      <p className="text-sm text-yellow-600">3 machines scheduled for next week</p>
                    </div>
                   </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckSquare className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Completed Maintenance</p>
                      <p className="text-sm text-green-600">5 machines serviced this month</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-red-800">Urgent Attention</p>
                      <p className="text-sm text-red-600">1 machine requires immediate service</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={resourceUtilization}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="resource" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="maintenance" fill="#fbbf24" name="Maintenance Hours" />
                      <Line type="monotone" dataKey="utilization" stroke="#22c55e" name="Utilization %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'financial' && (
        <div className="space-y-6">
          {/* Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gross Profit</p>
                  <p className="text-2xl font-bold">${(analyticsData.revenue - analyticsData.expenses).toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +15.2% YoY
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Percent className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Operating Margin</p>
                  <p className="text-2xl font-bold">32.5%</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +2.8% YoY
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cash Flow</p>
                  <p className="text-2xl font-bold">${analyticsData.cashFlow.toLocaleString()}</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +8.7% QoQ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Working Capital</p>
                  <p className="text-2xl font-bold">$850K</p>
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    Healthy ratio
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue and Cost Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
              <div className="h-80">
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Cost Structure</h2>
              <div className="h-80">
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Project Profitability */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Project Profitability Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                {analyticsData.projectMargins.map(project => (
                  <div key={project.projectId} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
  <span className="font-medium">Project {project.projectId}</span>
  <span className={`${
    project.margin >= 30 ? 'text-green-600' : 'text-red-600'
  }`}>
    {project.margin.toFixed(1)}% margin
  </span>
</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.margin >= 30 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${project.margin}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={analyticsData.projectMargins}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="projectId" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#22c55e" name="Revenue" />
                      <Bar yAxisId="left" dataKey="costs" fill="#f87171" name="Costs" />
                      <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#fbbf24" name="Margin %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Forecasting */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Financial Forecasts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analyticsData.forecasts.map(forecast => (
                <div key={forecast.period} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{forecast.period}</h3>
                    <span className="text-sm text-gray-600">
                      {(forecast.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Projected Revenue</span>
                      <span className="font-medium">${forecast.projectedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Projected Profit</span>
                      <span className="font-medium">${forecast.projectedProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">Risk Factors:</div>
                    <div className="flex flex-wrap gap-2">
                      {forecast.riskFactors.map(risk => (
                        <span key={risk} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">Opportunities:</div>
                    <div className="flex flex-wrap gap-2">
                      {forecast.opportunities.map(opportunity => (
                        <span key={opportunity} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {opportunity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'marketing' && (
        <div className="space-y-6">
          {/* Marketing KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +12.5% MoM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer LTV</p>
                  <p className="text-2xl font-bold">$4,250</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +8.3% YoY
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Retention Rate</p>
                  <p className="text-2xl font-bold">85.2%</p>
                  <p className="text-sm text-purple-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +3.1% QoQ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">32.5%</p>
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    +5.2% MoM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Channel Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Channel Performance</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={marketingEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Leads" />
                    <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#22c55e" name="Conversion %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Cost Analysis</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketingEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" fill="#f87171" name="Cost per Lead" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Customer Segmentation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Segmentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Segment Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Premium</span>
                      <span className="text-green-600">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span>Standard</span>
                      <span className="text-blue-600">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span>Basic</span>
                      <span className="text-amber-600">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { metric: 'Purchase Frequency', premium: 85, standard: 65, basic: 45 },
                      { metric: 'Average Order Value', premium: 90, standard: 60, basic: 40 },
                      { metric: 'Retention Rate', premium: 95, standard: 75, basic: 55 },
                      { metric: 'Engagement Score', premium: 88, standard: 70, basic: 50 },
                      { metric: 'Support Requests', premium: 75, standard: 85, basic: 95 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis />
                      <Radar name="Premium" dataKey="premium" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                      <Radar name="Standard" dataKey="standard" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Radar name="Basic" dataKey="basic" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Best Performing Campaign</p>
                      <p className="text-sm text-green-600">
                        "Summer Collection Launch" achieved 250% ROI
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-yellow-800">Optimization Needed</p>
                      <p className="text-sm text-yellow-600">
                        "Email Newsletter" showing declining engagement rates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-blue-800">Upcoming Campaign</p>
                      <p className="text-sm text-blue-600">
                        "Holiday Season" campaign launches in 2 weeks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                      { name: 'Email', roi: 180, engagement: 45, cost: 2500 },
                      { name: 'Social', roi: 250, engagement: 65, cost: 4000 },
                      { name: 'Display', roi: 150, engagement: 35, cost: 3500 },
                      { name: 'Search', roi: 220, engagement: 55, cost: 3000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="roi" fill="#22c55e" name="ROI %" />
                      <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#3b82f6" name="Engagement %" />
                      <Scatter yAxisId="left" dataKey="cost" fill="#f87171" name="Cost" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

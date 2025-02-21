import React from 'react';
import { Employee } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Star, TrendingUp, Target, Clock } from 'lucide-react';

interface PerformanceMetricsProps {
  employee: Employee;
}

export function PerformanceMetrics({ employee }: PerformanceMetricsProps) {
  const performanceData = employee.performance || [];
  const averageRating = performanceData.reduce((sum, review) => sum + review.rating, 0) / (performanceData.length || 1);
  
  // Mock data for demonstration
  const productivityData = [
    { month: 'Jan', efficiency: 85, target: 80 },
    { month: 'Feb', efficiency: 88, target: 80 },
    { month: 'Mar', efficiency: 92, target: 80 },
    { month: 'Apr', efficiency: 87, target: 80 },
    { month: 'May', efficiency: 90, target: 80 },
    { month: 'Jun', efficiency: 95, target: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              <p className="text-sm text-amber-600">Last 12 months</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Productivity</p>
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-green-600">Above target</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Goals Completed</p>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-blue-600">This quarter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Performance History</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Review */}
      {performanceData[0] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Performance Review</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Review Date</p>
                <p className="font-medium">{new Date(performanceData[0].date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reviewer</p>
                <p className="font-medium">{performanceData[0].reviewer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">{performanceData[0].rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Strengths</h3>
                <div className="space-y-2">
                  {performanceData[0].strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h3>
                <div className="space-y-2">
                  {performanceData[0].improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Goals</h3>
              <div className="space-y-2">
                {performanceData[0].goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {performanceData[0].comments && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Additional Comments</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {performanceData[0].comments}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Productivity Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Productivity Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#f59e0b" />
              <Bar dataKey="target" fill="#94a3b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

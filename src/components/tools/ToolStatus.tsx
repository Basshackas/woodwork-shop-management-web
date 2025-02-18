import React from 'react';
import { tools } from '../../data/tools';
import { getStatusStyle } from '../../utils/statusStyles';

export function ToolStatus() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Tool Status</h2>
      <div className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-medium">{tool.name}</h3>
              <p className="text-sm text-gray-500">Last maintained: {tool.lastMaintenance}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(tool.status)}`}>
              {tool.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { projects } from '../../data/projects';
import { getStatusStyle } from '../../utils/statusStyles';

export function ProjectsList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-gray-500">Client: {project.clientName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(project.status)}`}>
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
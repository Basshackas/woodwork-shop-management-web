import React, { useState } from 'react';
import { projects } from '../data/projects';
import { employees } from '../data/employees';
import {
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Users,
  CheckSquare,
  AlertTriangle,
  Search,
  FileText,
  BarChart2,
  Tag,
  Trash2,
  Edit2
} from 'lucide-react';
import { Project, Employee } from '../types';

const mockProjects = [
  ...projects,
  {
    id: '4',
    title: 'Office Workstations',
    status: 'pending',
    clientName: 'Tech Solutions Inc.',
    startDate: '2024-04-01',
    dueDate: '2024-05-15',
    description: 'Custom workstations for open office space',
    estimatedHours: 120,
    budget: 25000,
    actualCost: 0,
    materials: [],
    milestones: [
      {
        id: '1',
        title: 'Design Approval',
        dueDate: '2024-04-10',
        completed: false,
        description: 'Get client approval on workstation designs'
      },
      {
        id: '2',
        title: 'Material Procurement',
        dueDate: '2024-04-20',
        completed: false,
        description: 'Order and receive all required materials'
      }
    ],
    assignedEmployees: ['1', '2']
  }
];

export function ProjectsPage() {
  const [projectsList, setProjects] = useState(mockProjects);
  const [view, setView] = useState<'list' | 'gantt'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    status: 'pending',
    clientName: '',
    startDate: '',
    dueDate: '',
    description: '',
    estimatedHours: 0,
    budget: 0,
    materials: [],
    milestones: []
  });

  const filteredProjects = projectsList.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProjectProgress = (project: Project) => {
    const completedMilestones = project.milestones?.filter(m => m.completed).length || 0;
    const totalMilestones = project.milestones?.length || 1;
    return (completedMilestones / totalMilestones) * 100;
  };

  const getProjectTimeline = (project: Project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.dueDate);
    const today = new Date();
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject) {
      setProjects(projects.map(p => p.id === selectedProject.id ? { ...selectedProject, ...newProject } : p));
    } else {
      setProjects([...projects, { ...newProject as Project, id: String(projects.length + 1) }]);
    }
    setShowForm(false);
    setSelectedProject(null);
    setNewProject({
      title: '',
      status: 'pending',
      clientName: '',
      startDate: '',
      dueDate: '',
      description: '',
      estimatedHours: 0,
      budget: 0,
      materials: [],
      milestones: []
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          milestones: project.milestones?.map(milestone => 
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          )
        };
      }
      return project;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
        <div className="flex gap-4">
          <div className="flex rounded-lg shadow overflow-hidden">
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
            <button
              onClick={() => setView('gantt')}
              className={`px-4 py-2 ${
                view === 'gantt'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Gantt View
            </button>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.clientName}
                  onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.estimatedHours}
                  onChange={(e) => setNewProject({ ...newProject, estimatedHours: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="border-t pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                {selectedProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold">
                {projectsList.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Projects</p>
              <p className="text-2xl font-bold">
                {projectsList.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed Projects</p>
              <p className="text-2xl font-bold">
                {projectsList.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600">Client: {project.clientName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setNewProject(project);
                      setShowForm(true);
                    }}
                    className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-100"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span>{project.estimatedHours} hours estimated</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign size={16} />
                  <span>Budget: ${project.budget?.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getProjectProgress(project).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${getProjectProgress(project)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Timeline</span>
                    <span>{getProjectTimeline(project).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${getProjectTimeline(project)}%` }}
                    />
                  </div>
                </div>
              </div>

              {project.milestones && project.milestones.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Milestones</h4>
                  <div className="space-y-2">
                    {project.milestones.map(milestone => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleMilestone(project.id, milestone.id)}
                          className={`w-6 h-6 rounded-full border-2 ${
                            milestone.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {milestone.completed && (
                            <CheckSquare className="w-4 h-4 text-white m-auto" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                <div className="flex -space-x-2">
                  {employees
                    .filter(emp => emp.projectIds.includes(project.id))
                    .map(employee => (
                      <div
                        key={employee.id}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                        title={employee.name}
                      >
                        {employee.name.charAt(0)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {filteredProjects.map(project => {
                const startDate = new Date(project.startDate);
                const endDate = new Date(project.dueDate);
                const duration = endDate.getTime() - startDate.getTime();
                const progress = getProjectTimeline(project);

                return (
                  <div key={project.id} className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-1/4">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.clientName}</p>
                      </div>
                      <div className="w-3/4 pl-4">
                        <div className="relative h-6 bg-gray-100 rounded">
                          <div
                            className="absolute h-full bg-amber-200 rounded"
                            style={{
                              width: `${progress}%`,
                              left: `${(new Date(project.startDate).getTime() - startDate.getTime()) / duration * 100}%`
                            }}
                          >
                            <div
                              className="absolute h-full bg-amber-600 rounded"
                              style={{ width: `${getProjectProgress(project)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {project.milestones?.map(milestone => (
                      <div key={milestone.id} className="flex items-center mb-2 pl-8">
                        <div className="w-1/4">
                          <p className="text-sm">{milestone.title}</p>
                        </div>
                        <div className="w-3/4 pl-4">
                          <div className="relative h-4 bg-gray-100 rounded">
                            <div
                              className={`absolute h-full rounded ${
                                milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                              style={{
                                width: '10%',
                                left: `${(new Date(milestone.dueDate).getTime() - startDate.getTime()) / duration * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + i);
                    return (
                      <div key={i} className="text-sm text-gray-600">
                        {date.toLocaleString('default', { month: 'short' })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
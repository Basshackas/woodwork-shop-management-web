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
  Edit2,
  Filter,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LayoutList,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  UserPlus,
  Link,
  MessageSquare,
  PieChart,
  Download,
  Upload,
  Settings,
  X
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
    assignedEmployees: ['1', '2'],
    priority: 'high',
    tags: ['office', 'custom', 'large-scale'],
    attachments: [],
    notes: [],
    tasks: [],
    risks: []
  }
];

export function ProjectsPage() {
  const [projectsList, setProjects] = useState(mockProjects);
  const [view, setView] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof Project>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tasks' | 'team' | 'files' | 'analytics'>('overview');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('month');

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    status: 'pending',
    priority: 'medium',
    clientName: '',
    startDate: '',
    dueDate: '',
    description: '',
    estimatedHours: 0,
    budget: 0,
    materials: [],
    milestones: [],
    assignedEmployees: [],
    tags: [],
    attachments: [],
    notes: [],
    tasks: [],
    risks: []
  });

  // Calculate project metrics
  const totalProjects = projectsList.length;
  const completedProjects = projectsList.filter(p => p.status === 'completed').length;
  const activeProjects = projectsList.filter(p => p.status === 'in-progress').length;
  const overdueProjects = projectsList.filter(p => {
    const dueDate = new Date(p.dueDate);
    return dueDate < new Date() && p.status !== 'completed';
  }).length;

  const totalBudget = projectsList.reduce((sum, p) => sum + (p.budget || 0), 0);
  const completionRate = (completedProjects / totalProjects) * 100;

  // Enhanced filtering
  const filteredProjects = projectsList.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'dueDate') {
      return direction * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    return direction * (String(a[sortField]).localeCompare(String(b[sortField])));
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
      priority: 'medium',
      clientName: '',
      startDate: '',
      dueDate: '',
      description: '',
      estimatedHours: 0,
      budget: 0,
      materials: [],
      milestones: [],
      assignedEmployees: []
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const progress = getProjectProgress(project);
    const timeline = getProjectTimeline(project);
    const assignedTeam = employees.filter(emp => project.assignedEmployees?.includes(emp.id));

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.clientName}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{project.estimatedHours} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span>${project.budget?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{assignedTeam.length} members</span>
            </div>
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div className="flex -space-x-2">
            {assignedTeam.slice(0, 3).map(employee => (
              <div
                key={employee.id}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                title={employee.name}
              >
                {employee.name.charAt(0)}
              </div>
            ))}
            {assignedTeam.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                +{assignedTeam.length - 3}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedProject(project);
                setShowProjectDetails(true);
              }}
              className="text-amber-600 hover:text-amber-700 text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProjectDetails = () => {
    if (!selectedProject) return null;

    const assignedTeam = employees.filter(emp => selectedProject.assignedEmployees?.includes(emp.id));
    const progress = getProjectProgress(selectedProject);
    const timeline = getProjectTimeline(selectedProject);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
              <p className="text-gray-600">{selectedProject.clientName}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setShowProjectDetails(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'overview' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('tasks')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'tasks' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => setSelectedTab('team')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'team' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Team
              </button>
              <button
                onClick={() => setSelectedTab('files')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'files' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setSelectedTab('analytics')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'analytics' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Analytics
              </button>
            </div>

            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status</span>
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority</span>
                          <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(selectedProject.priority)}`}>
                            {selectedProject.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date</span>
                          <span>{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date</span>
                          <span>{new Date(selectedProject.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget</span>
                          <span>${selectedProject.budget?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="bg-gray-50 rounded-lg p-4 text-gray-600">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Progress</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Progress</span>
                            <span>{progress.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-600 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Timeline</span>
                            <span>{timeline.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${timeline}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        {assignedTeam.map(employee => (
                          <div key={employee.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                {employee.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-gray-600">{employee.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Milestones</h3>
                  <div className="space-y-2">
                    {selectedProject.milestones?.map(milestone => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                        </div>
                        <button
                          onClick={() => toggleMilestone(selectedProject.id, milestone.id)}
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
              </div>
            )}

            {selectedTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                    <Plus size={20} />
                    Add Task
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedProject.tasks?.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'team' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                    <UserPlus size={20} />
                    Add Member
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {assignedTeam.map(employee => (
                    <div
                      key={employee.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'files' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Files & Documents</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                      <Download size={20} />
                      Download All
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                      <Upload size={20} />
                      Upload Files
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.attachments?.map(file => (
                    <div
                      key={file.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-amber-600" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button className="text-amber-600 hover:text-amber-700">
                        <Download size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-1">Budget Utilization</h4>
                    <p className="text-2xl font-bold">
                      ${(selectedProject.actualCost || 0).toLocaleString()}
                      <span className="text-sm text-gray-600 ml-1">
                        / ${selectedProject.budget?.toLocaleString()}
                      </span>
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-600 h-2 rounded-full"
                          style={{ width: `${((selectedProject.actualCost || 0) / (selectedProject.budget || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-1">Time Tracking</h4>
                    <p className="text-2xl font-bold">
                      {selectedProject.actualHours || 0}
                      <span className="text-sm text-gray-600 ml-1">
                        / {selectedProject.estimatedHours} hours
                      </span>
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${((selectedProject.actualHours || 0) / selectedProject.estimatedHours) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-600 mb-1">Task Completion</h4>
                    <p className="text-2xl font-bold">
                      {selectedProject.tasks?.filter(t => t.status === 'completed').length || 0}
                      <span className="text-sm text-gray-600 ml-1">
                        / {selectedProject.tasks?.length || 0} tasks
                      </span>
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${((selectedProject.tasks?.filter(t => t.status === 'completed').length || 0) / (selectedProject.tasks?.length || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-4">Risk Assessment</h4>
                    <div className="space-y-2">
                      {selectedProject.risks?.map(risk => (
                        <div key={risk.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{risk.title}</p>
                            <p className="text-sm text-gray-600">{risk.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              risk.impact === 'high' ? 'bg-red-100 text-red-800' :
                              risk.impact === 'medium' ? 'bg-yellow-100' :

              risk.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {risk.impact}
            </span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              risk.status === 'mitigated' ? 'bg-green-100 text-green-800' :
              risk.status === 'occurred' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {risk.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="bg-gray-50 rounded-lg p-4">
    <h4 className="font-medium mb-4">Resource Allocation</h4>
    <div className="space-y-4">
      {assignedTeam.map(employee => (
        <div key={employee.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              {employee.name.charAt(0)}
            </div>
            <span>{employee.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {employee.projectIds.length} projects
            </span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: `${(employee.projectIds.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
)}
</div>
</div>
</div>
);
};

return (
<div className="space-y-6">
<div className="flex justify-between items-center">
<h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
<div className="flex gap-4">
<div className="flex rounded-lg shadow overflow-hidden">
<button
onClick={() => setView('grid')}
className={`px-4 py-2 ${
view === 'grid'
? 'bg-amber-600 text-white'
: 'bg-white text-gray-600 hover:bg-gray-50'
}`}
>
<LayoutGrid size={20} />
</button>
<button
onClick={() => setView('list')}
className={`px-4 py-2 ${
view === 'list'
? 'bg-amber-600 text-white'
: 'bg-white text-gray-600 hover:bg-gray-50'
}`}
>
<LayoutList size={20} />
</button>
<button
onClick={() => setView('calendar')}
className={`px-4 py-2 ${
view === 'calendar'
? 'bg-amber-600 text-white'
: 'bg-white text-gray-600 hover:bg-gray-50'
}`}
>
<CalendarIcon size={20} />
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

{/* Project Stats */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<div className="bg-white rounded-lg shadow p-6">
<div className="flex items-center gap-4">
<div className="p-3 bg-blue-100 rounded-lg">
<Briefcase className="w-6 h-6 text-blue-600" />
</div>
<div>
<p className="text-sm text-gray-600">Active Projects</p>
<p className="text-2xl font-bold">{activeProjects}</p>
<p className="text-sm text-blue-600 flex items-center gap-1">
<ArrowUpRight size={16} />
+12.5% from last month
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
<p className="text-sm text-gray-600">Completion Rate</p>
<p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
<p className="text-sm text-green-600 flex items-center gap-1">
<ArrowUpRight size={16} />
+5.2% from last month
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
<p className="text-sm text-gray-600">Overdue Projects</p>
<p className="text-2xl font-bold">{overdueProjects}</p>
<p className="text-sm text-red-600 flex items-center gap-1">
<ArrowDownRight size={16} />
-3.1% from last month
</p>
</div>
</div>
</div>

<div className="bg-white rounded-lg shadow p-6">
<div className="flex items-center gap-4">
<div className="p-3 bg-amber-100 rounded-lg">
<DollarSign className="w-6 h-6 text-amber-600" />
</div>
<div>
<p className="text-sm text-gray-600">Total Budget</p>
<p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
<p className="text-sm text-amber-600 flex items-center gap-1">
<ArrowUpRight size={16} />
+8.4% from last month
</p>
</div>
</div>
</div>
</div>

{/* Search and Filters */}
<div className="bg-white rounded-lg shadow p-4">
<div className="flex justify-between items-center mb-4">
<div className="relative md:w-96">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
<input
type="text"
placeholder="Search projects..."
className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
<button
onClick={() => setShowFilters(!showFilters)}
className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
>
<Filter size={20} />
{showFilters ? 'Hide Filters' : 'Show Filters'}
</button>
</div>

{showFilters && (
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
<select
className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value)}
>
<option value="all">All Statuses</option>
<option value="pending">Pending</option>
<option value="in-progress">In Progress</option>
<option value="completed">Completed</option>
<option value="on-hold">On Hold</option>
</select>

<select
className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
value={priorityFilter}
onChange={(e) => setPriorityFilter(e.target.value)}
>
<option value="all">All Priorities</option>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
</select>

<select
className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
value={sortField}
onChange={(e) => setSortField(e.target.value as keyof Project)}
>
<option value="dueDate">Sort by Due Date</option>
<option value="title">Sort by Title</option>
<option value="status">Sort by Status</option>
<option value="priority">Sort by Priority</option>
</select>

<select
className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
value={dateRange}
onChange={(e) => setDateRange(e.target.value as 'week' | 'month' | 'quarter')}
>
<option value="week">This Week</option>
<option value="month">This Month</option>
<option value="quarter">This Quarter</option>
</select>
</div>
)}
</div>

{/* Project Grid/List View */}
{view === 'grid' ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{filteredProjects.map(project => (
<ProjectCard key={project.id} project={project} />
))}
</div>
) : view === 'list' ? (
<div className="bg-white rounded-lg shadow overflow-hidden">
<table className="min-w-full">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Project
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Client
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Priority
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Due Date
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Progress
</th>
<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
Actions
</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-200">
{filteredProjects.map(project => (
<tr key={project.id} className="hover:bg-gray-50">
<td className="px-6 py-4 whitespace-nowrap">
<div className="flex items-center">
<div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
<Briefcase className="h-5 w-5 text-amber-600" />
</div>
<div className="ml-4">
<div className="text-sm font-medium text-gray-900">{project.title}</div>
<div className="text-sm text-gray-500">{project.description}</div>
</div>
</div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="text-sm text-gray-900">{project.clientName}</div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
{project.status}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
{project.priority}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
{new Date(project.dueDate).toLocaleDateString()}
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="w-full bg-gray-200 rounded-full h-2">
<div
className="bg-amber-600 h-2 rounded-full"
style={{ width: `${getProjectProgress(project)}%` }}
/>
</div>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
<button
onClick={() => {
setSelectedProject(project);
setShowProjectDetails(true);
}}
className="text-amber-600 hover:text-amber-900"
>
View Details
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
) : (
<div className="bg-white rounded-lg shadow p-6">
<h2 className="text-lg font-semibold mb-4">Project Calendar</h2>
<div className="grid grid-cols-7 gap-4">
{/* Calendar implementation would go here */}
</div>
</div>
)}

{showProjectDetails && <ProjectDetails />}
</div>
);
}

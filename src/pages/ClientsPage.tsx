import React, { useState } from 'react';
import { 
  Mail, Phone, Building2, MapPin, Plus, Search, Edit2, Trash2, UserPlus,
  Filter, Download, Upload, BarChart2, Calendar, Clock, DollarSign,
  MessageSquare, FileText, Link, Star, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Users, RefreshCw, ChevronRight, Package, CreditCard,
  Receipt, Share2
} from 'lucide-react';
import { Client } from '../types';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    company: 'Smith & Co',
    industry: 'Construction',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      country: 'USA'
    },
    projects: ['1', '3'],
    notes: 'Prefers email communication. Interested in custom furniture.',
    preferredContactMethod: 'email',
    status: 'active',
    creditLimit: 25000,
    paymentTerms: 'Net 30',
    contacts: [
      {
        id: '1',
        name: 'John Smith',
        title: 'Owner',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        primary: true
      }
    ],
    interactions: [
      {
        id: '1',
        date: '2024-03-15',
        type: 'meeting',
        summary: 'Project discussion',
        outcome: 'Positive feedback',
        participants: ['John Smith']
      }
    ],
    paymentHistory: [
      {
        id: '1',
        date: '2024-03-01',
        amount: 5000,
        method: 'credit_card',
        status: 'completed',
        reference: 'INV-2024-001',
        invoiceId: '1',
        notes: 'Regular payment'
      }
    ],
    invoices: [
      {
        id: '1',
        number: 'INV-2024-001',
        date: '2024-02-15',
        dueDate: '2024-03-15',
        items: [
          {
            id: '1',
            description: 'Custom Dining Table',
            quantity: 1,
            unitPrice: 5000,
            tax: 250,
            total: 5250,
            projectId: '1'
          }
        ],
        subtotal: 5000,
        tax: 250,
        total: 5250,
        amountPaid: 5000,
        balance: 250,
        status: 'paid'
      }
    ],
    balance: 250,
    totalBilled: 5250,
    totalPaid: 5000
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    company: 'Modern Living',
    industry: 'Interior Design',
    address: {
      street: '456 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    projects: ['2'],
    notes: 'Looking for ongoing partnership for office furniture.',
    preferredContactMethod: 'phone',
    status: 'active',
    creditLimit: 50000,
    paymentTerms: 'Net 30',
    contacts: [
      {
        id: '2',
        name: 'Sarah Johnson',
        title: 'CEO',
        email: 'sarah.j@example.com',
        phone: '(555) 234-5678',
        primary: true
      }
    ],
    interactions: [
      {
        id: '2',
        date: '2024-03-10',
        type: 'call',
        summary: 'Follow-up call',
        outcome: 'Scheduled meeting',
        participants: ['Sarah Johnson']
      }
    ],
    paymentHistory: [
      {
        id: '2',
        date: '2024-02-28',
        amount: 8000,
        method: 'bank_transfer',
        status: 'completed',
        reference: 'INV-2024-002',
        invoiceId: '2',
        notes: 'Project payment'
      }
    ],
    invoices: [
      {
        id: '2',
        number: 'INV-2024-002',
        date: '2024-02-15',
        dueDate: '2024-03-15',
        items: [
          {
            id: '2',
            description: 'Office Furniture Set',
            quantity: 1,
            unitPrice: 8000,
            tax: 400,
            total: 8400,
            projectId: '2'
          }
        ],
        subtotal: 8000,
        tax: 400,
        total: 8400,
        amountPaid: 8000,
        balance: 400,
        status: 'paid'
      }
    ],
    balance: 400,
    totalBilled: 8400,
    totalPaid: 8000
  }
];

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedView, setSelectedView] = useState<'overview' | 'details' | 'analytics'>('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTab, setSelectedTab] = useState<'info' | 'projects' | 'invoices' | 'communication'>('info');

  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    preferredContactMethod: 'email',
    status: 'active',
    projects: [],
    notes: '',
    contacts: [],
    interactions: [],
    paymentHistory: [],
    invoices: [],
    balance: 0,
    totalBilled: 0,
    totalPaid: 0
  });

  // Calculate client metrics
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.totalPaid, 0);
  const averageRevenue = totalRevenue / totalClients;
  const outstandingBalance = clients.reduce((sum, client) => sum + client.balance, 0);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesIndustry = filterIndustry === 'all' || client.industry === filterIndustry;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  }).sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    return direction * String(a[sortField]).localeCompare(String(b[sortField]));
  });

  const industries = Array.from(new Set(clients.map(client => client.industry))).filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClient) {
      setClients(clients.map(c => c.id === selectedClient.id ? { ...selectedClient, ...newClient } : c));
    } else {
      setClients([...clients, { ...newClient as Client, id: String(clients.length + 1) }]);
    }
    setShowAddForm(false);
    setSelectedClient(null);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      preferredContactMethod: 'email',
      status: 'active',
      projects: [],
      notes: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const ClientCard = ({ client }: { client: Client }) => {
    const totalProjects = client.projects.length;
    const recentActivity = client.interactions[0];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{client.name}</h3>
            {client.company && (
              <p className="text-gray-600 flex items-center gap-1">
                <Building2 size={16} />
                {client.company}
              </p>
            )}
            {client.industry && (
              <p className="text-sm text-gray-500">{client.industry}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm ${
              client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {client.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} />
            <span className="text-sm">{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            <span className="text-sm">{client.phone}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-sm text-gray-600">Total Projects</span>
            <span className="font-medium">{totalProjects}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-sm text-gray-600">Total Billed</span>
            <span className="font-medium">${client.totalBilled.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t">
            <span className="text-sm text-gray-600">Outstanding Balance</span>
            <span className={`font-medium ${client.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${client.balance.toLocaleString()}
            </span>
          </div>
        </div>

        {recentActivity && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Recent Activity</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm">{new Date(recentActivity.date).toLocaleDateString()}</span>
              </div>
              <span className="text-sm text-gray-600">{recentActivity.type}</span>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div className="flex -space-x-2">
            {client.contacts.slice(0, 3).map(contact => (
              <div
                key={contact.id}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                title={contact.name}
              >
                {contact.name.charAt(0)}
              </div>
            ))}
            {client.contacts.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                +{client.contacts.length - 3}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedClient(client);
                setSelectedView('details');
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

  const ClientDetails = () => {
    if (!selectedClient) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{selectedClient.name}</h2>
              <p className="text-gray-600">{selectedClient.company}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSelectedClient(null);
                  setSelectedView('overview');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedTab('info')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'info' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Information
              </button>
              <button
                onClick={() => setSelectedTab('projects')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'projects' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setSelectedTab('invoices')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'invoices' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Invoices & Payments
              </button>
              <button
                onClick={() => setSelectedTab('communication')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'communication' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'
                }`}
              >
                Communication
              </button>
            </div>

            {selectedTab === 'info' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={16} />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="text-gray-400" size={16} />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400" size={16} />
                      <span>
                        {selectedClient.address.street}, {selectedClient.address.city},
                        {selectedClient.address.state} {selectedClient.address.zipCode}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mt-6 mb-4">Business Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{selectedClient.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Limit:</span>
                      <span className="font-medium">${selectedClient.creditLimit?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Terms:</span>
                      <span className="font-medium">{selectedClient.paymentTerms}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Contacts</h3>
                  <div className="space-y-4">
                    {selectedClient.contacts.map(contact => (
                      <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>{contact.email}</span>
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                        {contact.primary && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                            Primary Contact
                          </span>
                        )}
                      </div>
                    ))}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-dashed rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-900">
                      <Plus size={20} />
                      Add Contact
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                    <Plus size={20} />
                    New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {selectedClient.projects.map(projectId => (
                    <div key={projectId} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Project #{projectId}</h4>
                        <p className="text-sm text-gray-600">Started: March 15, 2024</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          In Progress
                        </span>
                        <button className="text-amber-600 hover:text-amber-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'invoices' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Billed</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedClient.totalBilled.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Paid</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${selectedClient.totalPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Outstanding Balance</p>
                    <p className="text-2xl font-bold text-red-600">
                      ${selectedClient.balance.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
                  <div className="space-y-4">
                    {selectedClient.invoices.map(invoice => (
                      <div key={invoice.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Invoice #{invoice.number}</p>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(invoice.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                          <span className="font-medium">${invoice.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                  <div className="space-y-4">
                    {selectedClient.paymentHistory.map(payment => (
                      <div key={payment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            {payment.method.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'communication' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Communication History</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                    <Plus size={20} />
                    Log Interaction
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedClient.interactions.map(interaction => (
                    <div key={interaction.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{interaction.type}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(interaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-sm text-gray-600">
                          {interaction.participants.join(', ')}
                        </span>
                      </div>
                      <p className="text-gray-700">{interaction.summary}</p>
                      {interaction.outcome && (
                        <p className="mt-2 text-sm text-gray-600">
                          Outcome: {interaction.outcome}
                        </p>
                      )}
                    </div>
                  ))}
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
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
          <p className="text-gray-600">Manage and track your client relationships</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Share2 size={20} />
            Share Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
            <Download size={20} />
            Export
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Client
          </button>
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold">{totalClients}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                {activeClients} active
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
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +12.5% this month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Receipt className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Revenue</p>
              <p className="text-2xl font-bold">${averageRevenue.toLocaleString()}</p>
              <p className="text-sm text-purple-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                Per client
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
              <p className="text-sm text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-bold">${outstandingBalance.toLocaleString()}</p>
              <p className="text-sm text-red-600 flex items-center gap-1">
                <Clock size={16} />
                Needs attention
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative m d:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search clients..."
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={sortField}
              onChange={(e) => setSortField(e.target.value as keyof Client)}
            >
              <option value="name">Sort by Name</option>
              <option value="company">Sort by Company</option>
              <option value="totalBilled">Sort by Revenue</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        )}
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {selectedClient && <ClientDetails />}
    </div>
  );
}

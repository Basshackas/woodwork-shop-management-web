import React, { useState } from 'react';
import { Mail, Phone, Building2, MapPin, Plus, Search, Edit2, Trash2, UserPlus } from 'lucide-react';
import { Client } from '../types';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    company: 'Smith & Co',
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
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    company: 'Modern Living',
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
    status: 'active'
  }
];

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    company: '',
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

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setNewClient(client);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
        >
          <UserPlus size={20} />
          Add Client
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add/Edit Client Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedClient ? 'Edit Client' : 'Add New Client'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newClient.address?.street}
                    onChange={(e) => setNewClient({
                      ...newClient,
                      address: { ...newClient.address!, street: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newClient.address?.city}
                    onChange={(e) => setNewClient({
                      ...newClient,
                      address: { ...newClient.address!, city: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newClient.address?.state}
                    onChange={(e) => setNewClient({
                      ...newClient,
                      address: { ...newClient.address!, state: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newClient.address?.zipCode}
                    onChange={(e) => setNewClient({
                      ...newClient,
                      address: { ...newClient.address!, zipCode: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newClient.address?.country}
                    onChange={(e) => setNewClient({
                      ...newClient,
                      address: { ...newClient.address!, country: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newClient.preferredContactMethod}
                onChange={(e) => setNewClient({
                  ...newClient,
                  preferredContactMethod: e.target.value as 'email' | 'phone'
                })}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                rows={3}
                value={newClient.notes}
                onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedClient(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                {selectedClient ? 'Update Client' : 'Add Client'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClients.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{client.name}</h3>
                {client.company && (
                  <p className="text-gray-600 flex items-center gap-1">
                    <Building2 size={16} />
                    {client.company}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-100"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                {client.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                {client.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                {`${client.address.street}, ${client.address.city}, ${client.address.state} ${client.address.zipCode}`}
              </p>
            </div>

            {client.notes && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-gray-600">{client.notes}</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-sm ${
                client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {client.status === 'active' ? 'Active' : 'Inactive'}
              </span>
              <span className="text-sm text-gray-600">
                {client.projects.length} {client.projects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FileText, Upload, Search, FolderPlus, Tag, Calendar, Download, Trash2, Edit2, Filter } from 'lucide-react';
import { Document } from '../types';

const mockDocuments: Document[] = [
  {
    id: '1',
    type: 'contract',
    title: 'Custom Dining Table Agreement',
    description: 'Contract for John Smith\'s dining table project',
    url: '/documents/contract-001.pdf',
    createdAt: '2024-03-01',
    modifiedAt: '2024-03-01',
    status: 'final',
    relatedTo: {
      type: 'project',
      id: '1'
    },
    tags: ['contract', 'dining-table', 'custom']
  },
  {
    id: '2',
    type: 'invoice',
    title: 'Invoice #INV-2024-001',
    description: 'Invoice for Sarah Johnson\'s kitchen cabinets',
    url: '/documents/invoice-001.pdf',
    createdAt: '2024-03-05',
    modifiedAt: '2024-03-05',
    status: 'final',
    relatedTo: {
      type: 'client',
      id: '2'
    },
    tags: ['invoice', 'kitchen-cabinets']
  }
];

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    type: 'contract',
    title: '',
    description: '',
    status: 'draft',
    tags: []
  });

  const documentTypes = ['contract', 'invoice', 'proposal', 'work_order', 'other'];
  const statusTypes = ['draft', 'final', 'archived'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: Document = {
      ...newDocument as Document,
      id: String(documents.length + 1),
      createdAt: new Date().toISOString().split('T')[0],
      modifiedAt: new Date().toISOString().split('T')[0],
      url: '/documents/temp.pdf', // In a real app, this would be handled by file upload
    };
    setDocuments([...documents, newDoc]);
    setShowUploadForm(false);
    setNewDocument({
      type: 'contract',
      title: '',
      description: '',
      status: 'draft',
      tags: []
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
        >
          <Upload size={20} />
          Upload Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {statusTypes.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value as Document['type'] })}
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                rows={3}
                value={newDocument.description}
                onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                placeholder="contract, project, custom"
                value={newDocument.tags?.join(', ')}
                onChange={(e) => setNewDocument({
                  ...newDocument,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                value={newDocument.status}
                onChange={(e) => setNewDocument({ ...newDocument, status: e.target.value as Document['status'] })}
              >
                {statusTypes.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Document List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded">
                    <FileText className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                    <p className="text-gray-600 mt-1">{doc.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {formatDate(doc.modifiedAt)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doc.status === 'final' ? 'bg-green-100 text-green-800' :
                        doc.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={16} />
                        {doc.type.charAt(0).toUpperCase() + doc.type.slice(1).replace('_', ' ')}
                      </span>
                    </div>
                    {doc.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {doc.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-100"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
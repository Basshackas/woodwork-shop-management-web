import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus,
  Download, 
  Upload, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Box, 
  Tag, 
  Calendar, 
  X,
  LayoutList,
  DollarSign,
  Truck,
  Warehouse,
  ShoppingCart,
  Trash2,
  Edit2,
  CheckSquare
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  reorderPoint: number;
  location: string;
  supplier: string;
  lastRestockDate: string;
  quality: 'premium' | 'standard' | 'economy';
  description?: string;
  notes?: string;
  tags?: string[];
  minimumOrder?: number;
  leadTime?: number;
  lastUpdated: string;
  updatedBy?: string;
}

// Mock materials data
const materials: Material[] = [
  {
    id: '1',
    name: 'Oak Wood',
    sku: 'OAK-001',
    category: 'Wood',
    quantity: 500,
    unit: 'board feet',
    unitPrice: 8.50,
    reorderPoint: 100,
    location: 'Warehouse A',
    supplier: 'Premium Lumber Co',
    lastRestockDate: '2024-02-15',
    quality: 'premium',
    description: 'High-quality oak wood suitable for furniture making',
    minimumOrder: 100,
    leadTime: 14,
    lastUpdated: '2024-03-15',
    tags: ['hardwood', 'furniture-grade', 'oak']
  },
  {
    id: '2',
    name: 'Maple Plywood',
    sku: 'MPL-002',
    category: 'Wood',
    quantity: 200,
    unit: 'sheets',
    unitPrice: 45.00,
    reorderPoint: 50,
    location: 'Warehouse B',
    supplier: 'Woodcraft Supply',
    lastRestockDate: '2024-02-20',
    quality: 'standard',
    description: 'Standard grade maple plywood sheets',
    minimumOrder: 20,
    leadTime: 7,
    lastUpdated: '2024-03-10',
    tags: ['plywood', 'maple', 'sheet-goods']
  },
  {
    id: '3',
    name: 'Steel Brackets',
    sku: 'STL-001',
    category: 'Hardware',
    quantity: 1000,
    unit: 'pieces',
    unitPrice: 2.25,
    reorderPoint: 200,
    location: 'Warehouse A',
    supplier: 'Metal Solutions Inc',
    lastRestockDate: '2024-02-25',
    quality: 'premium',
    description: 'Heavy-duty steel mounting brackets',
    minimumOrder: 500,
    leadTime: 5,
    lastUpdated: '2024-03-12',
    tags: ['metal', 'hardware', 'brackets']
  }
];

interface NewMaterialForm {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  reorderPoint: number;
  location: string;
  supplier: string;
  quality: 'premium' | 'standard' | 'economy';
  description?: string;
  minimumOrder?: number;
  leadTime?: number;
  tags?: string[];
}

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showNewItem, setShowNewItem] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [sortField, setSortField] = useState<keyof Material>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [stockStatus, setStockStatus] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');

  const [newMaterial, setNewMaterial] = useState<NewMaterialForm>({
    name: '',
    sku: '',
    category: 'Wood',
    quantity: 0,
    unit: '',
    unitPrice: 0,
    reorderPoint: 0,
    location: 'Warehouse A',
    supplier: '',
    quality: 'standard',
    description: '',
    minimumOrder: 0,
    leadTime: 0,
    tags: []
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewMaterialForm, string>>>({});

  const categories = ['Wood', 'Hardware', 'Fabric', 'Paint', 'Adhesives', 'Finishing'];
  const qualities = ['premium', 'standard', 'economy'];
  const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C'];
  const units = ['pieces', 'feet', 'sheets', 'board feet', 'gallons', 'pounds', 'meters', 'square feet'];

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof NewMaterialForm, string>> = {};

    if (!newMaterial.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!newMaterial.sku.trim()) {
      errors.sku = 'SKU is required';
    }
    if (newMaterial.quantity < 0) {
      errors.quantity = 'Quantity must be positive';
    }
    if (newMaterial.unitPrice <= 0) {
      errors.unitPrice = 'Unit price must be greater than 0';
    }
    if (!newMaterial.unit.trim()) {
      errors.unit = 'Unit is required';
    }
    if (newMaterial.reorderPoint < 0) {
      errors.reorderPoint = 'Reorder point must be positive';
    }
    if (!newMaterial.supplier.trim()) {
      errors.supplier = 'Supplier is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      setShowNewItem(false);
      setNewMaterial({
        name: '',
        sku: '',
        category: 'Wood',
        quantity: 0,
        unit: '',
        unitPrice: 0,
        reorderPoint: 0,
        location: 'Warehouse A',
        supplier: '',
        quality: 'standard',
        description: '',
        minimumOrder: 0,
        leadTime: 0,
        tags: []
      });
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesQuality = selectedQuality === 'all' || material.quality === selectedQuality;
    const matchesLocation = selectedLocation === 'all' || material.location === selectedLocation;
    const matchesPriceRange = material.unitPrice >= priceRange.min && material.unitPrice <= priceRange.max;
    
    const matchesStockStatus = stockStatus === 'all' ||
      (stockStatus === 'in-stock' && material.quantity > material.reorderPoint) ||
      (stockStatus === 'low-stock' && material.quantity <= material.reorderPoint && material.quantity > 0) ||
      (stockStatus === 'out-of-stock' && material.quantity === 0);

    return matchesSearch && matchesCategory && matchesQuality && 
           matchesLocation && matchesPriceRange && matchesStockStatus;
  }).sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      return direction * (a[sortField] as string).localeCompare(b[sortField] as string);
    }
    return direction * ((a[sortField] as number) - (b[sortField] as number));
  });

  const totalValue = materials.reduce((sum, material) => 
    sum + (material.quantity * material.unitPrice), 0
  );

  const lowStock = materials.filter(m => m.quantity <= m.reorderPoint).length;
  const outOfStock = materials.filter(m => m.quantity === 0).length;

  const handleSort = (field: keyof Material) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: 'delete' | 'export' | 'move') => {
    if (selectedItems.length === 0) return;

    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
          // Handle bulk delete
        }
        break;
      case 'export':
        // Handle bulk export
        break;
      case 'move':
        // Handle bulk move
        break;
    }
  };

  const getStockStatus = (material: Material) => {
    if (material.quantity === 0) {
      return { label: 'Out of Stock', class: 'bg-red-100 text-red-800' };
    }
    if (material.quantity <= material.reorderPoint) {
      return { label: 'Low Stock', class: 'bg-yellow-100 text-yellow-800' };
    }
    return { label: 'In Stock', class: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Raw Materials Inventory</h1>
          <p className="text-gray-600">Manage your raw materials stock and supplies</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
            onClick={() => handleBulkAction('export')}
            disabled={selectedItems.length === 0}
          >
            <Download size={20} />
            Export Selected
          </button>
          <button
            onClick={() => setShowNewItem(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Material
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Materials</p>
              <p className="text-2xl font-bold">{materials.length}</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                {((materials.length / 100) * 100).toFixed(1)}% utilization
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
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowUpRight size={16} />
                +8.2% from last month
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
              <p className="text-sm text-gray-600">Stock Alerts</p>
              <p className="text-2xl font-bold">{lowStock}</p>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-red-600">{outOfStock} out of stock</span>
                <span className="text-gray-400">•</span>
                <span className="text-yellow-600">{lowStock - outOfStock} low stock</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-purple-600 flex items-center gap-1">
                <Truck size={16} />
                3 arriving this week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search materials by name, SKU, or tags..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <Filter size={20} />
                {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} items selected
                  </span>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
              <div className="flex rounded-lg shadow overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 ${
                    view === 'grid'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Package size={20} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 ${
                    view === 'list'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LayoutList size={20} />
                </button>
              </div>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
              >
                <option value="all">All Qualities</option>
                {qualities.map(quality => (
                  <option key={quality} value={quality}>
                    {quality.charAt(0).toUpperCase() + quality.slice(1)}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as typeof stockStatus)}
              >
                <option value="all">All Stock Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Materials Inventory</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Showing {filteredMaterials.length} of {materials.length} materials
              </span>
            </div>
          </div>

          {view === 'list' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredMaterials.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(filteredMaterials.map(m => m.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                    </th>
                    <th 
                      className="py-3 text-left cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        Material
                        {sortField === 'name' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="py-3 text-left">Category</th>
                    <th className="py-3 text-left">SKU</th>
                    <th 
                      className="py-3 text-right cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('quantity')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Quantity
                        {sortField === 'quantity' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="py-3 text-right cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('unitPrice')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Unit Price
                        {sortField === 'unitPrice' && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="py-3 text-left">Location</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map(material => (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(material.id)}
                          onChange={() => toggleItemSelection(material.id)}
                          className="rounded text-amber-600 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-gray-600">{material.supplier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {material.category}
                        </span>
                      </td>
                      <td className="py-3">{material.sku}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">{material.quantity}</span>
                          <span className="text-sm text-gray-500">{material.unit}</span>
                          {material.quantity <= material.reorderPoint && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-right">${material.unitPrice.toFixed(2)}</td>
                      <td className="py-3">{material.location}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStockStatus(material).class}`}>
                          {getStockStatus(material).label}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 text-gray-600 hover:text-amber-600 rounded">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-amber-600 rounded">
                            <ShoppingCart size={16} />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-red-600 rounded">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMaterials.map(material => (
                <div key={material.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Package className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{material.name}</h3>
                        <p className="text-sm text-gray-600">{material.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStockStatus(material).class}`}>
                        {getStockStatus(material).label}
                      </span>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(material.id)}
                        onChange={() => toggleItemSelection(material.id)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span>{material.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span>{material.quantity} {material.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit Price:</span>
                      <span>${material.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span>{material.location}</span>
                    </div>
                    {material.minimumOrder && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Order:</span>
                        <span>{material.minimumOrder} {material.unit}</span>
                      </div>
                    )}
                    {material.leadTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lead Time:</span>
                        <span>{material.leadTime} days</span>
                      </div>
                    )}
                  </div>

                  {material.tags && material.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {material.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Last Updated: {new Date(material.lastUpdated).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-600 hover:text-amber-600 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-amber-600 rounded">
                        <ShoppingCart size={16} />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-red-600 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add New Material Modal */}
      {showNewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50  ```tsx
      {/* Add New Material Modal */}
      {showNewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Material</h2>
              <button 
                onClick={() => setShowNewItem(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Material Name</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
                      formErrors.name ? 'border-red-500' : ''
                    }`}
                    value={newMaterial.name}
                    onChange={(e) => {
                      setNewMaterial({ ...newMaterial, name: e.target.value });
                      if (formErrors.name) {
                        setFormErrors({ ...formErrors, name: '' });
                      }
                    }}
                    placeholder="Enter material name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
                      formErrors.sku ? 'border-red-500' : ''
                    }`}
                    value={newMaterial.sku}
                    onChange={(e) => {
                      setNewMaterial({ ...newMaterial, sku: e.target.value });
                      if (formErrors.sku) {
                        setFormErrors({ ...formErrors, sku: '' });
                      }
                    }}
                    placeholder="Enter SKU"
                  />
                  {formErrors.sku && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.sku}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select 
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quality</label>
                  <select 
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newMaterial.quality}
                    onChange={(e) => setNewMaterial({ 
                      ...newMaterial, 
                      quality: e.target.value as 'premium' | 'standard' | 'economy' 
                    })}
                  >
                    {qualities.map(quality => (
                      <option key={quality} value={quality}>
                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
                      formErrors.quantity ? 'border-red-500' : ''
                    }`}
                    value={newMaterial.quantity}
                    onChange={(e) => {
                      setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) });
                      if (formErrors.quantity) {
                        setFormErrors({ ...formErrors, quantity: '' });
                      }
                    }}
                    placeholder="Enter quantity"
                  />
                  {formErrors.quantity && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.quantity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <select
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
                      formErrors.unit ? 'border-red-500' : ''
                    }`}
                    value={newMaterial.unit}
                    onChange={(e) => {
                      setNewMaterial({ ...newMaterial, unit: e.target.value });
                      if (formErrors.unit) {
                        setFormErrors({ ...formErrors, unit: '' });
                      }
                    }}
                  >
                    <option value="">Select unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {formErrors.unit && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.unit}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                  <div className="mt-1 relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      className={`block w-full pl-7 pr-3 py-2 border rounded-lg ${
                        formErrors.unitPrice ? 'border-red-500' : ''
                      }`}
                      value={newMaterial.unitPrice}
                      onChange={(e) => {
                        setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) });
                        if (formErrors.unitPrice) {
                          setFormErrors({ ...formErrors, unitPrice: '' });
                        }
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  {formErrors.unitPrice && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.unitPrice}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reorder Point</label>
                  <input
                    type="number"
                    className={`mt-1 block w-full px-3 py-2 border rounded-lg ${
                      formErrors.reorderPoint ? 'border-red-500' : ''
                    }`}
                    value={newMaterial.reorderPoint}
                    onChange={(e) => {
                      setNewMaterial({ ...newMaterial, reorderPoint: Number(e.target.value) });
                      if (formErrors.reorderPoint) {
                        setFormErrors({ ...formErrors, reorderPoint: '' });
                      }
                    }}
                    placeholder="Enter reorder point"
                  />
                  {formErrors.reorderPoint && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.reorderPoint}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  placeholder="Enter material description"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Order</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newMaterial.minimumOrder}
                    onChange={(e) => setNewMaterial({ ...newMaterial, minimumOrder: Number(e.target.value) })}
                    placeholder="Enter minimum order quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lead Time (days)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    value={newMaterial.leadTime}
                    onChange={(e) => setNewMaterial({ ...newMaterial, leadTime: Number(e.target.value) })}
                    placeholder="Enter lead time in days"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter tags separated by commas"
                  value={newMaterial.tags?.join(', ') || ''}
                  onChange={(e) => setNewMaterial({
                    ...newMaterial,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  })}
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewItem(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
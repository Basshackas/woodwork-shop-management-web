// Project Types
export interface Project {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  clientName: string;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  description: string;
  estimatedHours: number;
  actualHours?: number;
  materials: Material[];
  milestones: Milestone[];
  assignedEmployees: string[];
  budget: number;
  actualCost: number;
  notes: ProjectNote[];
  attachments: Attachment[];
  tasks: Task[];
  risks: Risk[];
}

export interface ProjectNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  type: 'general' | 'client' | 'internal';
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  dependencies: string[];
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  probability: 'low' | 'medium' | 'high';
  status: 'identified' | 'mitigated' | 'occurred' | 'resolved';
  mitigationPlan: string;
  owner: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  completed: boolean;
  deliverables: string[];
  dependencies: string[];
}

// Sales Types
export interface SaleTransaction {
  id: string;
  customerName: string;
  items: SaleItem[];
  totalAmount: number;
  date: string;
  paymentStatus: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: string;
  invoiceNumber: string;
  dueDate: string;
  notes: string;
  attachments: Attachment[];
}

export interface SaleItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  discount?: number;
  tax?: number;
}

// Expense Types
export interface Expense {
  id: string;
  name: string;
  description: string;
  category: 'materials' | 'tools' | 'utilities' | 'maintenance' | 'labor' | 'office' | 'travel' | 'other';
  amount: number;
  date: string;
  projectId?: string;
  receipt?: string;
  approved: boolean;
  approvedBy?: string;
  approvedDate?: string;
  paymentMethod: string;
  vendor?: string;
  recurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

// Employee Types
export type EmploymentType = 'salary' | 'wage' | 'contract';
export type EmployeeStatus = 'active' | 'on-leave' | 'terminated' | 'probation';

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  department: string;
  supervisor?: string;
  salary?: number;
  hourlyRate?: number;
  projectIds: string[];
  skills: Skill[];
  certifications: Certification[];
  startDate: string;
  endDate?: string;
  emergencyContact: EmergencyContact;
  documents: EmployeeDocument[];
  performance: PerformanceReview[];
  availability: EmployeeAvailability;
}

export interface PerformanceReview {
  id: string;
  date: string;
  reviewer: string;
  rating: number;
  strengths: string[];
  improvements: string[];
  goals: string[];
  comments: string;
}

export interface EmployeeAvailability {
  schedule: WorkSchedule[];
  timeOff: TimeOff[];
  utilization: number;
}

export interface WorkSchedule {
  day: string;
  shifts: {
    start: string;
    end: string;
  }[];
}

export interface TimeOff {
  id: string;
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  approved: boolean;
  approvedBy?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  yearsOfExperience: number;
  lastUsed: string;
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  licenseNumber?: string;
  status: 'active' | 'expired' | 'pending';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  address?: Address;
}

export interface EmployeeDocument {
  id: string;
  type: 'contract' | 'certification' | 'review' | 'identification' | 'other';
  name: string;
  url: string;
  uploadDate: string;
  expiryDate?: string;
  required: boolean;
  status: 'valid' | 'expired' | 'pending';
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  projectId?: string;
  taskId?: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  approved: boolean;
  approvedBy?: string;
  notes?: string;
  location?: string;
}

// Inventory Types
export interface Material {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  sku: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  reorderPoint: number;
  location: string;
  supplier: string;
  lastRestockDate: string;
  expiryDate?: string;
  quality: 'new' | 'good' | 'fair' | 'poor';
  notes?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  category: string;
  serialNumber?: string;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceHistory: MaintenanceRecord[];
  assignedTo?: string;
  condition: 'new' | 'good' | 'fair' | 'poor';
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry: string;
  location: string;
  manufacturer: string;
  model: string;
  documents: Attachment[];
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  cost: number;
  performedBy: string;
  notes?: string;
  parts?: string[];
}

// Client Types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  address: Address;
  billingAddress?: Address;
  projects: string[];
  notes: string;
  preferredContactMethod: 'email' | 'phone';
  status: 'active' | 'inactive';
  creditLimit?: number;
  paymentTerms?: string;
  taxId?: string;
  contacts: ClientContact[];
  documents: Attachment[];
  interactions: ClientInteraction[];
  paymentHistory: PaymentRecord[];
  invoices: Invoice[];
  balance: number;
  totalBilled: number;
  totalPaid: number;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: 'cash' | 'check' | 'credit_card' | 'bank_transfer' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference: string;
  invoiceId: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
  terms?: string;
  notes?: string;
  attachments?: Attachment[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
  projectId?: string;
}

export interface ClientContact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  primary: boolean;
}

export interface ClientInteraction {
  id: string;
  date: string;
  type: 'meeting' | 'call' | 'email' | 'site-visit';
  summary: string;
  outcome: string;
  followUp?: string;
  participants: string[];
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Document Types
export interface Document {
  id: string;
  type: 'invoice' | 'contract' | 'proposal' | 'work_order' | 'quote' | 'report' | 'other';
  title: string;
  description: string;
  url: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  status: 'draft' | 'review' | 'final' | 'archived' | 'expired';
  version: string;
  relatedTo: {
    type: 'project' | 'client' | 'employee' | 'vendor';
    id: string;
  };
  tags: string[];
  permissions: DocumentPermission[];
  history: DocumentHistory[];
}

export interface DocumentPermission {
  userId: string;
  access: 'view' | 'edit' | 'admin';
}

export interface DocumentHistory {
  id: string;
  date: string;
  userId: string;
  action: 'created' | 'modified' | 'viewed' | 'shared' | 'archived';
  details: string;
}

// Analytics Types
export interface FinancialMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  projectMargins: {
    projectId: string;
    revenue: number;
    costs: number;
    margin: number;
  }[];
  monthlyTrends: {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
    projectCount: number;
  }[];
  forecasts: {
    period: string;
    projectedRevenue: number;
    projectedExpenses: number;
    projectedProfit: number;
    confidence: number;
  }[];
}

export interface PayPeriod {
  id: string;
  startDate: string;
  endDate: string;
  employeeId: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  totalPay: number;
  deductions: Deduction[];
  status: 'pending' | 'approved' | 'paid' | 'void';
  entries: TimeEntry[];
  approvedBy?: string;
  approvedDate?: string;
  paymentDate?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface Deduction {
  id: string;
  type: 'tax' | 'insurance' | 'retirement' | 'other';
  description: string;
  amount: number;
  percentage?: number;
}

import React from 'react';
import { 
  Home, 
  DollarSign, 
  Receipt, 
  Users, 
  Briefcase, 
  Package, 
  Users as Clients, 
  FileText, 
  BarChart3, 
  Settings 
} from 'lucide-react';

type Page = 
  | 'dashboard' 
  | 'sales' 
  | 'expenses' 
  | 'employees' 
  | 'projects'
  | 'inventory'
  | 'clients'
  | 'documents'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-amber-800 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">CraftManager Pro</h1>
      </div>

      <nav className="space-y-2">
        <NavItem
          icon={<Home size={20} />}
          text="Dashboard"
          active={currentPage === 'dashboard'}
          onClick={() => onPageChange('dashboard')}
        />
        <NavItem
          icon={<Briefcase size={20} />}
          text="Projects"
          active={currentPage === 'projects'}
          onClick={() => onPageChange('projects')}
        />
        <NavItem
          icon={<DollarSign size={20} />}
          text="Sales"
          active={currentPage === 'sales'}
          onClick={() => onPageChange('sales')}
        />
        <NavItem
          icon={<Receipt size={20} />}
          text="Expenses"
          active={currentPage === 'expenses'}
          onClick={() => onPageChange('expenses')}
        />
        <NavItem
          icon={<Users size={20} />}
          text="Employees"
          active={currentPage === 'employees'}
          onClick={() => onPageChange('employees')}
        />
        <NavItem
          icon={<Package size={20} />}
          text="Inventory"
          active={currentPage === 'inventory'}
          onClick={() => onPageChange('inventory')}
        />
        <NavItem
          icon={<Clients size={20} />}
          text="Clients"
          active={currentPage === 'clients'}
          onClick={() => onPageChange('clients')}
        />
        <NavItem
          icon={<FileText size={20} />}
          text="Documents"
          active={currentPage === 'documents'}
          onClick={() => onPageChange('documents')}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          text="Analytics"
          active={currentPage === 'analytics'}
          onClick={() => onPageChange('analytics')}
        />
        <NavItem
          icon={<Settings size={20} />}
          text="Settings"
          active={currentPage === 'settings'}
          onClick={() => onPageChange('settings')}
        />
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
        active ? 'bg-amber-700' : 'hover:bg-amber-700/50'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
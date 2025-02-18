import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import { SalesPage } from './pages/SalesPage';
import { ExpensePage } from './pages/ExpensePage';
import { EmployeePage } from './pages/EmployeePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InventoryPage } from './pages/InventoryPage';
import { ClientsPage } from './pages/ClientsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

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

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesPage />;
      case 'expenses':
        return <ExpensePage />;
      case 'employees':
        return <EmployeePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'clients':
        return <ClientsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 ml-64 p-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
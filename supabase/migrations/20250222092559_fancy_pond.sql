/*
  # Initial Schema Setup for Woodworking Shop Management

  1. New Tables
    - `users` - Store user accounts and authentication
    - `projects` - Store project information
    - `clients` - Store client information
    - `materials` - Store inventory materials
    - `employees` - Store employee information
    - `sales` - Store sales transactions
    - `expenses` - Store expense records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Set up appropriate user roles and permissions

  3. Changes
    - Initial schema creation
    - Basic relationships and constraints
    - Default values and timestamps
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  role text CHECK (role IN ('admin', 'manager', 'employee')) NOT NULL DEFAULT 'employee',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_name text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  country text DEFAULT 'USA',
  notes text,
  status text CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  client_id uuid REFERENCES clients(id),
  status text CHECK (status IN ('pending', 'in_progress', 'completed', 'on_hold', 'cancelled')) DEFAULT 'pending',
  priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  start_date date,
  due_date date,
  completed_date date,
  estimated_hours integer,
  actual_hours integer DEFAULT 0,
  budget decimal(10,2),
  actual_cost decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Materials table
CREATE TABLE materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  sku text UNIQUE,
  quantity decimal(10,2) DEFAULT 0,
  unit text NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  reorder_point decimal(10,2) DEFAULT 0,
  location text,
  supplier text,
  last_restock_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Employees table
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text NOT NULL,
  employment_type text CHECK (employment_type IN ('salary', 'wage', 'contract')) NOT NULL,
  status text CHECK (status IN ('active', 'on_leave', 'terminated')) DEFAULT 'active',
  department text,
  salary decimal(10,2),
  hourly_rate decimal(10,2),
  start_date date NOT NULL,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Sales table
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  invoice_number text UNIQUE NOT NULL,
  sale_date date NOT NULL,
  due_date date NOT NULL,
  status text CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')) DEFAULT 'pending',
  subtotal decimal(10,2) NOT NULL,
  tax decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  payment_method text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Sale Items table
CREATE TABLE sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid REFERENCES sales(id) ON DELETE CASCADE,
  material_id uuid REFERENCES materials(id),
  description text NOT NULL,
  quantity decimal(10,2) NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text CHECK (category IN ('materials', 'tools', 'utilities', 'maintenance', 'labor', 'office', 'travel', 'other')) NOT NULL,
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  date date NOT NULL,
  payment_method text,
  receipt_url text,
  project_id uuid REFERENCES projects(id),
  vendor text,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Project assignments table
CREATE TABLE project_assignments (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES users(id),
  PRIMARY KEY (project_id, employee_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Clients policies
CREATE POLICY "Authenticated users can view clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can create clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true);

-- Projects policies
CREATE POLICY "Authenticated users can view projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Materials policies
CREATE POLICY "Authenticated users can view materials"
  ON materials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can create materials"
  ON materials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can update materials"
  ON materials
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_materials_sku ON materials(sku);
CREATE INDEX idx_sales_client_id ON sales(client_id);
CREATE INDEX idx_sales_invoice_number ON sales(invoice_number);
CREATE INDEX idx_expenses_project_id ON expenses(project_id);
CREATE INDEX idx_project_assignments_employee_id ON project_assignments(employee_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
    BEFORE UPDATE ON materials
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_sales_updated_at
    BEFORE UPDATE ON sales
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
    BEFORE UPDATE ON expenses
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
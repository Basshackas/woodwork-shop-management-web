import { supabase } from '../lib/supabase';
import type { Employee } from '../types';
import type { Database } from '../lib/database.types';

type EmployeeRow = Database['public']['Tables']['employees']['Row'];
type EmployeeInsert = Database['public']['Tables']['employees']['Insert'];
type EmployeeUpdate = Database['public']['Tables']['employees']['Update'];

export const employeeService = {
  async getEmployees(): Promise<{ data: Employee[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          assignments:project_assignments(
            project:projects(title, status)
          )
        `)
        .order('name');

      if (error) throw error;

      return { data: data as Employee[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getEmployeeById(id: string): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          assignments:project_assignments(
            project:projects(title, status)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Employee, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createEmployee(employee: Omit<EmployeeInsert, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([employee])
        .select()
        .single();

      if (error) throw error;

      return { data: data as Employee, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateEmployee(id: string, updates: EmployeeUpdate): Promise<{ data: Employee | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Employee, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteEmployee(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
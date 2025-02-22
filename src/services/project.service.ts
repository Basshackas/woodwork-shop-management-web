import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import type { Database } from '../lib/database.types';

type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export const projectService = {
  async getProjects(): Promise<{ data: Project[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name),
          assignments:project_assignments(
            employee:employees(name, role)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data: data as Project[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getProjectById(id: string): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name),
          assignments:project_assignments(
            employee:employees(name, role)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Project, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createProject(project: Omit<ProjectInsert, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;

      return { data: data as Project, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateProject(id: string, updates: ProjectUpdate): Promise<{ data: Project | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Project, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteProject(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async assignEmployee(projectId: string, employeeId: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('project_assignments')
        .insert([{ project_id: projectId, employee_id: employeeId }]);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  async removeEmployee(projectId: string, employeeId: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('project_assignments')
        .delete()
        .eq('project_id', projectId)
        .eq('employee_id', employeeId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
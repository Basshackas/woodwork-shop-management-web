import { supabase } from '../lib/supabase';
import type { Material } from '../types';
import type { Database } from '../lib/database.types';

type MaterialRow = Database['public']['Tables']['materials']['Row'];
type MaterialInsert = Database['public']['Tables']['materials']['Insert'];
type MaterialUpdate = Database['public']['Tables']['materials']['Update'];

export const materialService = {
  async getMaterials(): Promise<{ data: Material[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data: data as Material[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getMaterialById(id: string): Promise<{ data: Material | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Material, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createMaterial(material: Omit<MaterialInsert, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Material | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('materials')
        .insert([material])
        .select()
        .single();

      if (error) throw error;

      return { data: data as Material, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateMaterial(id: string, updates: MaterialUpdate): Promise<{ data: Material | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('materials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Material, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteMaterial(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
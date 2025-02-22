import { supabase } from '../lib/supabase';
import type { Client } from '../types';
import type { Database } from '../lib/database.types';

type ClientRow = Database['public']['Tables']['clients']['Row'];
type ClientInsert = Database['public']['Tables']['clients']['Insert'];
type ClientUpdate = Database['public']['Tables']['clients']['Update'];

export const clientService = {
  async getClients(): Promise<{ data: Client[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data: data as Client[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getClientById(id: string): Promise<{ data: Client | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Client, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createClient(client: Omit<ClientInsert, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Client | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single();

      if (error) throw error;

      return { data: data as Client, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateClient(id: string, updates: ClientUpdate): Promise<{ data: Client | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Client, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteClient(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
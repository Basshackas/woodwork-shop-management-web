import { supabase } from '../lib/supabase';
import type { SaleTransaction } from '../types';
import type { Database } from '../lib/database.types';

type SaleRow = Database['public']['Tables']['sales']['Row'];
type SaleInsert = Database['public']['Tables']['sales']['Insert'];
type SaleUpdate = Database['public']['Tables']['sales']['Update'];

export const saleService = {
  async getSales(): Promise<{ data: SaleTransaction[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          client:clients(name),
          items:sale_items(
            id,
            material:materials(name),
            description,
            quantity,
            unit_price,
            total
          )
        `)
        .order('sale_date', { ascending: false });

      if (error) throw error;

      return { data: data as SaleTransaction[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getSaleById(id: string): Promise<{ data: SaleTransaction | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          client:clients(name),
          items:sale_items(
            id,
            material:materials(name),
            description,
            quantity,
            unit_price,
            total
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as SaleTransaction, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createSale(sale: Omit<SaleInsert, 'id' | 'created_at' | 'updated_at'>, items: any[]): Promise<{ data: SaleTransaction | null; error: Error | null }> {
    try {
      // Start a transaction
      const { data: saleData, error: saleError } = await supabase
        .from('sales')
        .insert([sale])
        .select()
        .single();

      if (saleError) throw saleError;

      // Insert sale items
      const saleItems = items.map(item => ({
        ...item,
        sale_id: saleData.id
      }));

      const { error: itemsError } = await supabase
        .from('sale_items')
        .insert(saleItems);

      if (itemsError) throw itemsError;

      // Get the complete sale with items
      const { data, error } = await supabase
        .from('sales')
        .select(`
          *,
          client:clients(name),
          items:sale_items(
            id,
            material:materials(name),
            description,
            quantity,
            unit_price,
            total
          )
        `)
        .eq('id', saleData.id)
        .single();

      if (error) throw error;

      return { data: data as SaleTransaction, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateSale(id: string, updates: SaleUpdate): Promise<{ data: SaleTransaction | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('sales')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as SaleTransaction, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteSale(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
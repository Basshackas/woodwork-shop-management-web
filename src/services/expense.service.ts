import { supabase } from '../lib/supabase';
import type { Expense } from '../types';
import type { Database } from '../lib/database.types';

type ExpenseRow = Database['public']['Tables']['expenses']['Row'];
type ExpenseInsert = Database['public']['Tables']['expenses']['Insert'];
type ExpenseUpdate = Database['public']['Tables']['expenses']['Update'];

export const expenseService = {
  async getExpenses(): Promise<{ data: Expense[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          *,
          project:projects(title)
        `)
        .order('date', { ascending: false });

      if (error) throw error;

      return { data: data as Expense[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getExpenseById(id: string): Promise<{ data: Expense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          *,
          project:projects(title)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Expense, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async createExpense(expense: Omit<ExpenseInsert, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Expense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;

      return { data: data as Expense, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async updateExpense(id: string, updates: ExpenseUpdate): Promise<{ data: Expense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Expense, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async deleteExpense(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
};
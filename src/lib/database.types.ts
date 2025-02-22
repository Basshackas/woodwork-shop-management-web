export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          company_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string
          notes: string | null
          status: string
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          name: string
          company_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string
          notes?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          company_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string
          notes?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          client_id: string | null
          status: string
          priority: string
          start_date: string | null
          due_date: string | null
          completed_date: string | null
          estimated_hours: number | null
          actual_hours: number
          budget: number | null
          actual_cost: number
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          client_id?: string | null
          status?: string
          priority?: string
          start_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number
          budget?: number | null
          actual_cost?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          client_id?: string | null
          status?: string
          priority?: string
          start_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number
          budget?: number | null
          actual_cost?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      materials: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          sku: string | null
          quantity: number
          unit: string
          unit_price: number
          reorder_point: number
          location: string | null
          supplier: string | null
          last_restock_date: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          sku?: string | null
          quantity?: number
          unit: string
          unit_price: number
          reorder_point?: number
          location?: string | null
          supplier?: string | null
          last_restock_date?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          sku?: string | null
          quantity?: number
          unit?: string
          unit_price?: number
          reorder_point?: number
          location?: string | null
          supplier?: string | null
          last_restock_date?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      employees: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          role: string
          employment_type: string
          status: string
          department: string | null
          salary: number | null
          hourly_rate: number | null
          start_date: string
          end_date: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          role: string
          employment_type: string
          status?: string
          department?: string | null
          salary?: number | null
          hourly_rate?: number | null
          start_date: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          role?: string
          employment_type?: string
          status?: string
          department?: string | null
          salary?: number | null
          hourly_rate?: number | null
          start_date?: string
          end_date?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      sales: {
        Row: {
          id: string
          client_id: string | null
          invoice_number: string
          sale_date: string
          due_date: string
          status: string
          subtotal: number
          tax: number
          total: number
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          client_id?: string | null
          invoice_number: string
          sale_date: string
          due_date: string
          status?: string
          subtotal: number
          tax?: number
          total: number
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          client_id?: string | null
          invoice_number?: string
          sale_date?: string
          due_date?: string
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      sale_items: {
        Row: {
          id: string
          sale_id: string
          material_id: string | null
          description: string
          quantity: number
          unit_price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          sale_id: string
          material_id?: string | null
          description: string
          quantity: number
          unit_price: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          sale_id?: string
          material_id?: string | null
          description?: string
          quantity?: number
          unit_price?: number
          total?: number
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          category: string
          description: string
          amount: number
          date: string
          payment_method: string | null
          receipt_url: string | null
          project_id: string | null
          vendor: string | null
          status: string
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          category: string
          description: string
          amount: number
          date: string
          payment_method?: string | null
          receipt_url?: string | null
          project_id?: string | null
          vendor?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          category?: string
          description?: string
          amount?: number
          date?: string
          payment_method?: string | null
          receipt_url?: string | null
          project_id?: string | null
          vendor?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      project_assignments: {
        Row: {
          project_id: string
          employee_id: string
          assigned_at: string
          assigned_by: string | null
        }
        Insert: {
          project_id: string
          employee_id: string
          assigned_at?: string
          assigned_by?: string | null
        }
        Update: {
          project_id?: string
          employee_id?: string
          assigned_at?: string
          assigned_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
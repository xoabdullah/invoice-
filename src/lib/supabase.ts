import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface InvoiceTemplate {
  id: string;
  user_id: string | null;
  template_name: string;
  template_data: any;
  created_at: string;
  updated_at: string;
}

export async function saveInvoiceTemplate(name: string, data: any): Promise<InvoiceTemplate | null> {
  const { data: template, error } = await supabase
    .from('invoice_templates')
    .insert({
      template_name: name,
      template_data: data,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving template:', error);
    return null;
  }

  return template;
}

export async function loadInvoiceTemplates(): Promise<InvoiceTemplate[]> {
  const { data, error } = await supabase
    .from('invoice_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading templates:', error);
    return [];
  }

  return data || [];
}

export async function deleteInvoiceTemplate(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('invoice_templates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting template:', error);
    return false;
  }

  return true;
}

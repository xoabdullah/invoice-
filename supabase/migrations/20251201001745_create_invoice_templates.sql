/*
  # Create Invoice Templates Table

  1. New Tables
    - `invoice_templates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable - for future auth integration)
      - `template_name` (text)
      - `template_data` (jsonb) - stores the complete invoice data
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `invoice_templates` table
    - Add policies for public access (can be restricted later with auth)
*/

CREATE TABLE IF NOT EXISTS invoice_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  template_name text NOT NULL,
  template_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE invoice_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read templates"
  ON invoice_templates
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert templates"
  ON invoice_templates
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update templates"
  ON invoice_templates
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete templates"
  ON invoice_templates
  FOR DELETE
  TO anon, authenticated
  USING (true);

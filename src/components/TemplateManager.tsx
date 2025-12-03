import { useState, useEffect } from 'react';
import { Save, FolderOpen, Trash2 } from 'lucide-react';
import { InvoiceData } from '../types/invoice';
import { saveInvoiceTemplate, loadInvoiceTemplates, deleteInvoiceTemplate, InvoiceTemplate } from '../lib/supabase';

interface TemplateManagerProps {
  currentInvoice: InvoiceData;
  onLoadTemplate: (invoice: InvoiceData) => void;
}

export default function TemplateManager({ currentInvoice, onLoadTemplate }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    setLoading(true);
    const data = await loadInvoiceTemplates();
    setTemplates(data);
    setLoading(false);
  }

  async function handleSaveTemplate() {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    setSaving(true);
    const result = await saveInvoiceTemplate(templateName, currentInvoice);
    setSaving(false);

    if (result) {
      alert('Template saved successfully!');
      setTemplateName('');
      setShowSaveDialog(false);
      loadTemplates();
    } else {
      alert('Failed to save template');
    }
  }

  async function handleDeleteTemplate(id: string) {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }

    const success = await deleteInvoiceTemplate(id);
    if (success) {
      loadTemplates();
    } else {
      alert('Failed to delete template');
    }
  }

  function handleLoadTemplate(template: InvoiceTemplate) {
    onLoadTemplate(template.template_data);
    setShowLoadDialog(false);
    alert('Template loaded successfully!');
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Template Management</h2>

      <div className="flex gap-4">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save size={20} />
          Save Template
        </button>

        <button
          onClick={() => {
            setShowLoadDialog(true);
            loadTemplates();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FolderOpen size={20} />
          Load Template
        </button>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Save Template</h3>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveTemplate}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setTemplateName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Load Template</h3>

            {loading ? (
              <p className="text-center py-4">Loading templates...</p>
            ) : templates.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No templates saved yet</p>
            ) : (
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{template.template_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(template.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadTemplate(template)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowLoadDialog(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { ScopeOfWork, TermsAndConditions } from '../types/invoice';

interface ScopeAndTermsProps {
  scope: ScopeOfWork;
  terms: TermsAndConditions;
  notes: string;
  onScopeChange: (scope: ScopeOfWork) => void;
  onTermsChange: (terms: TermsAndConditions) => void;
  onNotesChange: (notes: string) => void;
}

export default function ScopeAndTerms({
  scope,
  terms,
  notes,
  onScopeChange,
  onTermsChange,
  onNotesChange,
}: ScopeAndTermsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Scope, Terms & Notes</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scope of Work
          </label>
          <textarea
            value={scope.content}
            onChange={(e) => onScopeChange({ content: e.target.value })}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Enter scope of work details..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Terms & Conditions
          </label>
          <textarea
            value={terms.content}
            onChange={(e) => onTermsChange({ content: e.target.value })}
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Enter terms and conditions..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter any additional notes..."
          />
        </div>
      </div>
    </div>
  );
}

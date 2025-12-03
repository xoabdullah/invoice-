import { Signatures } from '../types/invoice';

interface SignatureSectionProps {
  signatures: Signatures;
  onChange: (signatures: Signatures) => void;
}

export default function SignatureSection({ signatures, onChange }: SignatureSectionProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Signature Lines</h2>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Client Authorization to Begin Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={signatures.clientAuthorizationName}
                onChange={(e) => onChange({ ...signatures, clientAuthorizationName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={signatures.clientAuthorizationDate}
                onChange={(e) => onChange({ ...signatures, clientAuthorizationDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => onChange({ ...signatures, clientAuthorizationDate: today })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Use today's date
          </button>
        </div>

        <div className="border-b pb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Client Satisfaction Confirmation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={signatures.clientSatisfactionName}
                onChange={(e) => onChange({ ...signatures, clientSatisfactionName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={signatures.clientSatisfactionDate}
                onChange={(e) => onChange({ ...signatures, clientSatisfactionDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => onChange({ ...signatures, clientSatisfactionDate: today })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Use today's date
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Contractor Signature</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={signatures.contractorName}
                onChange={(e) => onChange({ ...signatures, contractorName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contractor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={signatures.contractorDate}
                onChange={(e) => onChange({ ...signatures, contractorDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => onChange({ ...signatures, contractorDate: today })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Use today's date
          </button>
        </div>
      </div>
    </div>
  );
}

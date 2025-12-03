import { PricingData, CalculatedPricing } from '../types/invoice';
import { formatCurrency } from '../utils/calculations';

interface PricingSectionProps {
  pricing: PricingData;
  calculated: CalculatedPricing;
  onChange: (pricing: PricingData) => void;
}

export default function PricingSection({ pricing, calculated, onChange }: PricingSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pricing & Calculations</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Materials
            </label>
            <input
              type="number"
              step="0.01"
              value={pricing.materials}
              onChange={(e) => onChange({ ...pricing, materials: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Labor
            </label>
            <input
              type="number"
              step="0.01"
              value={pricing.labor}
              onChange={(e) => onChange({ ...pricing, labor: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={pricing.discountEnabled}
              onChange={(e) => onChange({ ...pricing, discountEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Enable Discount
            </label>
          </div>

          {pricing.discountEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
                </label>
                <select
                  value={pricing.discountType}
                  onChange={(e) => onChange({ ...pricing, discountType: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={pricing.discountValue}
                  onChange={(e) => onChange({ ...pricing, discountValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  Discount: {formatCurrency(calculated.discountAmount)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Type
            </label>
            <select
              value={pricing.taxType}
              onChange={(e) => onChange({ ...pricing, taxType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="GST">GST</option>
              <option value="HST">HST</option>
              <option value="PST">PST</option>
              <option value="VAT">VAT</option>
              <option value="Tax">Tax</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Percentage
            </label>
            <input
              type="number"
              step="0.01"
              value={pricing.taxPercent}
              onChange={(e) => onChange({ ...pricing, taxPercent: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deposit Percentage
            </label>
            <input
              type="number"
              step="0.01"
              value={pricing.depositPercent}
              onChange={(e) => onChange({ ...pricing, depositPercent: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Subtotal:</span>
            <span>{formatCurrency(calculated.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Pre-Tax Price:</span>
            <span>{formatCurrency(calculated.preTaxPrice)}</span>
          </div>
          {calculated.discountEnabled && (
            <>
              <div className="flex justify-between text-sm text-red-600">
                <span className="font-medium">Discount:</span>
                <span>-{formatCurrency(calculated.discountAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Price After Promo:</span>
                <span>{formatCurrency(calculated.priceAfterPromo)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-sm">
            <span className="font-medium">{pricing.taxType} ({pricing.taxPercent}%):</span>
            <span>{formatCurrency(calculated.taxAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>GRAND TOTAL:</span>
            <span>{formatCurrency(calculated.grandTotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-blue-600">
            <span className="font-medium">Deposit Required ({pricing.depositPercent}%):</span>
            <span>{formatCurrency(calculated.depositRequired)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Balance Due:</span>
            <span>{formatCurrency(calculated.balanceDue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

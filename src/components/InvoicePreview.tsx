import { InvoiceData, CalculatedPricing } from '../types/invoice';
import { formatCurrency } from '../utils/calculations';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  calculated: CalculatedPricing;
}

export default function InvoicePreview({ invoice, calculated }: InvoicePreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{invoice.company.name}</h1>
        <p className="text-sm text-gray-600">
          Phone: {invoice.company.phone} | Email: {invoice.company.email}
        </p>
        <p className="text-sm text-gray-600">{invoice.company.website}</p>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">QUOTE</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <p className="mb-1">
            <span className="font-semibold">Quote Number:</span> {invoice.details.quoteNumber}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Date:</span> {invoice.details.date}
          </p>
        </div>
      </div>

      <div className="mb-8 text-sm">
        <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="mb-1">
            <span className="font-semibold">Name:</span> {invoice.customer.name}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Address:</span> {invoice.customer.address}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Phone:</span> {invoice.customer.phone}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Email:</span> {invoice.customer.email}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Project Title:</span> {invoice.customer.projectTitle}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Pricing Breakdown</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">Materials</td>
              <td className="p-3 text-right">{formatCurrency(calculated.materials)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">Labor</td>
              <td className="p-3 text-right">{formatCurrency(calculated.labor)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">Subtotal</td>
              <td className="p-3 text-right">{formatCurrency(calculated.subtotal)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">Pre-Tax Price</td>
              <td className="p-3 text-right">{formatCurrency(calculated.preTaxPrice)}</td>
            </tr>
            {calculated.discountEnabled && (
              <>
                <tr className="border-b border-gray-300 text-red-600">
                  <td className="p-3 font-semibold">
                    Promo Discount ({calculated.discountType === 'percentage' ? `${calculated.discountValue}%` : 'Fixed'})
                  </td>
                  <td className="p-3 text-right">-{formatCurrency(calculated.discountAmount)}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 font-semibold">Price After Promo</td>
                  <td className="p-3 text-right">{formatCurrency(calculated.priceAfterPromo)}</td>
                </tr>
              </>
            )}
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">{calculated.taxType} ({calculated.taxPercent}%)</td>
              <td className="p-3 text-right">{formatCurrency(calculated.taxAmount)}</td>
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="p-3 font-bold text-lg">GRAND TOTAL</td>
              <td className="p-3 text-right font-bold text-lg">{formatCurrency(calculated.grandTotal)}</td>
            </tr>
            <tr className="border-b border-gray-300 text-blue-600">
              <td className="p-3 font-semibold">Deposit Required ({calculated.depositPercent}%)</td>
              <td className="p-3 text-right">{formatCurrency(calculated.depositRequired)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 font-semibold">Balance Due</td>
              <td className="p-3 text-right">{formatCurrency(calculated.balanceDue)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">SCOPE OF WORK</h3>
        <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
          {invoice.scopeOfWork.content}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">TERMS & CONDITIONS</h3>
        <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
          {invoice.terms.content}
        </div>
      </div>

      {invoice.notes && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">NOTES</h3>
          <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
            {invoice.notes}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">SIGNATURES</h3>

        <div className="mb-6">
          <p className="font-semibold mb-2">Client Authorization to Begin Work:</p>
          <div className="border-b-2 border-gray-400 w-full mb-1 h-8"></div>
          <p className="text-sm">{invoice.signatures.clientAuthorizationName || 'Name'}</p>
          <p className="text-sm">Date: {invoice.signatures.clientAuthorizationDate || '_______________'}</p>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Client Satisfaction Confirmation:</p>
          <div className="border-b-2 border-gray-400 w-full mb-1 h-8"></div>
          <p className="text-sm">{invoice.signatures.clientSatisfactionName || 'Name'}</p>
          <p className="text-sm">Date: {invoice.signatures.clientSatisfactionDate || '_______________'}</p>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Contractor Signature:</p>
          <div className="border-b-2 border-gray-400 w-full mb-1 h-8"></div>
          <p className="text-sm">{invoice.signatures.contractorName || 'Name'}</p>
          <p className="text-sm">Date: {invoice.signatures.contractorDate || '_______________'}</p>
        </div>
      </div>
    </div>
  );
}

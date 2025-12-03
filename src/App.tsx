import React, { useState } from 'react';
import { FileDown, Eye, EyeOff } from 'lucide-react';
import { InvoiceData, DEFAULT_SCOPE_OF_WORK, DEFAULT_TERMS } from './types/invoice';
import { calculatePricing } from './utils/calculations';
import { exportToWord } from './utils/wordExport';
import CompanySettings from './components/CompanySettings';
import CustomerDetails from './components/CustomerDetails';
import PricingSection from './components/PricingSection';
import ScopeAndTerms from './components/ScopeAndTerms';
import SignatureSection from './components/SignatureSection';
import InvoicePreview from './components/InvoicePreview';
import TemplateManager from './components/TemplateManager';



function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceData>({
    company: {
      name: 'GTA Painter and Renovation',
      phone: '(416) 123-4567',
      email: 'info@gtapainterandrenovation.ca',
      website: 'https://gtapainterandrenovation.ca/',
    },
    customer: {
      name: '',
      address: '',
      phone: '',
      email: '',
      projectTitle: '',
    },
    details: {
      quoteNumber: `Q${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
    },
    pricing: {
      materials: 0,
      labor: 0,
      discountEnabled: false,
      discountType: 'percentage',
      discountValue: 0,
      taxType: 'HST',
      taxPercent: 13,
      depositPercent: 50,
    },
    scopeOfWork: {
      content: DEFAULT_SCOPE_OF_WORK,
    },
    terms: {
      content: DEFAULT_TERMS,
    },
    signatures: {
      clientAuthorizationName: '',
      clientAuthorizationDate: '',
      clientSatisfactionName: '',
      clientSatisfactionDate: '',
      contractorName: '',
      contractorDate: '',
    },
    notes: '',
  });

  const calculated = calculatePricing(invoice.pricing);

  async function handleExportToWord() {
    try {
      await exportToWord(invoice);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export to Word. Please check the console for details.');
    }
  }

  function handleLoadTemplate(loadedInvoice: InvoiceData) {
    setInvoice(loadedInvoice);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Invoice Maker Pro</h1>
          <p className="text-gray-600">Professional Quote & Invoice Generator for Canada & International</p>
        </header>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md"
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>

          <button
            onClick={handleExportToWord}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <FileDown size={20} />
            Export to Word
          </button>
        </div>

        {showPreview ? (
          <InvoicePreview invoice={invoice} calculated={calculated} />
        ) : (
          <div className="max-w-5xl mx-auto">
            <TemplateManager
              currentInvoice={invoice}
              onLoadTemplate={handleLoadTemplate}
            />

            <CompanySettings
              company={invoice.company}
              onChange={(company) => setInvoice({ ...invoice, company })}
            />

            <CustomerDetails
              customer={invoice.customer}
              details={invoice.details}
              onCustomerChange={(customer) => setInvoice({ ...invoice, customer })}
              onDetailsChange={(details) => setInvoice({ ...invoice, details })}
            />

            <PricingSection
              pricing={invoice.pricing}
              calculated={calculated}
              onChange={(pricing) => setInvoice({ ...invoice, pricing })}
            />

            <ScopeAndTerms
              scope={invoice.scopeOfWork}
              terms={invoice.terms}
              notes={invoice.notes}
              onScopeChange={(scopeOfWork) => setInvoice({ ...invoice, scopeOfWork })}
              onTermsChange={(terms) => setInvoice({ ...invoice, terms })}
              onNotesChange={(notes) => setInvoice({ ...invoice, notes })}
            />

            <SignatureSection
              signatures={invoice.signatures}
              onChange={(signatures) => setInvoice({ ...invoice, signatures })}
            />
          </div>
        )}

        <footer className="text-center mt-12 text-gray-600 text-sm">
          <p>Invoice Maker Pro - @copy rights by Abdullah</p>
          <p className="mt-2">Compatible with all browsers including Safari on iPhone</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

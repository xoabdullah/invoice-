export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  projectTitle: string;
}

export interface InvoiceDetails {
  quoteNumber: string;
  date: string;
}

export interface PricingData {
  materials: number;
  labor: number;
  discountEnabled: boolean;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  taxType: string;
  taxPercent: number;
  depositPercent: number;
}

export interface CalculatedPricing extends PricingData {
  subtotal: number;
  preTaxPrice: number;
  discountAmount: number;
  priceAfterPromo: number;
  taxAmount: number;
  grandTotal: number;
  depositRequired: number;
  balanceDue: number;
}

export interface ScopeOfWork {
  content: string;
}

export interface TermsAndConditions {
  content: string;
}

export interface Signatures {
  clientAuthorizationName: string;
  clientAuthorizationDate: string;
  clientSatisfactionName: string;
  clientSatisfactionDate: string;
  contractorName: string;
  contractorDate: string;
}

export interface InvoiceData {
  company: CompanyInfo;
  customer: CustomerInfo;
  details: InvoiceDetails;
  pricing: PricingData;
  scopeOfWork: ScopeOfWork;
  terms: TermsAndConditions;
  signatures: Signatures;
  notes: string;
}

export const DEFAULT_SCOPE_OF_WORK = `SCOPE OF WORK:

• All furniture, fixtures, and personal items will be moved by the customer prior to work beginning
• All surfaces to be painted will be cleaned and prepped accordingly
• Power washing of exterior surfaces where applicable
• All cracks, holes, and imperfections will be filled with appropriate filler and sanded smooth
• Caulking will be applied where needed for a professional finish
• All floors, furniture, and fixtures will be protected with drop cloths and plastic sheeting
• Ladders and scaffolding will be used as necessary to access all areas safely
• Paint will be applied in accordance with manufacturer's specifications
• Number of coats as specified in quote
• Start date is approximate and subject to weather conditions and project scheduling
• Daily cleanup of work areas
• Final walk-around with client upon completion
• Touch-ups as needed

PAINT SELECTION:
• Benjamin Moore
• Sherwin-Williams
• Behr Premium
• Or customer's choice of quality paint brand

All work will be completed to the highest professional standards.`;

export const DEFAULT_TERMS = `TERMS & CONDITIONS:

1. WORK GUARANTEE: All work is guaranteed for quality and workmanship. Any issues arising from our work will be addressed promptly at no additional charge.

2. EXTRA COSTS: Any additional work beyond the scope outlined above will be quoted separately and requires client approval before proceeding.

3. LEGAL PROTECTION: This quote serves as a legal agreement between the contractor and client. Both parties agree to the terms outlined herein.

4. PHOTO/VIDEO PERMISSION: Client grants permission for contractor to take photos and videos of the project for portfolio and marketing purposes.

5. WITHDRAWAL: Client may withdraw from this agreement within 48 hours of signing. After 48 hours, a 25% cancellation fee applies.

6. AUTHORIZATION: By signing below, the client authorizes the contractor to begin work as outlined in this quote and agrees to the payment terms specified.

PAYMENT TERMS:
• Deposit required to secure project start date
• Progress payments may be required for larger projects
• Final payment due upon completion and client satisfaction
• Accepted payment methods: Cash, Check, E-Transfer, Credit Card

CUSTOMER FOCUSED, QUALITY DRIVEN
We are committed to delivering exceptional results and ensuring your complete satisfaction.`;

import { PricingData, CalculatedPricing } from '../types/invoice';

export function calculatePricing(pricing: PricingData): CalculatedPricing {
  const subtotal = pricing.materials + pricing.labor;
  const preTaxPrice = subtotal;

  let discountAmount = 0;
  if (pricing.discountEnabled) {
    if (pricing.discountType === 'percentage') {
      discountAmount = preTaxPrice * (pricing.discountValue / 100);
    } else {
      discountAmount = pricing.discountValue;
    }
  }

  const priceAfterPromo = preTaxPrice - discountAmount;
  const taxAmount = priceAfterPromo * (pricing.taxPercent / 100);
  const grandTotal = priceAfterPromo + taxAmount;
  const depositRequired = grandTotal * (pricing.depositPercent / 100);
  const balanceDue = grandTotal - depositRequired;

  return {
    ...pricing,
    subtotal,
    preTaxPrice,
    discountAmount,
    priceAfterPromo,
    taxAmount,
    grandTotal,
    depositRequired,
    balanceDue,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
}

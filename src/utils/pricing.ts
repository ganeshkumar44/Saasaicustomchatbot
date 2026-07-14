import type { BillingCycle, PricingPlan } from '@/types/pricing.types';

export function getPlanPriceForCycle(plan: PricingPlan, cycle: BillingCycle): number {
  if (cycle === 'six_month') {
    return plan.six_month_price;
  }
  if (cycle === 'yearly') {
    return plan.yearly_price;
  }
  return plan.monthly_price;
}

export function getPlanSavingForCycle(plan: PricingPlan, cycle: BillingCycle): number {
  if (cycle === 'six_month') {
    return plan.six_month_saving ?? 0;
  }
  if (cycle === 'yearly') {
    return plan.yearly_saving ?? 0;
  }
  return 0;
}

export function getPlanDiscountPercentageForCycle(
  plan: PricingPlan,
  cycle: BillingCycle,
): number {
  if (cycle === 'six_month') {
    return plan.six_month_discount_percentage ?? 0;
  }
  if (cycle === 'yearly') {
    return plan.yearly_discount_percentage ?? 0;
  }
  return 0;
}

export function formatPricingAmount(amount: number, currency = 'INR'): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function billingCycleLabel(cycle: BillingCycle): string {
  if (cycle === 'six_month') {
    return '6 months';
  }
  if (cycle === 'yearly') {
    return 'year';
  }
  return 'month';
}

export function billingCycleShortLabel(cycle: BillingCycle): string {
  if (cycle === 'six_month') {
    return '6 Months';
  }
  if (cycle === 'yearly') {
    return 'Yearly';
  }
  return 'Monthly';
}

export function planCtaLabel(plan: PricingPlan): string {
  if (plan.current_plan) {
    return 'Current Plan';
  }
  if (plan.can_upgrade) {
    return 'Upgrade';
  }
  if (plan.can_downgrade) {
    return 'Downgrade';
  }
  return 'Choose Plan';
}

/** Pick discount % labels for the billing toggle from the first paid plan. */
export function catalogDiscountPercentages(plans: PricingPlan[]): {
  sixMonth: number;
  yearly: number;
} {
  const paid = plans.find(
    (plan) => plan.monthly_price > 0 || plan.six_month_price > 0 || plan.yearly_price > 0,
  );
  return {
    sixMonth: paid?.six_month_discount_percentage ?? 0,
    yearly: paid?.yearly_discount_percentage ?? 0,
  };
}

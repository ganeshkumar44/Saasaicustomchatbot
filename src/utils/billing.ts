import type { BillingPlanCatalogItem } from '@/types/billing.types';

const PLAN_ORDER: Record<string, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  enterprise: 3,
};

export function formatBillingAmount(amount: string | null | undefined): string {
  if (!amount) {
    return '$0.00';
  }

  const parsed = Number.parseFloat(amount);

  if (Number.isNaN(parsed)) {
    return `$${amount}`;
  }

  return `$${parsed.toFixed(2)}`;
}

export function formatBillingCycleLabel(
  billingCycle: string | null | undefined,
): string | null {
  if (!billingCycle) {
    return null;
  }

  const normalized = billingCycle.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  if (normalized === 'free') {
    return 'Free';
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function formatPlanStatusLabel(status: string | null | undefined): string | null {
  if (!status) {
    return null;
  }

  const trimmed = status.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function formatNextBillingDate(
  nextBillingDate: string | null | undefined,
): string | null {
  if (!nextBillingDate) {
    return null;
  }

  const parsed = new Date(nextBillingDate);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPlanPriceLabel(
  price: string | null | undefined,
  billingCycle: string | null | undefined,
): string | null {
  if (!price) {
    return null;
  }

  const amount = formatBillingAmount(price);
  const cycle = billingCycle?.trim().toLowerCase();

  if (!cycle || cycle === 'free') {
    return amount;
  }

  return `${amount}/${cycle}`;
}

export function sortBillingPlans(
  plans: BillingPlanCatalogItem[],
): BillingPlanCatalogItem[] {
  return [...plans].sort((left, right) => {
    const leftOrder = PLAN_ORDER[left.plan_name.toLowerCase()] ?? Number.MAX_SAFE_INTEGER;
    const rightOrder =
      PLAN_ORDER[right.plan_name.toLowerCase()] ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.display_name.localeCompare(right.display_name);
  });
}

export function isCurrentBillingPlan(
  currentPlanName: string | null | undefined,
  planName: string,
): boolean {
  if (!currentPlanName) {
    return false;
  }

  return currentPlanName.trim().toLowerCase() === planName.trim().toLowerCase();
}

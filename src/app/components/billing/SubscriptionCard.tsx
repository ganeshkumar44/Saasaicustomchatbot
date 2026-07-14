import { CurrentPlanCard } from '@/app/components/billing/CurrentPlanCard';
import type { CurrentPricingPlan } from '@/types/pricing.types';

interface SubscriptionCardProps {
  plan: CurrentPricingPlan | null;
  loading?: boolean;
}

/** Alias wrapper for subscription snapshot on the Billing page. */
export function SubscriptionCard({ plan, loading }: SubscriptionCardProps) {
  return <CurrentPlanCard plan={plan} loading={loading} />;
}

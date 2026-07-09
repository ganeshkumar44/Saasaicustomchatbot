import type { RootState } from '@/store/index';
import type { BillingPlanCatalogItem, UserBillingData } from '@/types/billing.types';
import { isCurrentBillingPlan, sortBillingPlans } from '@/utils/billing';

export const selectBillingData = (state: RootState): UserBillingData | null =>
  state.billing.billingData;

export const selectBillingLoading = (state: RootState): boolean => state.billing.loading;

export const selectBillingError = (state: RootState): string | null => state.billing.error;

export const selectBillingPlans = (state: RootState): BillingPlanCatalogItem[] => {
  const plans = state.billing.billingData?.plans ?? [];
  return sortBillingPlans(plans);
};

export const selectCurrentBillingPlanName = (state: RootState): string | null =>
  state.billing.billingData?.plan_name ?? null;

export const selectCurrentBillingPlan = (
  state: RootState,
): BillingPlanCatalogItem | null => {
  const billingData = selectBillingData(state);

  if (!billingData) {
    return null;
  }

  return (
    selectBillingPlans(state).find((plan) =>
      isCurrentBillingPlan(billingData.plan_name, plan.plan_name),
    ) ?? null
  );
};

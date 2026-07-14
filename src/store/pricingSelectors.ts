import type { RootState } from '@/store';

export const selectPricingPlans = (state: RootState) => state.pricing.plans;
export const selectPricingCurrentPlan = (state: RootState) => state.pricing.currentPlan;
export const selectPlanComparison = (state: RootState) => state.pricing.comparison;
export const selectCheckoutPreview = (state: RootState) => state.pricing.checkout;
export const selectPricingOrder = (state: RootState) => state.pricing.order;
export const selectPricingSubscription = (state: RootState) => state.pricing.subscription;
export const selectAutoRenewResult = (state: RootState) => state.pricing.autoRenewResult;
export const selectCancelResult = (state: RootState) => state.pricing.cancelResult;
export const selectSubscriptionStatus = (state: RootState) =>
  state.pricing.subscriptionStatus;
export const selectVerifiedPayment = (state: RootState) => state.pricing.verifiedPayment;
export const selectPaymentHistory = (state: RootState) => state.pricing.paymentHistory;
export const selectPaymentDetail = (state: RootState) => state.pricing.paymentDetail;
export const selectSelectedBillingCycle = (state: RootState) => state.pricing.selectedCycle;
export const selectAutoRenewEnabled = (state: RootState) => state.pricing.autoRenewEnabled;
export const selectPricingLoadingPlans = (state: RootState) => state.pricing.loadingPlans;
export const selectPricingLoadingCurrent = (state: RootState) => state.pricing.loadingCurrent;
export const selectPricingLoadingComparison = (state: RootState) =>
  state.pricing.loadingComparison;
export const selectCheckoutLoading = (state: RootState) => state.pricing.checkoutLoading;
export const selectOrderLoading = (state: RootState) => state.pricing.orderLoading;
export const selectSubscriptionLoading = (state: RootState) =>
  state.pricing.subscriptionLoading;
export const selectAutoRenewLoading = (state: RootState) => state.pricing.autoRenewLoading;
export const selectCancelLoading = (state: RootState) => state.pricing.cancelLoading;
export const selectRetryLoading = (state: RootState) => state.pricing.retryLoading;
export const selectSubscriptionStatusLoading = (state: RootState) =>
  state.pricing.subscriptionStatusLoading;
export const selectVerifyLoading = (state: RootState) => state.pricing.verifyLoading;
export const selectPaymentHistoryLoading = (state: RootState) =>
  state.pricing.paymentHistoryLoading;
export const selectPaymentDetailLoading = (state: RootState) =>
  state.pricing.paymentDetailLoading;
export const selectPricingError = (state: RootState) => state.pricing.error;
export const selectCheckoutError = (state: RootState) => state.pricing.checkoutError;
export const selectOrderError = (state: RootState) => state.pricing.orderError;
export const selectSubscriptionError = (state: RootState) => state.pricing.subscriptionError;
export const selectAutoRenewError = (state: RootState) => state.pricing.autoRenewError;
export const selectCancelError = (state: RootState) => state.pricing.cancelError;
export const selectRetryError = (state: RootState) => state.pricing.retryError;
export const selectSubscriptionStatusError = (state: RootState) =>
  state.pricing.subscriptionStatusError;
export const selectVerifyError = (state: RootState) => state.pricing.verifyError;
export const selectPaymentHistoryError = (state: RootState) =>
  state.pricing.paymentHistoryError;
export const selectPaymentDetailError = (state: RootState) =>
  state.pricing.paymentDetailError;

export const selectPricingLoading = (state: RootState) =>
  state.pricing.loadingPlans ||
  state.pricing.loadingCurrent ||
  state.pricing.loadingComparison;

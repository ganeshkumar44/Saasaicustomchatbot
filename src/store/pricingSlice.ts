import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  cancelPricingSubscription,
  createPricingOrder,
  createPricingSubscription,
  disablePricingAutoRenew,
  enablePricingAutoRenew,
  fetchCurrentPricingPlan,
  fetchPaymentDetail,
  fetchPaymentHistory,
  fetchPlanComparison,
  fetchPricingPlans,
  fetchSubscriptionStatus,
  preparePricingCheckout,
  retryPricingPayment,
  verifyPricingPayment,
} from '@/store/pricingThunk';
import type { BillingCycle, PricingState } from '@/types/pricing.types';

const initialState: PricingState = {
  plans: [],
  currentPlan: null,
  comparison: null,
  checkout: null,
  order: null,
  subscription: null,
  autoRenewResult: null,
  cancelResult: null,
  subscriptionStatus: null,
  verifiedPayment: null,
  paymentHistory: [],
  paymentDetail: null,
  selectedCycle: 'monthly',
  autoRenewEnabled: false,
  loadingPlans: false,
  loadingCurrent: false,
  loadingComparison: false,
  checkoutLoading: false,
  orderLoading: false,
  subscriptionLoading: false,
  autoRenewLoading: false,
  cancelLoading: false,
  retryLoading: false,
  subscriptionStatusLoading: false,
  verifyLoading: false,
  paymentHistoryLoading: false,
  paymentDetailLoading: false,
  error: null,
  checkoutError: null,
  orderError: null,
  subscriptionError: null,
  autoRenewError: null,
  cancelError: null,
  retryError: null,
  subscriptionStatusError: null,
  verifyError: null,
  paymentHistoryError: null,
  paymentDetailError: null,
};

const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    setBillingCycle: (state, action: PayloadAction<BillingCycle>) => {
      state.selectedCycle = action.payload;
    },
    setAutoRenewEnabled: (state, action: PayloadAction<boolean>) => {
      state.autoRenewEnabled = action.payload;
    },
    clearCheckoutPreview: (state) => {
      state.checkout = null;
      state.checkoutError = null;
    },
    clearPricingOrder: (state) => {
      state.order = null;
      state.orderError = null;
      state.subscription = null;
      state.subscriptionError = null;
    },
    clearVerifiedPayment: (state) => {
      state.verifiedPayment = null;
      state.verifyError = null;
    },
    clearPaymentDetail: (state) => {
      state.paymentDetail = null;
      state.paymentDetailError = null;
    },
    clearAutoRenewResult: (state) => {
      state.autoRenewResult = null;
      state.autoRenewError = null;
    },
    clearCancelResult: (state) => {
      state.cancelResult = null;
      state.cancelError = null;
    },
    clearPricingError: (state) => {
      state.error = null;
      state.checkoutError = null;
      state.orderError = null;
      state.subscriptionError = null;
      state.autoRenewError = null;
      state.cancelError = null;
      state.retryError = null;
      state.subscriptionStatusError = null;
      state.verifyError = null;
      state.paymentHistoryError = null;
      state.paymentDetailError = null;
    },
    resetPricingState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricingPlans.pending, (state) => {
        state.loadingPlans = true;
        state.error = null;
      })
      .addCase(fetchPricingPlans.fulfilled, (state, action) => {
        state.loadingPlans = false;
        state.plans = action.payload;
      })
      .addCase(fetchPricingPlans.rejected, (state, action) => {
        state.loadingPlans = false;
        state.error = action.payload ?? 'Failed to load pricing plans.';
      })
      .addCase(fetchCurrentPricingPlan.pending, (state) => {
        state.loadingCurrent = true;
      })
      .addCase(fetchCurrentPricingPlan.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchCurrentPricingPlan.rejected, (state, action) => {
        state.loadingCurrent = false;
        state.error = action.payload ?? 'Failed to load current plan.';
      })
      .addCase(fetchPlanComparison.pending, (state) => {
        state.loadingComparison = true;
      })
      .addCase(fetchPlanComparison.fulfilled, (state, action) => {
        state.loadingComparison = false;
        state.comparison = action.payload;
      })
      .addCase(fetchPlanComparison.rejected, (state, action) => {
        state.loadingComparison = false;
        state.error = action.payload ?? 'Failed to load plan comparison.';
      })
      .addCase(preparePricingCheckout.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = null;
        state.checkout = null;
      })
      .addCase(preparePricingCheckout.fulfilled, (state, action) => {
        state.checkoutLoading = false;
        state.checkout = action.payload;
      })
      .addCase(preparePricingCheckout.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkout = null;
        state.checkoutError = action.payload ?? 'Failed to prepare checkout.';
      })
      .addCase(createPricingOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.order = null;
      })
      .addCase(createPricingOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = action.payload;
      })
      .addCase(createPricingOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.order = null;
        state.orderError = action.payload ?? 'Failed to create payment order.';
      })
      .addCase(createPricingSubscription.pending, (state) => {
        state.subscriptionLoading = true;
        state.subscriptionError = null;
        state.subscription = null;
      })
      .addCase(createPricingSubscription.fulfilled, (state, action) => {
        state.subscriptionLoading = false;
        state.subscription = action.payload;
      })
      .addCase(createPricingSubscription.rejected, (state, action) => {
        state.subscriptionLoading = false;
        state.subscription = null;
        state.subscriptionError =
          action.payload ?? 'Failed to create subscription.';
      })
      .addCase(verifyPricingPayment.pending, (state) => {
        state.verifyLoading = true;
        state.verifyError = null;
        state.verifiedPayment = null;
      })
      .addCase(verifyPricingPayment.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifiedPayment = action.payload;
      })
      .addCase(verifyPricingPayment.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifiedPayment = null;
        state.verifyError = action.payload ?? 'Payment verification failed.';
      })
      .addCase(disablePricingAutoRenew.pending, (state) => {
        state.autoRenewLoading = true;
        state.autoRenewError = null;
      })
      .addCase(disablePricingAutoRenew.fulfilled, (state, action) => {
        state.autoRenewLoading = false;
        state.autoRenewResult = action.payload;
        if (state.currentPlan) {
          state.currentPlan.is_auto_renew = false;
        }
        if (state.subscriptionStatus) {
          state.subscriptionStatus.is_auto_renew = false;
          state.subscriptionStatus.can_cancel = false;
        }
      })
      .addCase(disablePricingAutoRenew.rejected, (state, action) => {
        state.autoRenewLoading = false;
        state.autoRenewError = action.payload ?? 'Failed to disable auto renew.';
      })
      .addCase(enablePricingAutoRenew.pending, (state) => {
        state.autoRenewLoading = true;
        state.autoRenewError = null;
      })
      .addCase(enablePricingAutoRenew.fulfilled, (state, action) => {
        state.autoRenewLoading = false;
        state.autoRenewResult = action.payload;
        state.subscription = action.payload.requires_checkout
          ? {
              subscription_id: action.payload.subscription_id ?? '',
              key: action.payload.key ?? '',
              customer_id: action.payload.customer_id,
              plan_id: action.payload.plan_id ?? 0,
              plan_name: action.payload.plan_name ?? '',
              display_name: action.payload.display_name ?? '',
              billing_cycle: action.payload.billing_cycle ?? 'monthly',
              action: 'upgrade',
              currency: action.payload.currency ?? 'INR',
              amount: action.payload.amount ?? 0,
              total_amount: action.payload.total_amount ?? 0,
              subtotal: action.payload.total_amount ?? 0,
              discount: 0,
              gst_percentage: 0,
              gst_amount: 0,
              auto_renew: true,
            }
          : state.subscription;
        if (state.currentPlan && !action.payload.requires_checkout) {
          state.currentPlan.is_auto_renew = true;
        }
        if (state.subscriptionStatus && !action.payload.requires_checkout) {
          state.subscriptionStatus.is_auto_renew = true;
          state.subscriptionStatus.can_cancel = true;
        }
      })
      .addCase(enablePricingAutoRenew.rejected, (state, action) => {
        state.autoRenewLoading = false;
        state.autoRenewError = action.payload ?? 'Failed to enable auto renew.';
      })
      .addCase(cancelPricingSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
      })
      .addCase(cancelPricingSubscription.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.cancelResult = action.payload;
        if (state.currentPlan) {
          state.currentPlan.is_auto_renew = false;
        }
        if (state.subscriptionStatus) {
          state.subscriptionStatus.is_auto_renew = false;
          state.subscriptionStatus.can_cancel = false;
          state.subscriptionStatus.subscription_status =
            action.payload.subscription_status;
          state.subscriptionStatus.remaining_days =
            action.payload.remaining_days;
        }
      })
      .addCase(cancelPricingSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelError =
          action.payload ?? 'Failed to cancel subscription.';
      })
      .addCase(retryPricingPayment.pending, (state) => {
        state.retryLoading = true;
        state.retryError = null;
        state.order = null;
      })
      .addCase(retryPricingPayment.fulfilled, (state, action) => {
        state.retryLoading = false;
        state.order = action.payload;
      })
      .addCase(retryPricingPayment.rejected, (state, action) => {
        state.retryLoading = false;
        state.retryError = action.payload ?? 'Failed to retry payment.';
      })
      .addCase(fetchSubscriptionStatus.pending, (state) => {
        state.subscriptionStatusLoading = true;
        state.subscriptionStatusError = null;
      })
      .addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
        state.subscriptionStatusLoading = false;
        state.subscriptionStatus = action.payload;
      })
      .addCase(fetchSubscriptionStatus.rejected, (state, action) => {
        state.subscriptionStatusLoading = false;
        state.subscriptionStatusError =
          action.payload ?? 'Failed to load subscription status.';
      })
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.paymentHistoryLoading = true;
        state.paymentHistoryError = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.paymentHistoryLoading = false;
        state.paymentHistory = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.paymentHistoryLoading = false;
        state.paymentHistoryError =
          action.payload ?? 'Failed to load payment history.';
      })
      .addCase(fetchPaymentDetail.pending, (state) => {
        state.paymentDetailLoading = true;
        state.paymentDetailError = null;
      })
      .addCase(fetchPaymentDetail.fulfilled, (state, action) => {
        state.paymentDetailLoading = false;
        state.paymentDetail = action.payload;
      })
      .addCase(fetchPaymentDetail.rejected, (state, action) => {
        state.paymentDetailLoading = false;
        state.paymentDetail = null;
        state.paymentDetailError =
          action.payload ?? 'Failed to load payment details.';
      });
  },
});

export const {
  setBillingCycle,
  setAutoRenewEnabled,
  clearCheckoutPreview,
  clearPricingOrder,
  clearVerifiedPayment,
  clearPaymentDetail,
  clearAutoRenewResult,
  clearCancelResult,
  clearPricingError,
  resetPricingState,
} = pricingSlice.actions;

export default pricingSlice.reducer;

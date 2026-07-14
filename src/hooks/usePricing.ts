import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearAutoRenewResult,
  clearCancelResult,
  clearCheckoutPreview,
  clearPaymentDetail,
  clearPricingError,
  clearPricingOrder,
  clearVerifiedPayment,
  setAutoRenewEnabled,
  setBillingCycle,
} from '@/store/pricingSlice';
import {
  selectAutoRenewEnabled,
  selectAutoRenewError,
  selectAutoRenewLoading,
  selectAutoRenewResult,
  selectCancelError,
  selectCancelLoading,
  selectCancelResult,
  selectCheckoutError,
  selectCheckoutLoading,
  selectCheckoutPreview,
  selectOrderError,
  selectOrderLoading,
  selectPaymentDetail,
  selectPaymentDetailError,
  selectPaymentDetailLoading,
  selectPaymentHistory,
  selectPaymentHistoryError,
  selectPaymentHistoryLoading,
  selectPlanComparison,
  selectPricingCurrentPlan,
  selectPricingError,
  selectPricingLoading,
  selectPricingLoadingPlans,
  selectPricingOrder,
  selectPricingPlans,
  selectPricingSubscription,
  selectRetryError,
  selectRetryLoading,
  selectSelectedBillingCycle,
  selectSubscriptionError,
  selectSubscriptionLoading,
  selectSubscriptionStatus,
  selectSubscriptionStatusError,
  selectSubscriptionStatusLoading,
  selectVerifiedPayment,
  selectVerifyError,
  selectVerifyLoading,
} from '@/store/pricingSelectors';
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
import type {
  AutoRenewData,
  BillingCycle,
  CancelSubscriptionData,
  CreateOrderData,
  CreateSubscriptionData,
  VerifyPaymentData,
  VerifyPaymentRequest,
} from '@/types/pricing.types';

export function usePricing() {
  const dispatch = useAppDispatch();
  const plans = useAppSelector(selectPricingPlans);
  const currentPlan = useAppSelector(selectPricingCurrentPlan);
  const comparison = useAppSelector(selectPlanComparison);
  const checkout = useAppSelector(selectCheckoutPreview);
  const order = useAppSelector(selectPricingOrder);
  const subscription = useAppSelector(selectPricingSubscription);
  const autoRenewResult = useAppSelector(selectAutoRenewResult);
  const cancelResult = useAppSelector(selectCancelResult);
  const subscriptionStatus = useAppSelector(selectSubscriptionStatus);
  const verifiedPayment = useAppSelector(selectVerifiedPayment);
  const paymentHistory = useAppSelector(selectPaymentHistory);
  const paymentDetail = useAppSelector(selectPaymentDetail);
  const selectedCycle = useAppSelector(selectSelectedBillingCycle);
  const autoRenewEnabled = useAppSelector(selectAutoRenewEnabled);
  const loading = useAppSelector(selectPricingLoading);
  const loadingPlans = useAppSelector(selectPricingLoadingPlans);
  const checkoutLoading = useAppSelector(selectCheckoutLoading);
  const orderLoading = useAppSelector(selectOrderLoading);
  const subscriptionLoading = useAppSelector(selectSubscriptionLoading);
  const autoRenewLoading = useAppSelector(selectAutoRenewLoading);
  const cancelLoading = useAppSelector(selectCancelLoading);
  const retryLoading = useAppSelector(selectRetryLoading);
  const subscriptionStatusLoading = useAppSelector(selectSubscriptionStatusLoading);
  const verifyLoading = useAppSelector(selectVerifyLoading);
  const paymentHistoryLoading = useAppSelector(selectPaymentHistoryLoading);
  const paymentDetailLoading = useAppSelector(selectPaymentDetailLoading);
  const error = useAppSelector(selectPricingError);
  const checkoutError = useAppSelector(selectCheckoutError);
  const orderError = useAppSelector(selectOrderError);
  const subscriptionError = useAppSelector(selectSubscriptionError);
  const autoRenewError = useAppSelector(selectAutoRenewError);
  const cancelError = useAppSelector(selectCancelError);
  const retryError = useAppSelector(selectRetryError);
  const subscriptionStatusError = useAppSelector(selectSubscriptionStatusError);
  const verifyError = useAppSelector(selectVerifyError);
  const paymentHistoryError = useAppSelector(selectPaymentHistoryError);
  const paymentDetailError = useAppSelector(selectPaymentDetailError);

  useEffect(() => {
    void dispatch(fetchPricingPlans());
    void dispatch(fetchCurrentPricingPlan());
    void dispatch(fetchPlanComparison());
    void dispatch(fetchPaymentHistory());
    void dispatch(fetchSubscriptionStatus());
  }, [dispatch]);

  const refresh = useCallback(() => {
    void dispatch(fetchPricingPlans());
    void dispatch(fetchCurrentPricingPlan());
    void dispatch(fetchPlanComparison());
    void dispatch(fetchPaymentHistory());
    void dispatch(fetchSubscriptionStatus());
  }, [dispatch]);

  const changeCycle = useCallback(
    (cycle: BillingCycle) => {
      dispatch(setBillingCycle(cycle));
    },
    [dispatch],
  );

  const setAutoRenew = useCallback(
    (enabled: boolean) => {
      dispatch(setAutoRenewEnabled(enabled));
    },
    [dispatch],
  );

  const openCheckout = useCallback(
    async (planId: number, billingCycle?: BillingCycle) => {
      const cycle = billingCycle ?? selectedCycle;
      const result = await dispatch(
        preparePricingCheckout({
          plan_id: planId,
          billing_cycle: cycle,
        }),
      );
      return preparePricingCheckout.fulfilled.match(result);
    },
    [dispatch, selectedCycle],
  );

  const createOrder = useCallback(
    async (
      planId: number,
      billingCycle?: BillingCycle,
    ): Promise<CreateOrderData | null> => {
      const cycle = billingCycle ?? selectedCycle;
      const result = await dispatch(
        createPricingOrder({
          plan_id: planId,
          billing_cycle: cycle,
        }),
      );
      if (createPricingOrder.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch, selectedCycle],
  );

  const createSubscription = useCallback(
    async (
      planId: number,
      billingCycle?: BillingCycle,
    ): Promise<CreateSubscriptionData | null> => {
      const cycle = billingCycle ?? selectedCycle;
      const result = await dispatch(
        createPricingSubscription({
          plan_id: planId,
          billing_cycle: cycle,
          auto_renew: true,
        }),
      );
      if (createPricingSubscription.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch, selectedCycle],
  );

  const verifyPayment = useCallback(
    async (payload: VerifyPaymentRequest): Promise<VerifyPaymentData | null> => {
      const result = await dispatch(verifyPricingPayment(payload));
      if (verifyPricingPayment.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const disableAutoRenew = useCallback(
    async (subscriptionId?: string | null): Promise<AutoRenewData | null> => {
      const result = await dispatch(
        disablePricingAutoRenew(
          subscriptionId ? { subscription_id: subscriptionId } : {},
        ),
      );
      if (disablePricingAutoRenew.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const enableAutoRenew = useCallback(async (): Promise<AutoRenewData | null> => {
    const result = await dispatch(enablePricingAutoRenew());
    if (enablePricingAutoRenew.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch]);

  const cancelSubscription = useCallback(
    async (subscriptionId?: string | null): Promise<CancelSubscriptionData | null> => {
      const result = await dispatch(
        cancelPricingSubscription(
          subscriptionId ? { subscription_id: subscriptionId } : {},
        ),
      );
      if (cancelPricingSubscription.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const retryFailedPayment = useCallback(
    async (paymentTransactionId: number): Promise<CreateOrderData | null> => {
      const result = await dispatch(
        retryPricingPayment({ payment_transaction_id: paymentTransactionId }),
      );
      if (retryPricingPayment.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const loadPaymentDetail = useCallback(
    async (paymentId: number) => {
      const result = await dispatch(fetchPaymentDetail(paymentId));
      return fetchPaymentDetail.fulfilled.match(result);
    },
    [dispatch],
  );

  const closeCheckout = useCallback(() => {
    dispatch(clearCheckoutPreview());
    dispatch(clearPricingOrder());
  }, [dispatch]);

  const clearVerify = useCallback(() => {
    dispatch(clearVerifiedPayment());
  }, [dispatch]);

  const clearDetail = useCallback(() => {
    dispatch(clearPaymentDetail());
  }, [dispatch]);

  const clearAutoRenew = useCallback(() => {
    dispatch(clearAutoRenewResult());
  }, [dispatch]);

  const clearCancel = useCallback(() => {
    dispatch(clearCancelResult());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearPricingError());
  }, [dispatch]);

  return {
    plans,
    currentPlan,
    comparison,
    checkout,
    order,
    subscription,
    autoRenewResult,
    cancelResult,
    subscriptionStatus,
    verifiedPayment,
    paymentHistory,
    paymentDetail,
    selectedCycle,
    autoRenewEnabled,
    loading,
    loadingPlans,
    checkoutLoading,
    orderLoading,
    subscriptionLoading,
    autoRenewLoading,
    cancelLoading,
    retryLoading,
    subscriptionStatusLoading,
    verifyLoading,
    paymentHistoryLoading,
    paymentDetailLoading,
    error,
    checkoutError,
    orderError,
    subscriptionError,
    autoRenewError,
    cancelError,
    retryError,
    subscriptionStatusError,
    verifyError,
    paymentHistoryError,
    paymentDetailError,
    refresh,
    changeCycle,
    setAutoRenew,
    openCheckout,
    createOrder,
    createSubscription,
    verifyPayment,
    disableAutoRenew,
    enableAutoRenew,
    cancelSubscription,
    retryFailedPayment,
    loadPaymentDetail,
    closeCheckout,
    clearVerify,
    clearDetail,
    clearAutoRenew,
    clearCancel,
    clearError,
  };
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  cancelSubscription,
  createBillingOrder,
  createBillingSubscription,
  disableAutoRenew,
  enableAutoRenew,
  getCurrentPricingPlan,
  getPaymentById,
  getPaymentHistory,
  getPlanComparison,
  getPricingPlans,
  getSubscriptionStatus,
  prepareCheckout,
  retryPayment,
  verifyBillingPayment,
} from '@/services/pricing.service';
import type {
  AutoRenewData,
  AutoRenewRequest,
  CancelSubscriptionData,
  CancelSubscriptionRequest,
  CheckoutPreview,
  CheckoutRequest,
  CreateOrderData,
  CreateOrderRequest,
  CreateSubscriptionData,
  CreateSubscriptionRequest,
  CurrentPricingPlan,
  PaymentHistoryItem,
  PlanComparisonData,
  PricingPlan,
  RetryPaymentRequest,
  SubscriptionStatusData,
  VerifyPaymentData,
  VerifyPaymentRequest,
} from '@/types/pricing.types';
import { getApiErrorMessage } from '@/utils/apiError';

export const fetchPricingPlans = createAsyncThunk<
  PricingPlan[],
  void,
  { rejectValue: string }
>('pricing/fetchPlans', async (_, { rejectWithValue }) => {
  try {
    const response = await getPricingPlans();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchCurrentPricingPlan = createAsyncThunk<
  CurrentPricingPlan,
  void,
  { rejectValue: string }
>('pricing/fetchCurrentPlan', async (_, { rejectWithValue }) => {
  try {
    const response = await getCurrentPricingPlan();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchPlanComparison = createAsyncThunk<
  PlanComparisonData,
  void,
  { rejectValue: string }
>('pricing/fetchComparison', async (_, { rejectWithValue }) => {
  try {
    const response = await getPlanComparison();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const preparePricingCheckout = createAsyncThunk<
  CheckoutPreview,
  CheckoutRequest,
  { rejectValue: string }
>('pricing/prepareCheckout', async (payload, { rejectWithValue }) => {
  try {
    const response = await prepareCheckout(payload);
    return response.checkout;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const createPricingOrder = createAsyncThunk<
  CreateOrderData,
  CreateOrderRequest,
  { rejectValue: string }
>('pricing/createOrder', async (payload, { rejectWithValue }) => {
  try {
    const response = await createBillingOrder(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const createPricingSubscription = createAsyncThunk<
  CreateSubscriptionData,
  CreateSubscriptionRequest,
  { rejectValue: string }
>('pricing/createSubscription', async (payload, { rejectWithValue }) => {
  try {
    const response = await createBillingSubscription(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const verifyPricingPayment = createAsyncThunk<
  VerifyPaymentData,
  VerifyPaymentRequest,
  { rejectValue: string }
>('pricing/verifyPayment', async (payload, { rejectWithValue }) => {
  try {
    const response = await verifyBillingPayment(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const disablePricingAutoRenew = createAsyncThunk<
  AutoRenewData,
  AutoRenewRequest | void,
  { rejectValue: string }
>('pricing/disableAutoRenew', async (payload, { rejectWithValue }) => {
  try {
    const response = await disableAutoRenew(payload ?? {});
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const enablePricingAutoRenew = createAsyncThunk<
  AutoRenewData,
  void,
  { rejectValue: string }
>('pricing/enableAutoRenew', async (_, { rejectWithValue }) => {
  try {
    const response = await enableAutoRenew();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const cancelPricingSubscription = createAsyncThunk<
  CancelSubscriptionData,
  CancelSubscriptionRequest | void,
  { rejectValue: string }
>('pricing/cancelSubscription', async (payload, { rejectWithValue }) => {
  try {
    const response = await cancelSubscription(payload ?? {});
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const retryPricingPayment = createAsyncThunk<
  CreateOrderData,
  RetryPaymentRequest,
  { rejectValue: string }
>('pricing/retryPayment', async (payload, { rejectWithValue }) => {
  try {
    const response = await retryPayment(payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchSubscriptionStatus = createAsyncThunk<
  SubscriptionStatusData,
  void,
  { rejectValue: string }
>('pricing/fetchSubscriptionStatus', async (_, { rejectWithValue }) => {
  try {
    const response = await getSubscriptionStatus();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchPaymentHistory = createAsyncThunk<
  PaymentHistoryItem[],
  void,
  { rejectValue: string }
>('pricing/fetchPaymentHistory', async (_, { rejectWithValue }) => {
  try {
    const response = await getPaymentHistory();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchPaymentDetail = createAsyncThunk<
  PaymentHistoryItem,
  number,
  { rejectValue: string }
>('pricing/fetchPaymentDetail', async (paymentId, { rejectWithValue }) => {
  try {
    const response = await getPaymentById(paymentId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

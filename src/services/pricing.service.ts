import { apiClient } from '@/api/axios';
import type {
  AutoRenewRequest,
  AutoRenewSuccessResponse,
  CancelSubscriptionRequest,
  CancelSubscriptionSuccessResponse,
  CheckoutRequest,
  CheckoutSuccessResponse,
  CreateOrderRequest,
  CreateOrderSuccessResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionSuccessResponse,
  CurrentPricingPlanSuccessResponse,
  PaymentDetailSuccessResponse,
  PaymentHistorySuccessResponse,
  PlanComparisonSuccessResponse,
  PricingPlansSuccessResponse,
  RetryPaymentRequest,
  RetryPaymentSuccessResponse,
  SubscriptionStatusSuccessResponse,
  VerifyPaymentRequest,
  VerifyPaymentSuccessResponse,
} from '@/types/pricing.types';

export async function getPricingPlans(): Promise<PricingPlansSuccessResponse> {
  const response = await apiClient.get<PricingPlansSuccessResponse>('/v1/billing/plans');
  return response.data;
}

export async function getCurrentPricingPlan(): Promise<CurrentPricingPlanSuccessResponse> {
  const response = await apiClient.get<CurrentPricingPlanSuccessResponse>(
    '/v1/billing/current-plan',
  );
  return response.data;
}

export async function getPlanComparison(): Promise<PlanComparisonSuccessResponse> {
  const response = await apiClient.get<PlanComparisonSuccessResponse>(
    '/v1/billing/plan-comparison',
  );
  return response.data;
}

export async function prepareCheckout(
  payload: CheckoutRequest,
): Promise<CheckoutSuccessResponse> {
  const response = await apiClient.post<CheckoutSuccessResponse>(
    '/v1/billing/checkout',
    payload,
  );
  return response.data;
}

export async function createBillingOrder(
  payload: CreateOrderRequest,
): Promise<CreateOrderSuccessResponse> {
  const response = await apiClient.post<CreateOrderSuccessResponse>(
    '/v1/billing/create-order',
    payload,
  );
  return response.data;
}

export async function createBillingSubscription(
  payload: CreateSubscriptionRequest,
): Promise<CreateSubscriptionSuccessResponse> {
  const response = await apiClient.post<CreateSubscriptionSuccessResponse>(
    '/v1/billing/create-subscription',
    payload,
  );
  return response.data;
}

export async function verifyBillingPayment(
  payload: VerifyPaymentRequest,
): Promise<VerifyPaymentSuccessResponse> {
  const response = await apiClient.post<VerifyPaymentSuccessResponse>(
    '/v1/billing/verify-payment',
    payload,
  );
  return response.data;
}

export async function disableAutoRenew(
  payload: AutoRenewRequest = {},
): Promise<AutoRenewSuccessResponse> {
  const response = await apiClient.post<AutoRenewSuccessResponse>(
    '/v1/billing/disable-auto-renew',
    payload,
  );
  return response.data;
}

export async function enableAutoRenew(): Promise<AutoRenewSuccessResponse> {
  const response = await apiClient.post<AutoRenewSuccessResponse>(
    '/v1/billing/enable-auto-renew',
  );
  return response.data;
}

export async function cancelSubscription(
  payload: CancelSubscriptionRequest = {},
): Promise<CancelSubscriptionSuccessResponse> {
  const response = await apiClient.post<CancelSubscriptionSuccessResponse>(
    '/v1/billing/cancel-subscription',
    payload,
  );
  return response.data;
}

export async function retryPayment(
  payload: RetryPaymentRequest,
): Promise<RetryPaymentSuccessResponse> {
  const response = await apiClient.post<RetryPaymentSuccessResponse>(
    '/v1/billing/retry-payment',
    payload,
  );
  return response.data;
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusSuccessResponse> {
  const response = await apiClient.get<SubscriptionStatusSuccessResponse>(
    '/v1/billing/subscription-status',
  );
  return response.data;
}

export async function getPaymentHistory(): Promise<PaymentHistorySuccessResponse> {
  const response = await apiClient.get<PaymentHistorySuccessResponse>(
    '/v1/billing/payment-history',
  );
  return response.data;
}

export async function getPaymentById(
  paymentId: number,
): Promise<PaymentDetailSuccessResponse> {
  const response = await apiClient.get<PaymentDetailSuccessResponse>(
    `/v1/billing/payment/${paymentId}`,
  );
  return response.data;
}

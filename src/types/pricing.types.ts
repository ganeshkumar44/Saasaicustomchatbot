/** Pricing / checkout types for /v1/billing/* APIs */

export type BillingCycle = 'monthly' | 'six_month' | 'yearly';

export type CheckoutAction = 'upgrade' | 'downgrade' | 'switch';

export interface PricingPlan {
  plan_id: number;
  id: number;
  plan_name: string;
  display_name: string;
  description: string | null;
  monthly_price: number;
  six_month_price: number;
  yearly_price: number;
  six_month_discount_percentage: number;
  yearly_discount_percentage: number;
  six_month_saving: number;
  yearly_saving: number;
  currency: string;
  chatbot_limit: number;
  website_message_limit: number | null;
  playground_message_limit: number | null;
  website_message_unlimited: boolean;
  playground_message_unlimited: boolean;
  features: string[];
  display_order: number;
  is_active: boolean;
  current_plan: boolean;
  recommended: boolean;
  can_upgrade: boolean;
  can_downgrade: boolean;
}

export interface PricingPlansSuccessResponse {
  success: true;
  data: PricingPlan[];
}

export interface CurrentPricingPlan {
  user_id: number;
  plan_id: number | null;
  plan_name: string;
  display_name: string;
  subscription_status: string;
  billing_cycle: string | null;
  subscription_start: string | null;
  subscription_end: string | null;
  next_billing_date: string | null;
  is_auto_renew: boolean;
  remaining_days: number | null;
  is_expired: boolean;
  razorpay_subscription_id: string | null;
  website_message_limit: number | null;
  playground_message_limit: number | null;
  chatbot_limit: number;
  website_message_unlimited: boolean;
  playground_message_unlimited: boolean;
  currency: string | null;
  monthly_price: number | null;
  current_price: number | null;
  current_billing: number | null;
  created_chatbots_count: number;
  remaining_chatbots: number | null;
}

export interface CurrentPricingPlanSuccessResponse {
  success: true;
  data: CurrentPricingPlan;
}

export interface CheckoutRequest {
  plan_id: number;
  billing_cycle: BillingCycle;
}

export interface CheckoutPreview {
  plan_id: number;
  plan_name: string;
  display_name: string;
  billing_cycle: BillingCycle | string;
  action: CheckoutAction;
  price: number;
  currency: string;
  subtotal: number;
  discount: number;
  discount_percentage: number;
  saving: number;
  list_price: number;
  gst_percentage: number;
  gst_amount: number;
  total_amount: number;
  chatbot_limit: number;
  website_message_limit: number | null;
  playground_message_limit: number | null;
  features: string[];
}

export interface CheckoutSuccessResponse {
  success: true;
  message: string | null;
  checkout: CheckoutPreview;
}

export interface PlanComparisonValue {
  plan_id: number;
  plan_name: string;
  display_name: string;
  value: string | boolean | number | null;
}

export interface PlanComparisonRow {
  feature_key: string;
  feature_label: string;
  values: PlanComparisonValue[];
}

export interface PlanComparisonPlanHeader {
  plan_id: number;
  plan_name: string;
  display_name: string;
  recommended: boolean;
  current_plan: boolean;
  display_order: number;
}

export interface PlanComparisonData {
  plans: PlanComparisonPlanHeader[];
  rows: PlanComparisonRow[];
}

export interface PlanComparisonSuccessResponse {
  success: true;
  data: PlanComparisonData;
}

export interface CreateOrderRequest {
  plan_id: number;
  billing_cycle: BillingCycle;
}

export interface CreateOrderData {
  order_id: string;
  key: string;
  amount: number;
  currency: string;
  plan_id: number;
  plan_name: string;
  display_name: string;
  billing_cycle: BillingCycle | string;
  action: CheckoutAction;
  subtotal: number;
  discount: number;
  gst_percentage: number;
  gst_amount: number;
  total_amount: number;
}

export interface CreateOrderSuccessResponse {
  success: true;
  message: string | null;
  order_id: string;
  key: string;
  amount: number;
  currency: string;
  plan_name: string;
  billing_cycle: BillingCycle | string;
  data: CreateOrderData;
}

export interface RazorpayPaymentSuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature: string;
}

export interface VerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_signature: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
}

export interface CreateSubscriptionRequest {
  plan_id: number;
  billing_cycle: BillingCycle;
  auto_renew: boolean;
}

export interface CreateSubscriptionData {
  subscription_id: string;
  key: string;
  customer_id: string | null;
  plan_id: number;
  plan_name: string;
  display_name: string;
  billing_cycle: BillingCycle | string;
  action: CheckoutAction;
  currency: string;
  amount: number;
  total_amount: number;
  subtotal: number;
  discount: number;
  gst_percentage: number;
  gst_amount: number;
  auto_renew: boolean;
}

export interface CreateSubscriptionSuccessResponse {
  success: true;
  message: string | null;
  subscription_id: string;
  key: string;
  data: CreateSubscriptionData;
}

export interface AutoRenewRequest {
  subscription_id?: string | null;
}

export interface AutoRenewData {
  subscription_id: string | null;
  is_auto_renew: boolean;
  requires_checkout: boolean;
  mode: string | null;
  key: string | null;
  plan_id: number | null;
  plan_name: string | null;
  display_name: string | null;
  billing_cycle: string | null;
  subscription_end: string | null;
  next_billing_date: string | null;
  amount: number | null;
  currency: string | null;
  customer_id: string | null;
  total_amount: number | null;
}

export interface AutoRenewSuccessResponse {
  success: true;
  message: string | null;
  data: AutoRenewData;
}

export interface RazorpayPaymentFailurePayload {
  code?: string;
  description?: string;
  reason?: string;
  source?: string;
  step?: string;
  metadata?: Record<string, string>;
}

export interface VerifyPaymentData {
  payment_id: number;
  gateway_order_id: string | null;
  gateway_payment_id: string | null;
  gateway_subscription_id: string | null;
  status: string;
  plan_id: number;
  plan_name: string;
  display_name: string;
  billing_cycle: BillingCycle | string;
  action: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_type: string | null;
  subscription_status: string;
  subscription_start: string | null;
  subscription_end: string | null;
  next_billing_date: string | null;
  remaining_days: number | null;
  is_auto_renew: boolean;
  already_verified: boolean;
}

export interface VerifyPaymentSuccessResponse {
  success: true;
  message: string | null;
  data: VerifyPaymentData;
}

export interface PaymentHistoryItem {
  id: number;
  plan_id: number;
  plan_name: string | null;
  gateway: string;
  gateway_order_id: string | null;
  gateway_payment_id: string | null;
  gateway_subscription_id: string | null;
  amount: string;
  currency: string;
  billing_cycle: string;
  payment_method: string | null;
  payment_type: string;
  retry_of_payment_id?: number | null;
  status: string;
  failure_reason: string | null;
  transaction_date: string;
  created_at: string;
}

export interface PaymentHistorySuccessResponse {
  success: true;
  data: PaymentHistoryItem[];
}

export interface PaymentDetailSuccessResponse {
  success: true;
  message: string | null;
  data: PaymentHistoryItem;
}

export interface CancelSubscriptionRequest {
  subscription_id?: string | null;
}

export interface CancelSubscriptionData {
  subscription_id: string | null;
  is_auto_renew: boolean;
  subscription_status: string;
  subscription_end: string | null;
  next_billing_date: string | null;
  remaining_days: number | null;
}

export interface CancelSubscriptionSuccessResponse {
  success: true;
  message: string | null;
  data: CancelSubscriptionData;
}

export interface RetryPaymentRequest {
  payment_transaction_id: number;
}

export interface RetryPaymentSuccessResponse {
  success: true;
  message: string | null;
  order_id: string;
  key: string;
  amount: number;
  currency: string;
  plan_name: string;
  billing_cycle: string;
  data: CreateOrderData;
}

export interface SubscriptionStatusData {
  user_id: number;
  plan_id: number | null;
  plan_name: string;
  display_name: string;
  subscription_status: string;
  is_auto_renew: boolean;
  razorpay_subscription_id: string | null;
  billing_cycle: string | null;
  subscription_start: string | null;
  subscription_end: string | null;
  next_billing_date: string | null;
  remaining_days: number | null;
  is_expired: boolean;
  can_cancel: boolean;
  can_retry_payment: boolean;
}

export interface SubscriptionStatusSuccessResponse {
  success: true;
  message: string | null;
  data: SubscriptionStatusData;
}

export interface PricingState {
  plans: PricingPlan[];
  currentPlan: CurrentPricingPlan | null;
  comparison: PlanComparisonData | null;
  checkout: CheckoutPreview | null;
  order: CreateOrderData | null;
  subscription: CreateSubscriptionData | null;
  autoRenewResult: AutoRenewData | null;
  cancelResult: CancelSubscriptionData | null;
  subscriptionStatus: SubscriptionStatusData | null;
  verifiedPayment: VerifyPaymentData | null;
  paymentHistory: PaymentHistoryItem[];
  paymentDetail: PaymentHistoryItem | null;
  selectedCycle: BillingCycle;
  autoRenewEnabled: boolean;
  loadingPlans: boolean;
  loadingCurrent: boolean;
  loadingComparison: boolean;
  checkoutLoading: boolean;
  orderLoading: boolean;
  subscriptionLoading: boolean;
  autoRenewLoading: boolean;
  cancelLoading: boolean;
  retryLoading: boolean;
  subscriptionStatusLoading: boolean;
  verifyLoading: boolean;
  paymentHistoryLoading: boolean;
  paymentDetailLoading: boolean;
  error: string | null;
  checkoutError: string | null;
  orderError: string | null;
  subscriptionError: string | null;
  autoRenewError: string | null;
  cancelError: string | null;
  retryError: string | null;
  subscriptionStatusError: string | null;
  verifyError: string | null;
  paymentHistoryError: string | null;
  paymentDetailError: string | null;
}

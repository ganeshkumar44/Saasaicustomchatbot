export interface BillingPlanCatalogItem {
  plan_name: string;
  display_name: string;
  price: string | null;
  billing_cycle: string | null;
  chatbot_limit: number;
  features: string[];
  status: string;
  is_popular: boolean;
}

export interface UserBillingData {
  plan_name: string;
  status: string;
  current_billing: string;
  next_billing_date: string | null;
  billing_cycle: string | null;
  plan_price: string | null;
  chatbot_limit: number;
  plans: BillingPlanCatalogItem[];
}

export interface UserBillingPlansResponse {
  success: true;
  message: string;
  data: UserBillingData;
}

export interface BillingState {
  billingData: UserBillingData | null;
  loading: boolean;
  error: string | null;
}

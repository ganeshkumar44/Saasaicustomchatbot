import { apiClient } from '@/api/axios';
import type { UserBillingPlansResponse } from '@/types/billing.types';

export async function getUserBillingPlans(): Promise<UserBillingPlansResponse> {
  const response = await apiClient.get<UserBillingPlansResponse>('/v1/user/plans');
  return response.data;
}

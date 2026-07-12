import { apiClient } from '@/api/axios';
import type { ChatbotUsageSuccessResponse } from '@/types/subscription.types';

export async function getChatbotSubscriptionUsage(
  chatbotId: number,
): Promise<ChatbotUsageSuccessResponse> {
  const response = await apiClient.get<ChatbotUsageSuccessResponse>(
    `/v1/subscription/usage/${chatbotId}`,
  );
  return response.data;
}

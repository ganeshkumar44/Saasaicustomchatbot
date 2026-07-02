import { apiClient } from '@/api/axios';
import type { RecentConversationsResponse } from '@/types/dashboard.types';

export async function getRecentConversations(): Promise<RecentConversationsResponse> {
  const response = await apiClient.get<RecentConversationsResponse>(
    '/v1/recent-conversations',
  );
  return response.data;
}

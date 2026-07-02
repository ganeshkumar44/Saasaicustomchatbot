import { apiClient } from '@/api/axios';
import type {
  ChatSessionDetailsResponse,
  ChatSessionsResponse,
} from '@/types/chatHistory.types';

export async function getChatSessions(
  page: number,
  perPage: number,
): Promise<ChatSessionsResponse> {
  const response = await apiClient.get<ChatSessionsResponse>(
    '/v1/chat-history/sessions',
    { params: { page, per_page: perPage } },
  );
  return response.data;
}

export async function getChatSessionDetails(
  chatSessionId: number,
): Promise<ChatSessionDetailsResponse> {
  const response = await apiClient.get<ChatSessionDetailsResponse>(
    `/v1/chat-history/session/${chatSessionId}`,
  );
  return response.data;
}

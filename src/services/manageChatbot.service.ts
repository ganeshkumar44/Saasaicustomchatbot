import { apiClient } from '@/api/axios';
import type { PermanentlyDeleteChatbotResponse } from '@/types/manageChatbot.types';

export async function permanentlyDeleteChatbot(
  chatbotId: number,
): Promise<PermanentlyDeleteChatbotResponse> {
  const response = await apiClient.delete<PermanentlyDeleteChatbotResponse>(
    `/v1/manage-chatbot/${chatbotId}/permanently-delete`,
  );
  return response.data;
}

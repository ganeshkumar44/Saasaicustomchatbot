import { apiClient } from '@/api/axios';
import type {
  ChatbotPromptSuccessResponse,
  UpdateChatbotPromptRequest,
} from '@/types/chatbotPrompt.types';

export async function getChatbotPrompt(
  chatbotId: number,
): Promise<ChatbotPromptSuccessResponse> {
  const response = await apiClient.get<ChatbotPromptSuccessResponse>(
    `/v1/chatbots/${chatbotId}/prompt`,
  );
  return response.data;
}

export async function updateChatbotPrompt(
  chatbotId: number,
  payload: UpdateChatbotPromptRequest,
): Promise<ChatbotPromptSuccessResponse> {
  const response = await apiClient.put<ChatbotPromptSuccessResponse>(
    `/v1/chatbots/${chatbotId}/prompt`,
    payload,
  );
  return response.data;
}

export async function resetChatbotPrompt(
  chatbotId: number,
): Promise<ChatbotPromptSuccessResponse> {
  return updateChatbotPrompt(chatbotId, {
    system_prompt: '',
    tone: '',
    response_style: '',
    response_length: '',
    language: '',
    extra_instruction: '',
  });
}

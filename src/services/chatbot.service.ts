import { apiClient } from '@/api/axios';
import type {
  BasicInfoRequest,
  BasicInfoResponse,
  BehaviourRequest,
  BehaviourResponse,
  ChatbotListResponse,
  CreateChatbotResponse,
  PublishResponse,
  ReviewResponse,
  DeleteChatbotResponse,
  ActivateChatbotResponse,
} from '@/types/chatbot.types';
import type {
  AppearanceSettingsRequest,
  ChatbotDetailsResponse,
  GeneralSettingsRequest,
  MessageSettingsRequest,
  SecuritySettingsRequest,
  SettingsUpdateResponse,
} from '@/types/chatbotSettings.types';

export async function createDraft(): Promise<CreateChatbotResponse> {
  const response = await apiClient.post<CreateChatbotResponse>('/v1/chatbots');
  return response.data;
}

export async function updateBasicInfo(
  chatbotId: number,
  data: BasicInfoRequest,
): Promise<BasicInfoResponse> {
  const response = await apiClient.put<BasicInfoResponse>(
    `/v1/chatbots/${chatbotId}/basic-info`,
    data,
  );
  return response.data;
}

export async function updateBehaviour(
  chatbotId: number,
  data: BehaviourRequest,
): Promise<BehaviourResponse> {
  const response = await apiClient.put<BehaviourResponse>(
    `/v1/chatbots/${chatbotId}/behaviour`,
    data,
  );
  return response.data;
}

export async function getReview(chatbotId: number): Promise<ReviewResponse> {
  const response = await apiClient.get<ReviewResponse>(
    `/v1/chatbots/${chatbotId}/review`,
  );
  return response.data;
}

export async function publishChatbot(chatbotId: number): Promise<PublishResponse> {
  const response = await apiClient.post<PublishResponse>(
    `/v1/chatbots/${chatbotId}/publish`,
  );
  return response.data;
}

export async function deleteChatbot(chatbotId: number): Promise<DeleteChatbotResponse> {
  const response = await apiClient.delete<DeleteChatbotResponse>(
    `/v1/chatbots/${chatbotId}/delete`,
  );
  return response.data;
}

export async function activateChatbot(
  chatbotId: number,
): Promise<ActivateChatbotResponse> {
  const response = await apiClient.put<ActivateChatbotResponse>(
    `/v1/chatbots/${chatbotId}/activate`,
  );
  return response.data;
}

export async function getChatbotDetails(
  chatbotId: number,
): Promise<ChatbotDetailsResponse> {
  const response = await apiClient.get<ChatbotDetailsResponse>(
    `/v1/chatbots/${chatbotId}/details`,
  );
  return response.data;
}

export async function getChatbotList(): Promise<ChatbotListResponse> {
  const response = await apiClient.get<ChatbotListResponse>('/v1/chatbot-list');
  return response.data;
}

export async function updateGeneralSettings(
  data: GeneralSettingsRequest,
): Promise<SettingsUpdateResponse> {
  const response = await apiClient.put<SettingsUpdateResponse>(
    '/v1/chatbots/general-setting',
    data,
  );
  return response.data;
}

export async function updateAppearanceSettings(
  data: AppearanceSettingsRequest,
): Promise<SettingsUpdateResponse> {
  const response = await apiClient.put<SettingsUpdateResponse>(
    '/v1/chatbots/appearance',
    data,
  );
  return response.data;
}

export async function updateMessageSettings(
  data: MessageSettingsRequest,
): Promise<SettingsUpdateResponse> {
  const response = await apiClient.put<SettingsUpdateResponse>(
    '/v1/chatbots/messages',
    data,
  );
  return response.data;
}

export async function updateSecuritySettings(
  data: SecuritySettingsRequest,
): Promise<SettingsUpdateResponse> {
  const response = await apiClient.put<SettingsUpdateResponse>(
    '/v1/chatbots/security',
    data,
  );
  return response.data;
}

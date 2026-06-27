import { apiClient } from '@/api/axios';
import type {
  BasicInfoRequest,
  BasicInfoResponse,
  BehaviourRequest,
  BehaviourResponse,
  ChatbotListResponse,
  CreateChatbotResponse,
  KnowledgeBaseUploadPayload,
  KnowledgeBaseUploadResponse,
  PublishResponse,
  ReviewResponse,
} from '@/types/chatbot.types';
import type { ChatbotDetailsResponse } from '@/types/chatbotSettings.types';

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

export async function uploadKnowledgeBase(
  chatbotId: number,
  payload: KnowledgeBaseUploadPayload,
  onUploadProgress?: (progress: number) => void,
): Promise<KnowledgeBaseUploadResponse> {
  const formData = new FormData();

  payload.files.forEach((file) => {
    formData.append('files', file);
  });

  payload.urls.forEach((url) => {
    formData.append('urls', url);
  });

  const response = await apiClient.post<KnowledgeBaseUploadResponse>(
    `/v1/chatbots/${chatbotId}/knowledgebase/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (!event.total) {
          return;
        }

        const progress = Math.round((event.loaded * 100) / event.total);
        onUploadProgress?.(progress);
      },
    },
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

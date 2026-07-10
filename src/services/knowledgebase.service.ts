import { apiClient } from '@/api/axios';
import { KNOWLEDGE_BASE_UPLOAD_TIMEOUT_MS } from '@/constants/chatbot';
import type {
  KnowledgeBaseStatusResponse,
  KnowledgeBaseUploadResponse,
} from '@/types/knowledgebase.types';
import type { KnowledgeBaseUploadPayload } from '@/types/chatbot.types';
import type {
  KnowledgeBaseSettingsRequest,
  SettingsUpdateResponse,
} from '@/types/chatbotSettings.types';

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
      timeout: KNOWLEDGE_BASE_UPLOAD_TIMEOUT_MS,
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

export async function updateKnowledgeBaseSettings(
  payload: KnowledgeBaseSettingsRequest,
  onUploadProgress?: (progress: number) => void,
): Promise<SettingsUpdateResponse> {
  const formData = new FormData();

  formData.append('chatbot_id', String(payload.chatbot_id));

  payload.delete_document_ids.forEach((documentId) => {
    formData.append('delete_document_ids', String(documentId));
  });

  payload.files.forEach((file) => {
    formData.append('files', file);
  });

  payload.urls.forEach((url) => {
    formData.append('urls', url);
  });

  const response = await apiClient.put<SettingsUpdateResponse>(
    '/v1/chatbots/knowledge-base',
    formData,
    {
      timeout: KNOWLEDGE_BASE_UPLOAD_TIMEOUT_MS,
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

export async function getKnowledgeBaseStatus(
  chatbotId: number,
): Promise<KnowledgeBaseStatusResponse> {
  const response = await apiClient.get<KnowledgeBaseStatusResponse>(
    `/v1/chatbots/${chatbotId}/knowledgebase/status`,
  );

  return response.data;
}

import { apiClient } from '@/api/axios';
import type {
  CreatePlaygroundSessionRequest,
  CreatePlaygroundSessionResponse,
  DeletePlaygroundSessionResponse,
  PlaygroundMessagesResponse,
  PlaygroundSessionListResponse,
  PlaygroundTestAnswerRequest,
  PlaygroundTestAnswerResponse,
} from '@/types/playground.types';

export async function getPlaygroundSessions(
  chatbotId: number,
): Promise<PlaygroundSessionListResponse> {
  const response = await apiClient.get<PlaygroundSessionListResponse>(
    '/v1/playground/session',
    { params: { chatbot_id: chatbotId } },
  );
  return response.data;
}

export async function createPlaygroundSession(
  payload: CreatePlaygroundSessionRequest,
): Promise<CreatePlaygroundSessionResponse> {
  const response = await apiClient.post<CreatePlaygroundSessionResponse>(
    '/v1/playground/session',
    payload,
  );
  return response.data;
}

export async function deletePlaygroundSession(
  sessionId: number,
): Promise<DeletePlaygroundSessionResponse> {
  const response = await apiClient.delete<DeletePlaygroundSessionResponse>(
    `/v1/playground/session/${sessionId}`,
  );
  return response.data;
}

export async function getPlaygroundMessages(
  sessionId: number,
): Promise<PlaygroundMessagesResponse> {
  const response = await apiClient.get<PlaygroundMessagesResponse>(
    `/v1/playground/messages/${sessionId}`,
  );
  return response.data;
}

export async function sendPlaygroundTestAnswer(
  payload: PlaygroundTestAnswerRequest,
): Promise<PlaygroundTestAnswerResponse> {
  const response = await apiClient.post<PlaygroundTestAnswerResponse>(
    '/v1/ai/test-answer',
    payload,
  );
  return response.data;
}

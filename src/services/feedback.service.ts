import { apiClient } from '@/api/axios';
import type {
  CreateFeedbackRequest,
  CreateFeedbackSuccessResponse,
} from '@/types/feedback.types';

export async function submitWebsiteFeedback(
  payload: CreateFeedbackRequest,
): Promise<CreateFeedbackSuccessResponse> {
  const response = await apiClient.post<CreateFeedbackSuccessResponse>(
    '/v1/feedback',
    payload,
  );
  return response.data;
}

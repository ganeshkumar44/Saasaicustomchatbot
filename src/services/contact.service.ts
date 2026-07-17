import { apiClient } from '@/api/axios';
import type {
  ContactRequest,
  ContactSuccessResponse,
} from '@/types/landing.types';

export async function submitContact(
  payload: ContactRequest,
): Promise<ContactSuccessResponse> {
  const response = await apiClient.post<ContactSuccessResponse>(
    '/v1/contact',
    payload,
  );
  return response.data;
}

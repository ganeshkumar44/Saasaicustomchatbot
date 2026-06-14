import { apiClient } from '@/api/axios';
import type { SignupRequest, SignupResponse } from '@/types/auth.types';

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/v1/signup', data);
  return response.data;
}

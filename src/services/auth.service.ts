import { apiClient } from '@/api/axios';
import type {
  ResendVerificationRequest,
  ResendVerificationResponse,
  SignupRequest,
  SignupResponse,
  VerificationRequest,
  VerificationResponse,
} from '@/types/auth.types';

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/v1/signup', data);
  return response.data;
}

export async function verifySignup(
  data: VerificationRequest,
): Promise<VerificationResponse> {
  const response = await apiClient.post<VerificationResponse>(
    '/v1/signup-verification',
    data,
  );
  return response.data;
}

export async function resendSignupVerification(
  data: ResendVerificationRequest,
): Promise<ResendVerificationResponse> {
  const response = await apiClient.post<ResendVerificationResponse>(
    '/v1/signup-resend-verification',
    data,
  );
  return response.data;
}

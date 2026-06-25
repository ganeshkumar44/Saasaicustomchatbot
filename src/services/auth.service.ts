import { apiClient } from '@/api/axios';
import type {
  LoginRequest,
  LoginResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
  SignoutResponse,
  SignupRequest,
  SignupResponse,
  VerificationRequest,
  VerificationResponse,
} from '@/types/auth.types';
import type {
  ForgotPasswordEmailRequest,
  ForgotPasswordEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyForgotPasswordCodeRequest,
  VerifyForgotPasswordCodeResponse,
} from '@/types/forgotPassword.types';

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/v1/signup', data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/v1/signin', data);
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

export async function signout(): Promise<SignoutResponse> {
  const response = await apiClient.post<SignoutResponse>('/v1/signout');
  return response.data;
}

export async function verifyForgotPasswordEmail(
  data: ForgotPasswordEmailRequest,
): Promise<ForgotPasswordEmailResponse> {
  const response = await apiClient.post<ForgotPasswordEmailResponse>(
    '/v1/verify-forgot-password-email',
    data,
  );
  return response.data;
}

export async function verifyForgotPasswordCode(
  data: VerifyForgotPasswordCodeRequest,
): Promise<VerifyForgotPasswordCodeResponse> {
  const response = await apiClient.post<VerifyForgotPasswordCodeResponse>(
    '/v1/verify-forgot-password-uniquecode',
    data,
  );
  return response.data;
}

export async function resetForgotPassword(
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const response = await apiClient.post<ResetPasswordResponse>(
    '/v1/forgot-password',
    data,
  );
  return response.data;
}

export async function resendForgotPasswordCode(
  data: ForgotPasswordEmailRequest,
): Promise<ForgotPasswordEmailResponse> {
  return verifyForgotPasswordEmail(data);
}

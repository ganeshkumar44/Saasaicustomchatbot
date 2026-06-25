export type ForgotPasswordStep = 'email' | 'otp' | 'reset' | 'success';

export type ForgotPasswordVerificationStatus =
  | 'idle'
  | 'code_sent'
  | 'code_verified';

export interface ForgotPasswordEmailRequest {
  email: string;
}

export interface ForgotPasswordEmailResponse {
  success: true;
  message: string;
}

export interface VerifyForgotPasswordCodeRequest {
  email: string;
  verification_code: string;
}

export interface VerifyForgotPasswordCodeResponse {
  success: true;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  success: true;
  message: string;
}

export interface ForgotPasswordState {
  email: string | null;
  currentStep: ForgotPasswordStep;
  verificationStatus: ForgotPasswordVerificationStatus;
  loading: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;
  verificationCodeVerified: boolean;
  passwordResetCompleted: boolean;
  resendLoading: boolean;
  resendSuccess: boolean;
  resendError: string | null;
  resendSuccessMessage: string | null;
}

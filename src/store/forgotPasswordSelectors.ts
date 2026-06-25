import type { RootState } from '@/store/index';
import type {
  ForgotPasswordStep,
  ForgotPasswordVerificationStatus,
} from '@/types/forgotPassword.types';

export const selectForgotPasswordEmail = (state: RootState): string | null =>
  state.forgotPassword.email;

export const selectForgotPasswordCurrentStep = (
  state: RootState,
): ForgotPasswordStep => state.forgotPassword.currentStep;

export const selectForgotPasswordVerificationStatus = (
  state: RootState,
): ForgotPasswordVerificationStatus =>
  state.forgotPassword.verificationStatus;

export const selectForgotPasswordLoading = (state: RootState): boolean =>
  state.forgotPassword.loading;

export const selectForgotPasswordError = (state: RootState): string | null =>
  state.forgotPassword.error;

export const selectForgotPasswordSuccess = (state: RootState): boolean =>
  state.forgotPassword.success;

export const selectForgotPasswordSuccessMessage = (
  state: RootState,
): string | null => state.forgotPassword.successMessage;

export const selectForgotPasswordCodeVerified = (state: RootState): boolean =>
  state.forgotPassword.verificationCodeVerified;

export const selectForgotPasswordResetCompleted = (state: RootState): boolean =>
  state.forgotPassword.passwordResetCompleted;

export const selectForgotPasswordResendLoading = (state: RootState): boolean =>
  state.forgotPassword.resendLoading;

export const selectForgotPasswordResendSuccess = (state: RootState): boolean =>
  state.forgotPassword.resendSuccess;

export const selectForgotPasswordResendError = (state: RootState): string | null =>
  state.forgotPassword.resendError;

export const selectForgotPasswordResendSuccessMessage = (
  state: RootState,
): string | null => state.forgotPassword.resendSuccessMessage;

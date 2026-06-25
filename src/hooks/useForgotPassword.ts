import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearForgotPasswordError,
  clearForgotPasswordResendError,
  clearForgotPasswordResendSuccess,
  resetForgotPasswordFlow,
  setForgotPasswordStep,
} from '@/store/forgotPasswordSlice';
import {
  selectForgotPasswordCodeVerified,
  selectForgotPasswordCurrentStep,
  selectForgotPasswordEmail,
  selectForgotPasswordError,
  selectForgotPasswordLoading,
  selectForgotPasswordResetCompleted,
  selectForgotPasswordResendError,
  selectForgotPasswordResendLoading,
  selectForgotPasswordResendSuccess,
  selectForgotPasswordResendSuccessMessage,
  selectForgotPasswordSuccess,
  selectForgotPasswordSuccessMessage,
  selectForgotPasswordVerificationStatus,
} from '@/store/forgotPasswordSelectors';
import {
  resendForgotPasswordOtp,
  resetForgotPassword,
  sendForgotPasswordEmail,
  verifyForgotPasswordOtp,
} from '@/store/forgotPasswordThunk';
import type { ForgotPasswordStep } from '@/types/forgotPassword.types';

export function useForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useAppSelector(selectForgotPasswordEmail);
  const currentStep = useAppSelector(selectForgotPasswordCurrentStep);
  const verificationStatus = useAppSelector(selectForgotPasswordVerificationStatus);
  const loading = useAppSelector(selectForgotPasswordLoading);
  const success = useAppSelector(selectForgotPasswordSuccess);
  const error = useAppSelector(selectForgotPasswordError);
  const successMessage = useAppSelector(selectForgotPasswordSuccessMessage);
  const verificationCodeVerified = useAppSelector(selectForgotPasswordCodeVerified);
  const passwordResetCompleted = useAppSelector(selectForgotPasswordResetCompleted);
  const resendLoading = useAppSelector(selectForgotPasswordResendLoading);
  const resendSuccess = useAppSelector(selectForgotPasswordResendSuccess);
  const resendError = useAppSelector(selectForgotPasswordResendError);
  const resendSuccessMessage = useAppSelector(selectForgotPasswordResendSuccessMessage);

  useEffect(() => {
    if (currentStep === 'otp' && !email) {
      dispatch(setForgotPasswordStep('email'));
    }

    if (currentStep === 'reset' && (!email || !verificationCodeVerified)) {
      dispatch(setForgotPasswordStep(email ? 'otp' : 'email'));
    }
  }, [currentStep, email, verificationCodeVerified, dispatch]);

  useEffect(() => {
    if (resendSuccess && resendSuccessMessage) {
      toast.success(resendSuccessMessage);
      dispatch(clearForgotPasswordResendSuccess());
    }
  }, [resendSuccess, resendSuccessMessage, dispatch]);

  useEffect(() => {
    if (passwordResetCompleted && successMessage && currentStep === 'success') {
      toast.success(successMessage);

      const redirectTimer = setTimeout(() => {
        navigate('/');
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [passwordResetCompleted, successMessage, currentStep, navigate]);

  const sendVerificationCode = useCallback(
    (emailValue: string) =>
      dispatch(sendForgotPasswordEmail({ email: emailValue.trim().toLowerCase() })),
    [dispatch],
  );

  const verifyCode = useCallback(
    (verificationCode: string) => dispatch(verifyForgotPasswordOtp(verificationCode)),
    [dispatch],
  );

  const resendCode = useCallback(
    () => dispatch(resendForgotPasswordOtp()),
    [dispatch],
  );

  const resetPassword = useCallback(
    (newPassword: string, confirmPassword: string) =>
      dispatch(
        resetForgotPassword({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      ),
    [dispatch],
  );

  const clearError = useCallback(
    () => dispatch(clearForgotPasswordError()),
    [dispatch],
  );

  const clearResendError = useCallback(
    () => dispatch(clearForgotPasswordResendError()),
    [dispatch],
  );

  const resetFlow = useCallback(
    () => dispatch(resetForgotPasswordFlow()),
    [dispatch],
  );

  const goToStep = useCallback(
    (step: ForgotPasswordStep) => dispatch(setForgotPasswordStep(step)),
    [dispatch],
  );

  return {
    email,
    currentStep,
    verificationStatus,
    loading,
    success,
    error,
    successMessage,
    verificationCodeVerified,
    passwordResetCompleted,
    resendLoading,
    resendSuccess,
    resendError,
    resendSuccessMessage,
    sendVerificationCode,
    verifyCode,
    resendCode,
    resetPassword,
    clearError,
    clearResendError,
    resetFlow,
    goToStep,
  };
}

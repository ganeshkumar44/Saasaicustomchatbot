import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearResendError,
  clearVerificationError,
  resetVerificationFlow,
} from '@/store/authSlice';
import { resendVerificationCode, verifyAccount } from '@/store/authThunk';
import {
  selectIsEmailVerified,
  selectIsMobileVerified,
  selectRegisteredEmail,
  selectResendError,
  selectResendLoading,
  selectResendSuccess,
  selectResendSuccessMessage,
  selectShowResendLink,
  selectVerificationError,
  selectVerificationLoading,
  selectVerificationSuccess,
  selectVerificationSuccessMessage,
} from '@/store/authSelectors';
import type {
  ResendVerificationRequest,
  VerificationRequest,
} from '@/types/auth.types';

export function useVerification() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registeredEmail = useAppSelector(selectRegisteredEmail);
  const verificationLoading = useAppSelector(selectVerificationLoading);
  const verificationSuccess = useAppSelector(selectVerificationSuccess);
  const verificationError = useAppSelector(selectVerificationError);
  const verificationSuccessMessage = useAppSelector(selectVerificationSuccessMessage);
  const resendLoading = useAppSelector(selectResendLoading);
  const resendSuccess = useAppSelector(selectResendSuccess);
  const resendError = useAppSelector(selectResendError);
  const resendSuccessMessage = useAppSelector(selectResendSuccessMessage);
  const showResendLink = useAppSelector(selectShowResendLink);
  const isEmailVerified = useAppSelector(selectIsEmailVerified);
  const isMobileVerified = useAppSelector(selectIsMobileVerified);

  useEffect(() => {
    if (!registeredEmail) {
      navigate('/register');
    }
  }, [registeredEmail, navigate]);

  useEffect(() => {
    if (verificationSuccess && verificationSuccessMessage) {
      toast.success(verificationSuccessMessage);
      const redirectTimer = setTimeout(() => {
        navigate('/signin');
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [verificationSuccess, verificationSuccessMessage, navigate]);

  useEffect(() => {
    if (resendSuccess && resendSuccessMessage) {
      toast.success(resendSuccessMessage);
    }
  }, [resendSuccess, resendSuccessMessage]);

  const verify = useCallback(
    (payload: VerificationRequest) => dispatch(verifyAccount(payload)),
    [dispatch],
  );

  const resendVerification = useCallback(
    (payload: ResendVerificationRequest) =>
      dispatch(resendVerificationCode(payload)),
    [dispatch],
  );

  const clearVerificationErrors = useCallback(() => {
    dispatch(clearVerificationError());
    dispatch(clearResendError());
  }, [dispatch]);

  const resetVerification = useCallback(
    () => dispatch(resetVerificationFlow()),
    [dispatch],
  );

  return {
    registeredEmail,
    verify,
    resendVerification,
    verificationLoading,
    verificationSuccess,
    verificationError,
    verificationSuccessMessage,
    resendLoading,
    resendSuccess,
    resendError,
    resendSuccessMessage,
    showResendLink,
    isEmailVerified,
    isMobileVerified,
    clearVerificationErrors,
    resetVerification,
  };
}

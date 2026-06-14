import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSignupError, resetSignupState } from '@/store/authSlice';
import { signupUser } from '@/store/authThunk';
import {
  selectRegisteredUser,
  selectSignupError,
  selectSignupLoading,
  selectSignupSuccess,
  selectSignupSuccessMessage,
} from '@/store/authSelectors';
import type { SignupRequest } from '@/types/auth.types';

export function useSignup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectSignupLoading);
  const success = useAppSelector(selectSignupSuccess);
  const error = useAppSelector(selectSignupError);
  const registeredUser = useAppSelector(selectRegisteredUser);
  const successMessage = useAppSelector(selectSignupSuccessMessage);

  useEffect(() => {
    dispatch(resetSignupState());
  }, [dispatch]);

  useEffect(() => {
    if (success && successMessage) {
      toast.success(successMessage);
      navigate('/verify-account');
    }
  }, [success, successMessage, navigate]);

  const signup = useCallback(
    (payload: SignupRequest) => dispatch(signupUser(payload)),
    [dispatch],
  );

  const resetSignup = useCallback(
    () => dispatch(resetSignupState()),
    [dispatch],
  );

  const clearError = useCallback(
    () => dispatch(clearSignupError()),
    [dispatch],
  );

  return {
    signup,
    loading,
    success,
    error,
    registeredUser,
    successMessage,
    resetSignup,
    clearError,
  };
}

import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearLoginError, clearSignoutError, logout } from '@/store/authSlice';
import { loginUser, signoutUser } from '@/store/authThunk';
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectLoginError,
  selectLoginLoading,
  selectLoginSuccess,
  selectLoginSuccessMessage,
  selectRefreshToken,
  selectSignoutError,
  selectSignoutLoading,
  selectSignoutSuccess,
  selectSignoutSuccessMessage,
  selectUser,
} from '@/store/authSelectors';
import type { LoginRequest } from '@/types/auth.types';
import { shouldForceLocalSignout } from '@/utils/signoutError';

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loginLoading = useAppSelector(selectLoginLoading);
  const loginSuccess = useAppSelector(selectLoginSuccess);
  const loginError = useAppSelector(selectLoginError);
  const loginSuccessMessage = useAppSelector(selectLoginSuccessMessage);
  const signoutLoading = useAppSelector(selectSignoutLoading);
  const signoutSuccess = useAppSelector(selectSignoutSuccess);
  const signoutError = useAppSelector(selectSignoutError);
  const signoutSuccessMessage = useAppSelector(selectSignoutSuccessMessage);

  const login = useCallback(
    (payload: LoginRequest) => dispatch(loginUser(payload)),
    [dispatch],
  );

  const signout = useCallback(async () => {
    dispatch(clearSignoutError());

    const result = await dispatch(signoutUser());

    if (signoutUser.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate('/signin');
      return;
    }

    const errorMessage =
      result.payload ?? 'Sign out failed. Please try again.';
    toast.error(errorMessage);

    if (shouldForceLocalSignout(errorMessage)) {
      dispatch(logout());
      navigate('/signin');
    }
  }, [dispatch, navigate]);

  const clearError = useCallback(
    () => dispatch(clearLoginError()),
    [dispatch],
  );

  const clearSignoutErrorState = useCallback(
    () => dispatch(clearSignoutError()),
    [dispatch],
  );

  return {
    user,
    currentUser: user,
    accessToken,
    refreshToken,
    isAuthenticated,
    loginLoading,
    loginSuccess,
    loginError,
    loginSuccessMessage,
    signoutLoading,
    signoutSuccess,
    signoutError,
    signoutSuccessMessage,
    login,
    signout,
    clearError,
    clearSignoutError: clearSignoutErrorState,
  };
}

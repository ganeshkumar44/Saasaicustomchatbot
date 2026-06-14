import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearLoginError, logout } from '@/store/authSlice';
import { loginUser } from '@/store/authThunk';
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectLoginError,
  selectLoginLoading,
  selectLoginSuccess,
  selectLoginSuccessMessage,
  selectRefreshToken,
  selectUser,
} from '@/store/authSelectors';
import type { LoginRequest } from '@/types/auth.types';

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

  const login = useCallback(
    (payload: LoginRequest) => dispatch(loginUser(payload)),
    [dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  const clearError = useCallback(
    () => dispatch(clearLoginError()),
    [dispatch],
  );

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    loginLoading,
    loginSuccess,
    loginError,
    loginSuccessMessage,
    login,
    logout: signOut,
    clearError,
  };
}

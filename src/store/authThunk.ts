import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as loginService,
  resendSignupVerification,
  signout as signoutService,
  signup as signupService,
  verifySignup,
} from '@/services/auth.service';
import type { RootState } from '@/store/index';
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
import { getApiErrorMessage } from '@/utils/apiError';
import { saveAuthSession } from '@/utils/authStorage';
import { getSignoutErrorMessage } from '@/utils/signoutError';
import { validateSignoutSession } from '@/utils/signoutValidation';
import { fetchThemeMode } from '@/store/themeThunk';
import { fetchUserDetails } from '@/store/accountSettingsThunk';

export const signupUser = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  { rejectValue: string }
>('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    return await signupService(payload);
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await loginService(payload);
    saveAuthSession({
      user: response.data,
      accessToken: response.access_token,
      tokenType: response.token_type,
      refreshToken: null,
    });
    await Promise.all([
      dispatch(fetchThemeMode()),
      dispatch(fetchUserDetails()),
    ]);
    return response;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const verifyAccount = createAsyncThunk<
  VerificationResponse,
  VerificationRequest,
  { rejectValue: string }
>('auth/verifyAccount', async (payload, { rejectWithValue }) => {
  try {
    return await verifySignup(payload);
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const resendVerificationCode = createAsyncThunk<
  ResendVerificationResponse,
  ResendVerificationRequest,
  { rejectValue: string }
>('auth/resendVerification', async (payload, { rejectWithValue }) => {
  try {
    return await resendSignupVerification(payload);
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const signoutUser = createAsyncThunk<
  SignoutResponse,
  void,
  { rejectValue: string; state: RootState }
>('auth/signout', async (_, { rejectWithValue, getState }) => {
  const { auth } = getState();
  const validation = validateSignoutSession(
    auth.isAuthenticated,
    auth.user,
    auth.accessToken,
  );

  if (!validation.isValid) {
    return rejectWithValue(validation.error ?? 'Please login first.');
  }

  try {
    return await signoutService();
  } catch (error) {
    return rejectWithValue(getSignoutErrorMessage(error));
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as loginService,
  resendSignupVerification,
  signup as signupService,
  verifySignup,
} from '@/services/auth.service';
import type {
  LoginRequest,
  LoginResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
  SignupRequest,
  SignupResponse,
  VerificationRequest,
  VerificationResponse,
} from '@/types/auth.types';
import { getApiErrorMessage } from '@/utils/apiError';

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
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await loginService(payload);
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

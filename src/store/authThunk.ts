import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  resendSignupVerification,
  signup as signupService,
  verifySignup,
} from '@/services/auth.service';
import type {
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { signup as signupService } from '@/services/auth.service';
import type { SignupRequest, SignupResponse } from '@/types/auth.types';
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  resendForgotPasswordCode as resendForgotPasswordCodeService,
  resetForgotPassword as resetForgotPasswordService,
  verifyForgotPasswordCode as verifyForgotPasswordCodeService,
  verifyForgotPasswordEmail as verifyForgotPasswordEmailService,
} from '@/services/auth.service';
import type { RootState } from '@/store/index';
import type {
  ForgotPasswordEmailRequest,
  ResetPasswordRequest,
} from '@/types/forgotPassword.types';
import { getApiErrorMessage } from '@/utils/apiError';

export const sendForgotPasswordEmail = createAsyncThunk<
  { message: string; email: string },
  ForgotPasswordEmailRequest,
  { rejectValue: string }
>('forgotPassword/sendEmail', async (payload, { rejectWithValue }) => {
  try {
    const response = await verifyForgotPasswordEmailService(payload);
    return {
      message: response.message,
      email: payload.email.trim().toLowerCase(),
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const verifyForgotPasswordOtp = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string; state: RootState }
>('forgotPassword/verifyOtp', async (verificationCode, { rejectWithValue, getState }) => {
  const { email } = getState().forgotPassword;

  if (!email) {
    return rejectWithValue('Email is required.');
  }

  try {
    const response = await verifyForgotPasswordCodeService({
      email,
      verification_code: verificationCode,
    });
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const resendForgotPasswordOtp = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string; state: RootState }
>('forgotPassword/resendOtp', async (_, { rejectWithValue, getState }) => {
  const { email } = getState().forgotPassword;

  if (!email) {
    return rejectWithValue('Email is required.');
  }

  try {
    const response = await resendForgotPasswordCodeService({ email });
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const resetForgotPassword = createAsyncThunk<
  { message: string },
  Pick<ResetPasswordRequest, 'new_password' | 'confirm_password'>,
  { rejectValue: string; state: RootState }
>('forgotPassword/resetPassword', async (payload, { rejectWithValue, getState }) => {
  const { email } = getState().forgotPassword;

  if (!email) {
    return rejectWithValue('Email is required.');
  }

  try {
    const response = await resetForgotPasswordService({
      email,
      new_password: payload.new_password,
      confirm_password: payload.confirm_password,
    });
    return { message: response.message };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

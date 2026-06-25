import { createSlice } from '@reduxjs/toolkit';
import {
  resendForgotPasswordOtp,
  resetForgotPassword,
  sendForgotPasswordEmail,
  verifyForgotPasswordOtp,
} from '@/store/forgotPasswordThunk';
import type { ForgotPasswordState } from '@/types/forgotPassword.types';

const initialState: ForgotPasswordState = {
  email: null,
  currentStep: 'email',
  verificationStatus: 'idle',
  loading: false,
  error: null,
  success: false,
  successMessage: null,
  verificationCodeVerified: false,
  passwordResetCompleted: false,
  resendLoading: false,
  resendSuccess: false,
  resendError: null,
  resendSuccessMessage: null,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    clearForgotPasswordError: (state) => {
      state.error = null;
    },
    clearForgotPasswordResendError: (state) => {
      state.resendError = null;
    },
    clearForgotPasswordResendSuccess: (state) => {
      state.resendSuccess = false;
      state.resendSuccessMessage = null;
    },
    resetForgotPasswordFlow: () => initialState,
    setForgotPasswordStep: (
      state,
      action: { payload: ForgotPasswordState['currentStep'] },
    ) => {
      state.currentStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage = action.payload.message;
        state.email = action.payload.email;
        state.currentStep = 'otp';
        state.verificationStatus = 'code_sent';
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Failed to send verification code. Please try again.';
        state.successMessage = null;
      })
      .addCase(verifyForgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(verifyForgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage = action.payload.message;
        state.verificationCodeVerified = true;
        state.verificationStatus = 'code_verified';
        state.currentStep = 'reset';
      })
      .addCase(verifyForgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Verification failed. Please try again.';
        state.successMessage = null;
      })
      .addCase(resendForgotPasswordOtp.pending, (state) => {
        state.resendLoading = true;
        state.resendSuccess = false;
        state.resendError = null;
        state.resendSuccessMessage = null;
      })
      .addCase(resendForgotPasswordOtp.fulfilled, (state, action) => {
        state.resendLoading = false;
        state.resendSuccess = true;
        state.resendError = null;
        state.resendSuccessMessage = action.payload.message;
      })
      .addCase(resendForgotPasswordOtp.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendSuccess = false;
        state.resendError =
          action.payload ?? 'Failed to resend verification code. Please try again.';
        state.resendSuccessMessage = null;
      })
      .addCase(resetForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(resetForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.successMessage = action.payload.message;
        state.passwordResetCompleted = true;
        state.currentStep = 'success';
      })
      .addCase(resetForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Password reset failed. Please try again.';
        state.successMessage = null;
      });
  },
});

export const {
  clearForgotPasswordError,
  clearForgotPasswordResendError,
  clearForgotPasswordResendSuccess,
  resetForgotPasswordFlow,
  setForgotPasswordStep,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

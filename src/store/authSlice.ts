import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/auth.types';
import {
  resendVerificationCode,
  signupUser,
  verifyAccount,
} from '@/store/authThunk';
import { isVerificationExpiredError } from '@/utils/validation';

const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  registeredUser: null,
  registeredEmail: null,
  successMessage: null,
  verificationLoading: false,
  verificationSuccess: false,
  verificationError: null,
  verificationSuccessMessage: null,
  resendLoading: false,
  resendSuccess: false,
  resendError: null,
  resendSuccessMessage: null,
  showResendLink: false,
  isEmailVerified: false,
  isMobileVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.successMessage = null;
    },
    clearSignupError: (state) => {
      state.error = null;
    },
    clearVerificationError: (state) => {
      state.verificationError = null;
    },
    clearResendError: (state) => {
      state.resendError = null;
    },
    resetVerificationFlow: (state) => {
      state.verificationLoading = false;
      state.verificationSuccess = false;
      state.verificationError = null;
      state.verificationSuccessMessage = null;
      state.resendLoading = false;
      state.resendSuccess = false;
      state.resendError = null;
      state.resendSuccessMessage = null;
      state.showResendLink = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.registeredUser = null;
        state.registeredEmail = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.registeredUser = action.payload.data;
        state.registeredEmail = action.payload.data.email;
        state.successMessage = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Registration failed. Please try again.';
        state.registeredUser = null;
        state.registeredEmail = null;
        state.successMessage = null;
      })
      .addCase(verifyAccount.pending, (state) => {
        state.verificationLoading = true;
        state.verificationSuccess = false;
        state.verificationError = null;
        state.verificationSuccessMessage = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.verificationSuccess = true;
        state.verificationError = null;
        state.verificationSuccessMessage = action.payload.message;
        state.isEmailVerified = true;
        state.isMobileVerified = true;
        state.showResendLink = false;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        const errorMessage =
          action.payload ?? 'Verification failed. Please try again.';

        state.verificationLoading = false;
        state.verificationSuccess = false;
        state.verificationError = errorMessage;
        state.verificationSuccessMessage = null;

        if (isVerificationExpiredError(errorMessage)) {
          state.showResendLink = true;
        }
      })
      .addCase(resendVerificationCode.pending, (state) => {
        state.resendLoading = true;
        state.resendSuccess = false;
        state.resendError = null;
        state.resendSuccessMessage = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.resendLoading = false;
        state.resendSuccess = true;
        state.resendError = null;
        state.resendSuccessMessage = action.payload.message;
        state.showResendLink = false;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendSuccess = false;
        state.resendError =
          action.payload ?? 'Failed to resend verification code. Please try again.';
        state.resendSuccessMessage = null;
      });
  },
});

export const {
  resetSignupState,
  clearSignupError,
  clearVerificationError,
  clearResendError,
  resetVerificationFlow,
} = authSlice.actions;

export default authSlice.reducer;

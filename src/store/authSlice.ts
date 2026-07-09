import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser } from '@/types/auth.types';
import {
  fetchCurrentUserProfile,
  loginUser,
  resendVerificationCode,
  signoutUser,
  signupUser,
  verifyAccount,
} from '@/store/authThunk';
import { saveAuthSession, loadAuthSession, clearAuthSession } from '@/utils/authStorage';
import { isVerificationExpiredError } from '@/utils/validation';

function clearAuthenticatedSession(state: AuthState): void {
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.tokenType = null;
  state.isAuthenticated = false;
  state.loginLoading = false;
  state.loginSuccess = false;
  state.loginError = null;
  state.loginSuccessMessage = null;
  state.signoutLoading = false;
  state.signoutSuccess = false;
  state.signoutError = null;
  state.signoutSuccessMessage = null;
  clearAuthSession();
}

const persistedSession = loadAuthSession();

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
  user: persistedSession?.user ?? null,
  accessToken: persistedSession?.accessToken ?? null,
  refreshToken: persistedSession?.refreshToken ?? null,
  tokenType: persistedSession?.tokenType ?? null,
  isAuthenticated: Boolean(persistedSession?.accessToken),
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  loginSuccessMessage: null,
  signoutLoading: false,
  signoutSuccess: false,
  signoutError: null,
  signoutSuccessMessage: null,
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
    resetLoginState: (state) => {
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginError = null;
      state.loginSuccessMessage = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    setRegisteredEmail: (state, action: PayloadAction<string>) => {
      state.registeredEmail = action.payload.trim();
    },
    clearSignoutError: (state) => {
      state.signoutError = null;
    },
    resetSignoutState: (state) => {
      state.signoutLoading = false;
      state.signoutSuccess = false;
      state.signoutError = null;
      state.signoutSuccessMessage = null;
    },
    logout: (state) => {
      clearAuthenticatedSession(state);
    },
    updateAuthUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (!state.user) {
        return;
      }

      state.user = { ...state.user, ...action.payload };

      if (state.accessToken && state.tokenType) {
        saveAuthSession({
          user: state.user,
          accessToken: state.accessToken,
          tokenType: state.tokenType,
          refreshToken: state.refreshToken,
        });
      }
    },
    resetAuthState: () => initialState,
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
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginSuccess = false;
        state.loginError = null;
        state.loginSuccessMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = true;
        state.loginError = null;
        state.loginSuccessMessage = action.payload.message;
        state.user = action.payload.data;
        state.accessToken = action.payload.access_token;
        state.tokenType = action.payload.token_type;
        state.refreshToken = null;
        state.isAuthenticated = true;

        saveAuthSession({
          user: action.payload.data,
          accessToken: action.payload.access_token,
          tokenType: action.payload.token_type,
          refreshToken: null,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = action.payload ?? 'Sign in failed. Please try again.';
        state.loginSuccessMessage = null;
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
      })
      .addCase(signoutUser.pending, (state) => {
        state.signoutLoading = true;
        state.signoutSuccess = false;
        state.signoutError = null;
        state.signoutSuccessMessage = null;
      })
      .addCase(signoutUser.fulfilled, (state, action) => {
        clearAuthenticatedSession(state);
        state.signoutSuccess = true;
        state.signoutSuccessMessage = action.payload.message;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.signoutLoading = false;
        state.signoutSuccess = false;
        state.signoutError = action.payload ?? 'Sign out failed. Please try again.';
        state.signoutSuccessMessage = null;
      })
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        if (!state.user) {
          return;
        }

        state.user = {
          ...state.user,
          id: action.payload.data.id,
          first_name: action.payload.data.first_name,
          last_name: action.payload.data.last_name,
          email: action.payload.data.email,
          role: action.payload.data.role,
          plan: action.payload.data.plan,
        };

        if (state.accessToken && state.tokenType) {
          saveAuthSession({
            user: state.user,
            accessToken: state.accessToken,
            tokenType: state.tokenType,
            refreshToken: state.refreshToken,
          });
        }
      });
  },
});

export const {
  resetSignupState,
  clearSignupError,
  clearVerificationError,
  clearResendError,
  resetVerificationFlow,
  resetLoginState,
  clearLoginError,
  setRegisteredEmail,
  clearSignoutError,
  resetSignoutState,
  logout,
  updateAuthUser,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;

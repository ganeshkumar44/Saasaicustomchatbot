import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/auth.types';
import { signupUser } from '@/store/authThunk';

const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  registeredUser: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.registeredUser = null;
      state.successMessage = null;
    },
    clearSignupError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.registeredUser = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.registeredUser = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? 'Registration failed. Please try again.';
        state.registeredUser = null;
        state.successMessage = null;
      });
  },
});

export const { resetSignupState, clearSignupError } = authSlice.actions;
export default authSlice.reducer;

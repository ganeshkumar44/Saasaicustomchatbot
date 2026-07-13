import { createSlice } from '@reduxjs/toolkit';
import { logout } from '@/store/authSlice';
import { submitFeedbackThunk } from '@/store/feedbackThunk';
import type { FeedbackState } from '@/types/feedback.types';

const initialState: FeedbackState = {
  submitting: false,
  error: null,
  successMessage: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    clearFeedbackError: (state) => {
      state.error = null;
    },
    clearFeedbackSuccess: (state) => {
      state.successMessage = null;
    },
    resetFeedbackState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedbackThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitFeedbackThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.error = null;
        state.successMessage = action.payload.message;
      })
      .addCase(submitFeedbackThunk.rejected, (state, action) => {
        state.submitting = false;
        state.successMessage = null;
        state.error =
          action.payload ?? 'Failed to submit feedback. Please try again.';
      })
      .addCase(logout, () => initialState);
  },
});

export const {
  clearFeedbackError,
  clearFeedbackSuccess,
  resetFeedbackState,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;

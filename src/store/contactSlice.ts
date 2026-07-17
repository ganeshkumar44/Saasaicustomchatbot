import { createSlice } from '@reduxjs/toolkit';
import { submitContactThunk } from '@/store/contactThunk';
import type { ContactState } from '@/types/landing.types';

const initialState: ContactState = {
  submitting: false,
  error: null,
  successMessage: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = null;
    },
    clearContactSuccess: (state) => {
      state.successMessage = null;
    },
    resetContactState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitContactThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.error = null;
        state.successMessage = action.payload.message;
      })
      .addCase(submitContactThunk.rejected, (state, action) => {
        state.submitting = false;
        state.successMessage = null;
        state.error =
          action.payload ?? 'Failed to send your message. Please try again.';
      });
  },
});

export const {
  clearContactError,
  clearContactSuccess,
  resetContactState,
} = contactSlice.actions;

export default contactSlice.reducer;

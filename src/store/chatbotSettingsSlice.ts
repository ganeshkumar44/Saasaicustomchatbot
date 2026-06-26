import { createSlice } from '@reduxjs/toolkit';
import { fetchChatbotDetails } from '@/store/chatbotSettingsThunk';
import type { ChatbotSettingsState } from '@/types/chatbotSettings.types';

const initialState: ChatbotSettingsState = {
  chatbotDetails: null,
  loading: false,
  success: false,
  error: null,
};

const chatbotSettingsSlice = createSlice({
  name: 'chatbotSettings',
  initialState,
  reducers: {
    clearChatbotSettingsError: (state) => {
      state.error = null;
    },
    resetChatbotSettingsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchChatbotDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.chatbotDetails = action.payload.data;
      })
      .addCase(fetchChatbotDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.chatbotDetails = null;
        state.error =
          action.payload ?? 'Failed to load chatbot details. Please try again.';
      });
  },
});

export const { clearChatbotSettingsError, resetChatbotSettingsState } =
  chatbotSettingsSlice.actions;

export default chatbotSettingsSlice.reducer;

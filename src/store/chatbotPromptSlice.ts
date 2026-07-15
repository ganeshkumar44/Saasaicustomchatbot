import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatbotPrompt,
  resetChatbotPromptToDefault,
  saveChatbotPrompt,
} from '@/store/chatbotPromptThunk';
import type { ChatbotPromptState } from '@/types/chatbotPrompt.types';

const initialState: ChatbotPromptState = {
  config: null,
  loading: false,
  saving: false,
  resetting: false,
  success: false,
  error: null,
  saveSuccess: false,
  saveError: null,
  saveSuccessMessage: null,
};

function resetSaveState(state: ChatbotPromptState): void {
  state.saveSuccess = false;
  state.saveError = null;
  state.saveSuccessMessage = null;
}

const chatbotPromptSlice = createSlice({
  name: 'chatbotPrompt',
  initialState,
  reducers: {
    clearChatbotPromptError: (state) => {
      state.error = null;
    },
    clearChatbotPromptSaveState: (state) => {
      resetSaveState(state);
    },
    resetChatbotPromptState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotPrompt.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchChatbotPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.config = action.payload.data;
      })
      .addCase(fetchChatbotPrompt.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.config = null;
        state.error = action.payload ?? 'Failed to load prompt settings. Please try again.';
      })
      .addCase(saveChatbotPrompt.pending, (state) => {
        state.saving = true;
        resetSaveState(state);
      })
      .addCase(saveChatbotPrompt.fulfilled, (state, action) => {
        state.saving = false;
        state.saveSuccess = true;
        state.saveError = null;
        state.saveSuccessMessage = action.payload.message;
        state.config = action.payload.data;
      })
      .addCase(saveChatbotPrompt.rejected, (state, action) => {
        state.saving = false;
        state.saveSuccess = false;
        state.saveError = action.payload ?? 'Failed to save prompt settings. Please try again.';
      })
      .addCase(resetChatbotPromptToDefault.pending, (state) => {
        state.resetting = true;
        resetSaveState(state);
      })
      .addCase(resetChatbotPromptToDefault.fulfilled, (state, action) => {
        state.resetting = false;
        state.saveSuccess = true;
        state.saveError = null;
        state.saveSuccessMessage = action.payload.message;
        state.config = action.payload.data;
      })
      .addCase(resetChatbotPromptToDefault.rejected, (state, action) => {
        state.resetting = false;
        state.saveSuccess = false;
        state.saveError = action.payload ?? 'Failed to reset prompt settings. Please try again.';
      });
  },
});

export const {
  clearChatbotPromptError,
  clearChatbotPromptSaveState,
  resetChatbotPromptState,
} = chatbotPromptSlice.actions;

export default chatbotPromptSlice.reducer;

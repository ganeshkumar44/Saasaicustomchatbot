import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatbotDetails,
  updateAppearanceSettings,
  updateGeneralSettings,
  updateKnowledgeBase,
  updateMessageSettings,
  updateSecuritySettings,
} from '@/store/chatbotSettingsThunk';
import { activateChatbot } from '@/store/chatbotThunk';
import type { ChatbotSettingsState } from '@/types/chatbotSettings.types';

const initialState: ChatbotSettingsState = {
  chatbotDetails: null,
  loading: false,
  refreshing: false,
  success: false,
  error: null,
  generalLoading: false,
  appearanceLoading: false,
  messageLoading: false,
  securityLoading: false,
  knowledgebaseLoading: false,
  updateSuccess: false,
  updateError: null,
  updateSuccessMessage: null,
};

function resetUpdateState(state: ChatbotSettingsState): void {
  state.updateSuccess = false;
  state.updateError = null;
  state.updateSuccessMessage = null;
}

const chatbotSettingsSlice = createSlice({
  name: 'chatbotSettings',
  initialState,
  reducers: {
    clearChatbotSettingsError: (state) => {
      state.error = null;
    },
    clearChatbotSettingsUpdateState: (state) => {
      resetUpdateState(state);
    },
    resetChatbotSettingsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotDetails.pending, (state) => {
        if (state.chatbotDetails === null) {
          state.loading = true;
        } else {
          state.refreshing = true;
        }
        state.success = false;
        state.error = null;
      })
      .addCase(fetchChatbotDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.success = true;
        state.error = null;
        state.chatbotDetails = action.payload.data;
      })
      .addCase(fetchChatbotDetails.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.success = false;
        if (state.chatbotDetails === null) {
          state.chatbotDetails = null;
        }
        state.error =
          action.payload ?? 'Failed to load chatbot details. Please try again.';
      })
      .addCase(updateGeneralSettings.pending, (state) => {
        state.generalLoading = true;
        resetUpdateState(state);
      })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => {
        state.generalLoading = false;
        state.updateSuccess = true;
        state.updateSuccessMessage = action.payload.message;
      })
      .addCase(updateGeneralSettings.rejected, (state, action) => {
        state.generalLoading = false;
        state.updateError =
          action.payload ?? 'Failed to update general settings. Please try again.';
      })
      .addCase(updateAppearanceSettings.pending, (state) => {
        state.appearanceLoading = true;
        resetUpdateState(state);
      })
      .addCase(updateAppearanceSettings.fulfilled, (state, action) => {
        state.appearanceLoading = false;
        state.updateSuccess = true;
        state.updateSuccessMessage = action.payload.message;
      })
      .addCase(updateAppearanceSettings.rejected, (state, action) => {
        state.appearanceLoading = false;
        state.updateError =
          action.payload ?? 'Failed to update appearance settings. Please try again.';
      })
      .addCase(updateMessageSettings.pending, (state) => {
        state.messageLoading = true;
        resetUpdateState(state);
      })
      .addCase(updateMessageSettings.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.updateSuccess = true;
        state.updateSuccessMessage = action.payload.message;
      })
      .addCase(updateMessageSettings.rejected, (state, action) => {
        state.messageLoading = false;
        state.updateError =
          action.payload ?? 'Failed to update message settings. Please try again.';
      })
      .addCase(updateSecuritySettings.pending, (state) => {
        state.securityLoading = true;
        resetUpdateState(state);
      })
      .addCase(updateSecuritySettings.fulfilled, (state, action) => {
        state.securityLoading = false;
        state.updateSuccess = true;
        state.updateSuccessMessage = action.payload.message;
      })
      .addCase(updateSecuritySettings.rejected, (state, action) => {
        state.securityLoading = false;
        state.updateError =
          action.payload ?? 'Failed to update security settings. Please try again.';
      })
      .addCase(updateKnowledgeBase.pending, (state) => {
        state.knowledgebaseLoading = true;
        resetUpdateState(state);
      })
      .addCase(updateKnowledgeBase.fulfilled, (state, action) => {
        state.knowledgebaseLoading = false;
        state.updateSuccess = true;
        state.updateSuccessMessage = action.payload.message;
      })
      .addCase(updateKnowledgeBase.rejected, (state, action) => {
        state.knowledgebaseLoading = false;
        state.updateError =
          action.payload ?? 'Failed to update knowledge base. Please try again.';
      })
      .addCase(activateChatbot.fulfilled, (state, action) => {
        if (state.chatbotDetails?.id === action.payload.data.chatbot_id) {
          state.chatbotDetails.status = action.payload.data.status;
        }
      });
  },
});

export const {
  clearChatbotSettingsError,
  clearChatbotSettingsUpdateState,
  resetChatbotSettingsState,
} = chatbotSettingsSlice.actions;

export default chatbotSettingsSlice.reducer;

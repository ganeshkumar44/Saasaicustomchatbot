import type { RootState } from '@/store/index';

export const selectChatbotPromptConfig = (state: RootState) =>
  state.chatbotPrompt.config;

export const selectChatbotPromptLoading = (state: RootState): boolean =>
  state.chatbotPrompt.loading;

export const selectChatbotPromptSaving = (state: RootState): boolean =>
  state.chatbotPrompt.saving;

export const selectChatbotPromptResetting = (state: RootState): boolean =>
  state.chatbotPrompt.resetting;

export const selectChatbotPromptError = (state: RootState): string | null =>
  state.chatbotPrompt.error;

export const selectChatbotPromptSaveSuccess = (state: RootState): boolean =>
  state.chatbotPrompt.saveSuccess;

export const selectChatbotPromptSaveError = (state: RootState): string | null =>
  state.chatbotPrompt.saveError;

export const selectChatbotPromptSaveSuccessMessage = (state: RootState): string | null =>
  state.chatbotPrompt.saveSuccessMessage;

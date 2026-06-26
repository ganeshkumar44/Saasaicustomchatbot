import type { RootState } from '@/store/index';

export const selectChatbotDetails = (state: RootState) =>
  state.chatbotSettings.chatbotDetails;

export const selectChatbotDetailsLoading = (state: RootState): boolean =>
  state.chatbotSettings.loading;

export const selectChatbotDetailsSuccess = (state: RootState): boolean =>
  state.chatbotSettings.success;

export const selectChatbotDetailsError = (state: RootState): string | null =>
  state.chatbotSettings.error;

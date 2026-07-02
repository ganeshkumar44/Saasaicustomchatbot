import type { RootState } from '@/store/index';

export const selectRecentConversations = (state: RootState) =>
  state.dashboard.recentConversations;

export const selectRecentConversationsLoading = (state: RootState): boolean =>
  state.dashboard.loading;

export const selectRecentConversationsSuccess = (state: RootState): boolean =>
  state.dashboard.success;

export const selectRecentConversationsError = (state: RootState): string | null =>
  state.dashboard.error;

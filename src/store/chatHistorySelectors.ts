import type { RootState } from '@/store/index';

export const selectChatSessions = (state: RootState) =>
  state.chatHistory.sessions;

export const selectSelectedChatSession = (state: RootState) =>
  state.chatHistory.selectedSession;

export const selectChatSessionDetails = (state: RootState) =>
  state.chatHistory.sessionDetails;

export const selectChatHistoryCurrentPage = (state: RootState) =>
  state.chatHistory.currentPage;

export const selectChatHistoryTotalPages = (state: RootState) =>
  state.chatHistory.totalPages;

export const selectChatHistoryTotalRecords = (state: RootState) =>
  state.chatHistory.totalRecords;

export const selectChatHistoryPerPage = (state: RootState) =>
  state.chatHistory.perPage;

export const selectChatHistoryLoadingSessions = (state: RootState): boolean =>
  state.chatHistory.loadingSessions;

export const selectChatHistoryLoadingMessages = (state: RootState): boolean =>
  state.chatHistory.loadingMessages;

export const selectChatHistoryError = (state: RootState): string | null =>
  state.chatHistory.error;

import type { RootState } from '@/store';

export const selectChatbotAnalytics = (state: RootState) =>
  state.chatbotAnalytics.analytics;

export const selectChatbotAnalyticsChatbotId = (state: RootState) =>
  state.chatbotAnalytics.chatbotId;

export const selectChatbotAnalyticsLoading = (state: RootState) =>
  state.chatbotAnalytics.loading;

export const selectChatbotAnalyticsError = (state: RootState) =>
  state.chatbotAnalytics.error;

export const selectChatbotConversationsChart = (state: RootState) =>
  state.chatbotAnalytics.conversationsChart;

export const selectChatbotUsersChart = (state: RootState) =>
  state.chatbotAnalytics.usersChart;

export const selectChatbotResolutionChart = (state: RootState) =>
  state.chatbotAnalytics.resolutionChart;

export const selectChatbotResponseTimeChart = (state: RootState) =>
  state.chatbotAnalytics.responseTimeChart;

export const selectChatbotAnalyticsSelectedRange = (state: RootState) =>
  state.chatbotAnalytics.selectedRange;

export const selectChatbotConversationsChartLoading = (state: RootState) =>
  state.chatbotAnalytics.conversationsLoading;

export const selectChatbotUsersChartLoading = (state: RootState) =>
  state.chatbotAnalytics.usersLoading;

export const selectChatbotResolutionChartLoading = (state: RootState) =>
  state.chatbotAnalytics.resolutionLoading;

export const selectChatbotResponseTimeChartLoading = (state: RootState) =>
  state.chatbotAnalytics.responseTimeLoading;

export const selectChatbotConversationsChartError = (state: RootState) =>
  state.chatbotAnalytics.conversationsError;

export const selectChatbotUsersChartError = (state: RootState) =>
  state.chatbotAnalytics.usersError;

export const selectChatbotResolutionChartError = (state: RootState) =>
  state.chatbotAnalytics.resolutionError;

export const selectChatbotResponseTimeChartError = (state: RootState) =>
  state.chatbotAnalytics.responseTimeError;

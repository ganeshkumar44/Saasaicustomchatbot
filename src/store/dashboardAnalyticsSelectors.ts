import type { RootState } from '@/store/index';

export const selectDashboardAnalytics = (state: RootState) =>
  state.dashboardAnalytics.analytics;

export const selectDashboardAnalyticsLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.loading;

export const selectDashboardAnalyticsError = (state: RootState): string | null =>
  state.dashboardAnalytics.error;

export const selectConversationsChart = (state: RootState) =>
  state.dashboardAnalytics.conversationsChart;

export const selectUsersChart = (state: RootState) =>
  state.dashboardAnalytics.usersChart;

export const selectResolutionChart = (state: RootState) =>
  state.dashboardAnalytics.resolutionChart;

export const selectResponseTimeChart = (state: RootState) =>
  state.dashboardAnalytics.responseTimeChart;

export const selectSelectedAnalyticsRange = (state: RootState) =>
  state.dashboardAnalytics.selectedRange;

export const selectConversationsChartLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.conversationsLoading;

export const selectUsersChartLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.usersLoading;

export const selectResolutionChartLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.resolutionLoading;

export const selectResponseTimeChartLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.responseTimeLoading;

export const selectConversationsChartError = (state: RootState): string | null =>
  state.dashboardAnalytics.conversationsError;

export const selectUsersChartError = (state: RootState): string | null =>
  state.dashboardAnalytics.usersError;

export const selectResolutionChartError = (state: RootState): string | null =>
  state.dashboardAnalytics.resolutionError;

export const selectResponseTimeChartError = (state: RootState): string | null =>
  state.dashboardAnalytics.responseTimeError;

export const selectChartsLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.conversationsLoading
  || state.dashboardAnalytics.usersLoading
  || state.dashboardAnalytics.resolutionLoading
  || state.dashboardAnalytics.responseTimeLoading;

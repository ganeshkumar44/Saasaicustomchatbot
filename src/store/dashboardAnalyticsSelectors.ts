import type { RootState } from '@/store/index';

export const selectDashboardAnalytics = (state: RootState) =>
  state.dashboardAnalytics.analytics;

export const selectDashboardAnalyticsLoading = (state: RootState): boolean =>
  state.dashboardAnalytics.loading;

export const selectDashboardAnalyticsError = (state: RootState): string | null =>
  state.dashboardAnalytics.error;

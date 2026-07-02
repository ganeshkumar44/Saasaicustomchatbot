import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardAnalytics } from '@/store/dashboardAnalyticsThunk';
import type { DashboardAnalyticsState } from '@/types/dashboardAnalytics.types';

const initialState: DashboardAnalyticsState = {
  analytics: null,
  loading: false,
  error: null,
};

const dashboardAnalyticsSlice = createSlice({
  name: 'dashboardAnalytics',
  initialState,
  reducers: {
    clearDashboardAnalyticsError: (state) => {
      state.error = null;
    },
    resetDashboardAnalyticsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.analytics = action.payload.data;
      })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.analytics = null;
        state.error =
          action.payload ?? 'Failed to load dashboard analytics. Please try again.';
      });
  },
});

export const { clearDashboardAnalyticsError, resetDashboardAnalyticsState } =
  dashboardAnalyticsSlice.actions;

export default dashboardAnalyticsSlice.reducer;

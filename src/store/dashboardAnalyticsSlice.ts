import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchConversationsChart,
  fetchDashboardAnalytics,
  fetchUsersChart,
} from '@/store/dashboardAnalyticsThunk';
import type {
  AnalyticsRange,
  DashboardAnalyticsState,
} from '@/types/dashboardAnalytics.types';
import { DEFAULT_ANALYTICS_RANGE } from '@/utils/analyticsChart';

const initialState: DashboardAnalyticsState = {
  analytics: null,
  loading: false,
  error: null,
  conversationsChart: [],
  usersChart: [],
  selectedRange: DEFAULT_ANALYTICS_RANGE,
  conversationsLoading: false,
  usersLoading: false,
  conversationsError: null,
  usersError: null,
};

const dashboardAnalyticsSlice = createSlice({
  name: 'dashboardAnalytics',
  initialState,
  reducers: {
    clearDashboardAnalyticsError: (state) => {
      state.error = null;
    },
    clearConversationsChartError: (state) => {
      state.conversationsError = null;
    },
    clearUsersChartError: (state) => {
      state.usersError = null;
    },
    setSelectedAnalyticsRange: (state, action: PayloadAction<AnalyticsRange>) => {
      state.selectedRange = action.payload;
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
      })
      .addCase(fetchConversationsChart.pending, (state) => {
        state.conversationsLoading = true;
        state.conversationsError = null;
      })
      .addCase(fetchConversationsChart.fulfilled, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsError = null;
        state.conversationsChart = action.payload.data;
        state.selectedRange = action.payload.range;
      })
      .addCase(fetchConversationsChart.rejected, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsChart = [];
        state.conversationsError =
          action.payload ?? 'Failed to load conversations chart. Please try again.';
      })
      .addCase(fetchUsersChart.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchUsersChart.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersError = null;
        state.usersChart = action.payload.data;
        state.selectedRange = action.payload.range;
      })
      .addCase(fetchUsersChart.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersChart = [];
        state.usersError =
          action.payload ?? 'Failed to load users chart. Please try again.';
      });
  },
});

export const {
  clearDashboardAnalyticsError,
  clearConversationsChartError,
  clearUsersChartError,
  setSelectedAnalyticsRange,
  resetDashboardAnalyticsState,
} = dashboardAnalyticsSlice.actions;

export default dashboardAnalyticsSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchChatbotAnalytics,
  fetchChatbotConversationsChart,
  fetchChatbotResolutionChart,
  fetchChatbotResponseTimeChart,
  fetchChatbotUsersChart,
} from '@/store/chatbotAnalyticsThunk';
import type {
  AnalyticsRange,
  DashboardAnalyticsState,
} from '@/types/dashboardAnalytics.types';
import { DEFAULT_ANALYTICS_RANGE } from '@/utils/analyticsChart';

export interface ChatbotAnalyticsState extends DashboardAnalyticsState {
  chatbotId: number | null;
}

const initialState: ChatbotAnalyticsState = {
  chatbotId: null,
  analytics: null,
  loading: false,
  error: null,
  conversationsChart: [],
  usersChart: [],
  resolutionChart: [],
  responseTimeChart: [],
  selectedRange: DEFAULT_ANALYTICS_RANGE,
  conversationsLoading: false,
  usersLoading: false,
  resolutionLoading: false,
  responseTimeLoading: false,
  conversationsError: null,
  usersError: null,
  resolutionError: null,
  responseTimeError: null,
};

const chatbotAnalyticsSlice = createSlice({
  name: 'chatbotAnalytics',
  initialState,
  reducers: {
    clearChatbotAnalyticsError: (state) => {
      state.error = null;
    },
    setChatbotAnalyticsSelectedRange: (
      state,
      action: PayloadAction<AnalyticsRange>,
    ) => {
      state.selectedRange = action.payload;
    },
    resetChatbotAnalyticsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotAnalytics.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.chatbotId = action.meta.arg.chatbotId;
      })
      .addCase(fetchChatbotAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chatbotId = action.payload.chatbotId;
        state.analytics = action.payload.data;
      })
      .addCase(fetchChatbotAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.analytics = null;
        state.error =
          action.payload ?? 'Failed to load chatbot analytics. Please try again.';
      })
      .addCase(fetchChatbotConversationsChart.pending, (state) => {
        state.conversationsLoading = true;
        state.conversationsError = null;
      })
      .addCase(fetchChatbotConversationsChart.fulfilled, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsError = null;
        state.conversationsChart = action.payload.data;
        state.selectedRange = action.payload.range;
        state.chatbotId = action.payload.chatbotId;
      })
      .addCase(fetchChatbotConversationsChart.rejected, (state, action) => {
        state.conversationsLoading = false;
        state.conversationsChart = [];
        state.conversationsError =
          action.payload ?? 'Failed to load conversations chart. Please try again.';
      })
      .addCase(fetchChatbotUsersChart.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchChatbotUsersChart.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersError = null;
        state.usersChart = action.payload.data;
        state.selectedRange = action.payload.range;
        state.chatbotId = action.payload.chatbotId;
      })
      .addCase(fetchChatbotUsersChart.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersChart = [];
        state.usersError =
          action.payload ?? 'Failed to load users chart. Please try again.';
      })
      .addCase(fetchChatbotResolutionChart.pending, (state) => {
        state.resolutionLoading = true;
        state.resolutionError = null;
      })
      .addCase(fetchChatbotResolutionChart.fulfilled, (state, action) => {
        state.resolutionLoading = false;
        state.resolutionError = null;
        state.resolutionChart = action.payload.data;
        state.selectedRange = action.payload.range;
        state.chatbotId = action.payload.chatbotId;
      })
      .addCase(fetchChatbotResolutionChart.rejected, (state, action) => {
        state.resolutionLoading = false;
        state.resolutionChart = [];
        state.resolutionError =
          action.payload ?? 'Failed to load resolution chart. Please try again.';
      })
      .addCase(fetchChatbotResponseTimeChart.pending, (state) => {
        state.responseTimeLoading = true;
        state.responseTimeError = null;
      })
      .addCase(fetchChatbotResponseTimeChart.fulfilled, (state, action) => {
        state.responseTimeLoading = false;
        state.responseTimeError = null;
        state.responseTimeChart = action.payload.data;
        state.selectedRange = action.payload.range;
        state.chatbotId = action.payload.chatbotId;
      })
      .addCase(fetchChatbotResponseTimeChart.rejected, (state, action) => {
        state.responseTimeLoading = false;
        state.responseTimeChart = [];
        state.responseTimeError =
          action.payload ?? 'Failed to load response time chart. Please try again.';
      });
  },
});

export const {
  clearChatbotAnalyticsError,
  setChatbotAnalyticsSelectedRange,
  resetChatbotAnalyticsState,
} = chatbotAnalyticsSlice.actions;

export default chatbotAnalyticsSlice.reducer;

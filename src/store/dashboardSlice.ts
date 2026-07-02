import { createSlice } from '@reduxjs/toolkit';
import { fetchRecentConversations } from '@/store/dashboardThunk';
import type { DashboardState } from '@/types/dashboard.types';

const initialState: DashboardState = {
  recentConversations: [],
  loading: false,
  success: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    resetDashboardState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentConversations.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchRecentConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.recentConversations = action.payload.data;
      })
      .addCase(fetchRecentConversations.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.recentConversations = [];
        state.error =
          action.payload ?? 'Failed to load recent conversations. Please try again.';
      });
  },
});

export const { clearDashboardError, resetDashboardState } = dashboardSlice.actions;

export default dashboardSlice.reducer;

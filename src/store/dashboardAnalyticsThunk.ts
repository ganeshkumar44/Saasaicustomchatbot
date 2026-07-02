import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardAnalytics } from '@/services/dashboardAnalysis.service';
import type { DashboardAnalytics } from '@/types/dashboardAnalytics.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchDashboardAnalyticsPayload {
  message: string;
  data: DashboardAnalytics;
}

export const fetchDashboardAnalytics = createAsyncThunk<
  FetchDashboardAnalyticsPayload,
  void,
  { rejectValue: string }
>('dashboardAnalytics/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await getDashboardAnalytics();
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

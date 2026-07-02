import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getConversationsChart,
  getResolutionChart,
  getResponseTimeChart,
  getUsersChart,
} from '@/services/analytics.service';
import { getDashboardAnalytics } from '@/services/dashboardAnalysis.service';
import type {
  AnalyticsRange,
  ChartPoint,
  DashboardAnalytics,
  ResolutionChartItem,
  ResponseTimeChartItem,
} from '@/types/dashboardAnalytics.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchDashboardAnalyticsPayload {
  message: string;
  data: DashboardAnalytics;
}

interface FetchConversationsChartPayload {
  range: AnalyticsRange;
  data: ChartPoint[];
}

interface FetchUsersChartPayload {
  range: AnalyticsRange;
  data: ChartPoint[];
}

interface FetchResolutionChartPayload {
  range: AnalyticsRange;
  data: ResolutionChartItem[];
}

interface FetchResponseTimeChartPayload {
  range: AnalyticsRange;
  data: ResponseTimeChartItem[];
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

export const fetchConversationsChart = createAsyncThunk<
  FetchConversationsChartPayload,
  AnalyticsRange,
  { rejectValue: string }
>('dashboardAnalytics/fetchConversationsChart', async (range, { rejectWithValue }) => {
  try {
    const response = await getConversationsChart(range);
    return {
      range,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchUsersChart = createAsyncThunk<
  FetchUsersChartPayload,
  AnalyticsRange,
  { rejectValue: string }
>('dashboardAnalytics/fetchUsersChart', async (range, { rejectWithValue }) => {
  try {
    const response = await getUsersChart(range);
    return {
      range,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchResolutionChart = createAsyncThunk<
  FetchResolutionChartPayload,
  AnalyticsRange,
  { rejectValue: string }
>('dashboardAnalytics/fetchResolutionChart', async (range, { rejectWithValue }) => {
  try {
    const response = await getResolutionChart(range);
    return {
      range,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchResponseTimeChart = createAsyncThunk<
  FetchResponseTimeChartPayload,
  AnalyticsRange,
  { rejectValue: string }
>('dashboardAnalytics/fetchResponseTimeChart', async (range, { rejectWithValue }) => {
  try {
    const response = await getResponseTimeChart(range);
    return {
      range,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

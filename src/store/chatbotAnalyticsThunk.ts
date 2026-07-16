import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChatbotAnalytics,
  getChatbotConversationsChart,
  getChatbotResolutionChart,
  getChatbotResponseTimeChart,
  getChatbotUsersChart,
} from '@/services/chatbotAnalytics.service';
import type {
  AnalyticsRange,
  ChartPoint,
  DashboardAnalytics,
  ResolutionChartItem,
  ResponseTimeChartItem,
} from '@/types/dashboardAnalytics.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface ChatbotAnalyticsArg {
  chatbotId: number;
}

interface ChatbotChartArg {
  chatbotId: number;
  range: AnalyticsRange;
}

interface FetchChatbotAnalyticsPayload {
  chatbotId: number;
  message: string;
  data: DashboardAnalytics;
}

interface FetchChatbotConversationsChartPayload {
  chatbotId: number;
  range: AnalyticsRange;
  data: ChartPoint[];
}

interface FetchChatbotUsersChartPayload {
  chatbotId: number;
  range: AnalyticsRange;
  data: ChartPoint[];
}

interface FetchChatbotResolutionChartPayload {
  chatbotId: number;
  range: AnalyticsRange;
  data: ResolutionChartItem[];
}

interface FetchChatbotResponseTimeChartPayload {
  chatbotId: number;
  range: AnalyticsRange;
  data: ResponseTimeChartItem[];
}

export const fetchChatbotAnalytics = createAsyncThunk<
  FetchChatbotAnalyticsPayload,
  ChatbotAnalyticsArg,
  { rejectValue: string }
>('chatbotAnalytics/fetch', async ({ chatbotId }, { rejectWithValue }) => {
  try {
    const response = await getChatbotAnalytics(chatbotId);
    return {
      chatbotId,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchChatbotConversationsChart = createAsyncThunk<
  FetchChatbotConversationsChartPayload,
  ChatbotChartArg,
  { rejectValue: string }
>(
  'chatbotAnalytics/fetchConversationsChart',
  async ({ chatbotId, range }, { rejectWithValue }) => {
    try {
      const response = await getChatbotConversationsChart(chatbotId, range);
      return {
        chatbotId,
        range,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const fetchChatbotUsersChart = createAsyncThunk<
  FetchChatbotUsersChartPayload,
  ChatbotChartArg,
  { rejectValue: string }
>(
  'chatbotAnalytics/fetchUsersChart',
  async ({ chatbotId, range }, { rejectWithValue }) => {
    try {
      const response = await getChatbotUsersChart(chatbotId, range);
      return {
        chatbotId,
        range,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const fetchChatbotResolutionChart = createAsyncThunk<
  FetchChatbotResolutionChartPayload,
  ChatbotChartArg,
  { rejectValue: string }
>(
  'chatbotAnalytics/fetchResolutionChart',
  async ({ chatbotId, range }, { rejectWithValue }) => {
    try {
      const response = await getChatbotResolutionChart(chatbotId, range);
      return {
        chatbotId,
        range,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const fetchChatbotResponseTimeChart = createAsyncThunk<
  FetchChatbotResponseTimeChartPayload,
  ChatbotChartArg,
  { rejectValue: string }
>(
  'chatbotAnalytics/fetchResponseTimeChart',
  async ({ chatbotId, range }, { rejectWithValue }) => {
    try {
      const response = await getChatbotResponseTimeChart(chatbotId, range);
      return {
        chatbotId,
        range,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

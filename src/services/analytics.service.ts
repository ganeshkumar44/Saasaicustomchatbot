import { apiClient } from '@/api/axios';
import type {
  AnalyticsRange,
  ConversationsChartResponse,
  ResolutionChartResponse,
  ResponseTimeChartResponse,
  UsersChartResponse,
} from '@/types/dashboardAnalytics.types';

export async function getConversationsChart(
  range: AnalyticsRange,
): Promise<ConversationsChartResponse> {
  const response = await apiClient.get<ConversationsChartResponse>(
    '/v1/analysis/conversations-chart',
    { params: { range } },
  );
  return response.data;
}

export async function getUsersChart(
  range: AnalyticsRange,
): Promise<UsersChartResponse> {
  const response = await apiClient.get<UsersChartResponse>(
    '/v1/analysis/users-chart',
    { params: { range } },
  );
  return response.data;
}

export async function getResolutionChart(
  range: AnalyticsRange,
): Promise<ResolutionChartResponse> {
  const response = await apiClient.get<ResolutionChartResponse>(
    '/v1/analysis/resolution-chart',
    { params: { range } },
  );
  return response.data;
}

export async function getResponseTimeChart(
  range: AnalyticsRange,
): Promise<ResponseTimeChartResponse> {
  const response = await apiClient.get<ResponseTimeChartResponse>(
    '/v1/analysis/response-time-chart',
    { params: { range } },
  );
  return response.data;
}

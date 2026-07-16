import { apiClient } from '@/api/axios';
import type {
  AnalyticsRange,
  ConversationsChartResponse,
  DashboardAnalyticsResponse,
  ResolutionChartResponse,
  ResponseTimeChartResponse,
  UsersChartResponse,
} from '@/types/dashboardAnalytics.types';

export async function getChatbotAnalytics(
  chatbotId: number,
): Promise<DashboardAnalyticsResponse> {
  const response = await apiClient.get<DashboardAnalyticsResponse>(
    `/v1/chatbots/${chatbotId}/analytics`,
  );
  return response.data;
}

export async function getChatbotConversationsChart(
  chatbotId: number,
  range: AnalyticsRange,
): Promise<ConversationsChartResponse> {
  const response = await apiClient.get<ConversationsChartResponse>(
    `/v1/chatbots/${chatbotId}/analytics/conversations-chart`,
    { params: { range } },
  );
  return response.data;
}

export async function getChatbotUsersChart(
  chatbotId: number,
  range: AnalyticsRange,
): Promise<UsersChartResponse> {
  const response = await apiClient.get<UsersChartResponse>(
    `/v1/chatbots/${chatbotId}/analytics/users-chart`,
    { params: { range } },
  );
  return response.data;
}

export async function getChatbotResolutionChart(
  chatbotId: number,
  range: AnalyticsRange,
): Promise<ResolutionChartResponse> {
  const response = await apiClient.get<ResolutionChartResponse>(
    `/v1/chatbots/${chatbotId}/analytics/resolution-chart`,
    { params: { range } },
  );
  return response.data;
}

export async function getChatbotResponseTimeChart(
  chatbotId: number,
  range: AnalyticsRange,
): Promise<ResponseTimeChartResponse> {
  const response = await apiClient.get<ResponseTimeChartResponse>(
    `/v1/chatbots/${chatbotId}/analytics/response-time-chart`,
    { params: { range } },
  );
  return response.data;
}

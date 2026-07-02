import { apiClient } from '@/api/axios';
import type { DashboardAnalyticsResponse } from '@/types/dashboardAnalytics.types';

export async function getDashboardAnalytics(): Promise<DashboardAnalyticsResponse> {
  const response = await apiClient.get<DashboardAnalyticsResponse>(
    '/v1/analysis/merge-details',
  );
  return response.data;
}

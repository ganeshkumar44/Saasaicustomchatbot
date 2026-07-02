import type {
  AnalyticsRange,
  ChartPoint,
  ConversationsChartRow,
  UsersChartRow,
} from '@/types/dashboardAnalytics.types';

export const DEFAULT_ANALYTICS_RANGE: AnalyticsRange = '7d';

const RANGE_LABELS: Record<AnalyticsRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  '1y': 'Last year',
  all: 'All time',
};

export function getAnalyticsRangeLabel(range: AnalyticsRange): string {
  return RANGE_LABELS[range];
}

export function mapConversationsChartData(
  points: ChartPoint[],
): ConversationsChartRow[] {
  return points.map((point) => ({
    id: point.label.toLowerCase(),
    name: point.label,
    conversations: point.value,
  }));
}

export function mapUsersChartData(points: ChartPoint[]): UsersChartRow[] {
  return points.map((point) => ({
    id: point.label.toLowerCase(),
    name: point.label,
    users: point.value,
  }));
}

export function isChartDataEmpty(points: ChartPoint[]): boolean {
  return points.length === 0 || points.every((point) => point.value === 0);
}

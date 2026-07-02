import type {
  AnalyticsRange,
  ChartPoint,
  ConversationsChartRow,
  ResolutionChartItem,
  ResolutionChartRow,
  ResponseTimeChartItem,
  ResponseTimeChartRow,
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

export const ANALYTICS_RANGE_OPTIONS: AnalyticsRange[] = [
  '7d',
  '30d',
  '90d',
  '1y',
  'all',
];

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

export function mapResolutionChartData(
  points: ResolutionChartItem[],
): ResolutionChartRow[] {
  return points.map((point) => ({
    id: point.label.toLowerCase(),
    date: point.label,
    resolved: point.resolved,
    unresolved: point.unresolved,
  }));
}

export function mapResponseTimeChartData(
  points: ResponseTimeChartItem[],
): ResponseTimeChartRow[] {
  return points.map((point) => ({
    id: point.label.toLowerCase(),
    hour: point.label,
    time: Number.parseFloat(point.value) || 0,
  }));
}

export function isResolutionChartEmpty(points: ResolutionChartItem[]): boolean {
  return (
    points.length === 0
    || points.every((point) => point.resolved === 0 && point.unresolved === 0)
  );
}

export function isResponseTimeChartEmpty(points: ResponseTimeChartItem[]): boolean {
  return (
    points.length === 0
    || points.every((point) => (Number.parseFloat(point.value) || 0) === 0)
  );
}

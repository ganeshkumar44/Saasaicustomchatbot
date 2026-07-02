export type AnalyticsTrend = 'up' | 'down';

export interface DashboardAnalytics {
  total_chatbots: number;
  total_conversations: number;
  total_conversations_change: string;
  total_conversations_trend: AnalyticsTrend;
  total_visitors: number;
  total_visitors_change: string;
  total_visitors_trend: AnalyticsTrend;
  resolved_conversations: number;
  unresolved_conversations: number;
  resolution_rate: string;
  resolution_rate_change: string;
  resolution_rate_trend: AnalyticsTrend;
  average_response_time: string;
  average_response_time_change: string;
  average_response_time_trend: AnalyticsTrend;
  total_messages: number;
  total_user_messages: number;
  total_bot_messages: number;
}

export interface DashboardAnalyticsResponse {
  success: true;
  message: string;
  data: DashboardAnalytics;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export type AnalyticsRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface ConversationsChartResponse {
  success: true;
  range: string;
  data: ChartPoint[];
}

export interface UsersChartResponse {
  success: true;
  range: string;
  data: ChartPoint[];
}

export interface ConversationsChartRow {
  id: string;
  name: string;
  conversations: number;
}

export interface UsersChartRow {
  id: string;
  name: string;
  users: number;
}

export interface ResolutionChartItem {
  label: string;
  resolved: number;
  unresolved: number;
}

export interface ResponseTimeChartItem {
  label: string;
  value: string;
}

export interface ResolutionChartResponse {
  success: true;
  range: string;
  data: ResolutionChartItem[];
}

export interface ResponseTimeChartResponse {
  success: true;
  range: string;
  data: ResponseTimeChartItem[];
}

export interface ResolutionChartRow {
  id: string;
  date: string;
  resolved: number;
  unresolved: number;
}

export interface ResponseTimeChartRow {
  id: string;
  hour: string;
  time: number;
}

export interface DashboardAnalyticsState {
  analytics: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
  conversationsChart: ChartPoint[];
  usersChart: ChartPoint[];
  resolutionChart: ResolutionChartItem[];
  responseTimeChart: ResponseTimeChartItem[];
  selectedRange: AnalyticsRange;
  conversationsLoading: boolean;
  usersLoading: boolean;
  resolutionLoading: boolean;
  responseTimeLoading: boolean;
  conversationsError: string | null;
  usersError: string | null;
  resolutionError: string | null;
  responseTimeError: string | null;
}

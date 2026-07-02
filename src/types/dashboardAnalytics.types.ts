export interface DashboardAnalytics {
  total_chatbots: number;
  total_conversations: number;
  total_visitors: number;
  resolved_conversations: number;
  unresolved_conversations: number;
  resolution_rate: string;
  average_response_time: string;
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

export interface DashboardAnalyticsState {
  analytics: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
  conversationsChart: ChartPoint[];
  usersChart: ChartPoint[];
  selectedRange: AnalyticsRange;
  conversationsLoading: boolean;
  usersLoading: boolean;
  conversationsError: string | null;
  usersError: string | null;
}

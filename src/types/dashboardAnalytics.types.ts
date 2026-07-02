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

export interface DashboardAnalyticsState {
  analytics: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
}

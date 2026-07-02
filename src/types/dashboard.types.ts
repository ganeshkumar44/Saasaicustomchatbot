export type RecentConversationStatus = 'active' | 'resolved';

export interface RecentConversation {
  chat_session_id: number;
  chatbot_id: number;
  chatbot_name: string | null;
  visitor_name: string | null;
  user_question: string;
  message_time: string;
  status: RecentConversationStatus;
}

export interface RecentConversationsResponse {
  success: true;
  message: string;
  data: RecentConversation[];
}

export interface DashboardState {
  recentConversations: RecentConversation[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

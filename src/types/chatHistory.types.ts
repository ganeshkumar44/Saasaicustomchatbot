export type ChatSessionStatus = 'active' | 'resolved';

export interface ChatSession {
  chat_session_id: number;
  chatbot_id: number;
  chatbot_name: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  first_message: string | null;
  total_messages: number;
  session_started_at: string;
  last_activity: string;
  status: ChatSessionStatus;
}

export interface ChatHistoryMessage {
  user_message: string;
  bot_response: string;
  response_time: string | null;
  created_at: string;
}

export interface ChatSessionDetails {
  chat_session_id: number;
  chatbot_id: number;
  chatbot_name: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  session_started_at: string;
  status: ChatSessionStatus;
  messages: ChatHistoryMessage[];
}

export interface ChatSessionsResponse {
  success: true;
  message: string;
  page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  data: ChatSession[];
}

export interface ChatSessionDetailsResponse {
  success: true;
  message: string;
  data: ChatSessionDetails;
}

export interface ChatHistoryState {
  sessions: ChatSession[];
  selectedSession: ChatSession | null;
  sessionDetails: ChatSessionDetails | null;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  perPage: number;
  loadingSessions: boolean;
  loadingMessages: boolean;
  error: string | null;
}

export interface FetchChatSessionsParams {
  page: number;
  perPage: number;
}

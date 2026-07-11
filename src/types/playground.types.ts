export type PlaygroundSender = 'user' | 'assistant';

export interface PlaygroundSession {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface PlaygroundMessage {
  id: number;
  sender: PlaygroundSender;
  message: string;
  response_time: string | number | null;
  tokens_used: number | null;
  created_at: string;
}

export interface PlaygroundSessionListResponse {
  success: true;
  data: PlaygroundSession[];
}

export interface CreatePlaygroundSessionRequest {
  chatbot_id: number;
  title?: string | null;
}

export interface CreatePlaygroundSessionResponse {
  success: true;
  message: string;
  data: PlaygroundSession;
}

export interface DeletePlaygroundSessionResponse {
  success: true;
  message: string;
}

export interface PlaygroundMessagesResponse {
  success: true;
  data: PlaygroundMessage[];
}

export interface PlaygroundTestAnswerRequest {
  chatbot_id: number;
  question: string;
  session_id: number;
}

export interface PlaygroundTestAnswerResponse {
  success: true;
  question: string;
  answer: string;
}

export interface PlaygroundState {
  chatbotId: number | null;
  sessions: PlaygroundSession[];
  currentSessionId: number | null;
  messages: PlaygroundMessage[];
  loadingSessions: boolean;
  loadingMessages: boolean;
  creatingSession: boolean;
  deletingSession: boolean;
  sending: boolean;
  initializing: boolean;
  error: string | null;
  sendError: string | null;
}

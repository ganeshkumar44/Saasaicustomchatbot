export interface KnowledgebaseDocument {
  id: number;
  chatbot_id: number;
  source_type: 'file' | 'url';
  original_file_name: string | null;
  url: string | null;
}

export interface ChatbotDetails {
  id: number;
  user_id: number;
  chatbot_name: string | null;
  description: string | null;
  personality: string | null;
  ai_model: string | null;
  language: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  settings_id: number;
  public_key: string;
  embed_code: string;
  allowed_domains: string;
  typing_indicator: boolean;
  primary_color: string;
  text_color: string;
  widget_position: string;
  show_avatar: boolean;
  chat_title: string;
  welcome_message: string;
  input_placeholder: string;
  settings_created_at: string;
  settings_updated_at: string;
  knowledgebase_documents: KnowledgebaseDocument[];
}

export interface ChatbotDetailsResponse {
  success: true;
  message: string;
  data: ChatbotDetails;
}

export interface ChatbotSettingsState {
  chatbotDetails: ChatbotDetails | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

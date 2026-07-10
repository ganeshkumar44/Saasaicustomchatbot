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

export interface SettingsUpdateResponse {
  success: true;
  message: string;
  status?: 'processing' | 'completed' | 'failed';
}

export interface GeneralSettingsRequest {
  chatbot_id: number;
  chatbot_name: string;
  description: string;
  typing_indicator: boolean;
}

export interface AppearanceSettingsRequest {
  chatbot_id: number;
  primary_color: string;
  widget_position: string;
  show_avatar: boolean;
}

export interface MessageSettingsRequest {
  chatbot_id: number;
  chat_title: string;
  welcome_message: string;
  input_placeholder: string;
}

export interface SecuritySettingsRequest {
  chatbot_id: number;
  ai_model: string;
  allowed_domains: string[];
}

export interface KnowledgeBaseSettingsRequest {
  chatbot_id: number;
  delete_document_ids: number[];
  files: File[];
  urls: string[];
}

export interface GeneralSettingsForm {
  chatbot_name: string;
  description: string;
  typing_indicator: boolean;
}

export interface AppearanceSettingsForm {
  primary_color: string;
  widget_position: string;
  show_avatar: boolean;
}

export interface MessageSettingsForm {
  chat_title: string;
  welcome_message: string;
  input_placeholder: string;
}

export interface SecuritySettingsForm {
  ai_model: string;
  allowed_domains: string;
}

export interface ChatbotSettingsState {
  chatbotDetails: ChatbotDetails | null;
  loading: boolean;
  refreshing: boolean;
  success: boolean;
  error: string | null;
  generalLoading: boolean;
  appearanceLoading: boolean;
  messageLoading: boolean;
  securityLoading: boolean;
  knowledgebaseLoading: boolean;
  updateSuccess: boolean;
  updateError: string | null;
  updateSuccessMessage: string | null;
}

export type PreviewState = Pick<
  ChatbotSettingsState,
  'chatbotDetails' | 'loading' | 'error' | 'success'
>;

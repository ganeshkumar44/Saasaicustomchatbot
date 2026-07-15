export interface ChatbotPromptConfig {
  system_prompt: string;
  tone: string;
  response_style: string;
  response_length: string;
  language: string;
  extra_instruction: string;
}

export interface ChatbotPromptSuccessResponse {
  success: boolean;
  message: string;
  data: ChatbotPromptConfig;
}

export interface UpdateChatbotPromptRequest {
  system_prompt: string;
  tone: string;
  response_style: string;
  response_length: string;
  language: string;
  extra_instruction: string;
}

export interface ChatbotPromptState {
  config: ChatbotPromptConfig | null;
  loading: boolean;
  saving: boolean;
  resetting: boolean;
  success: boolean;
  error: string | null;
  saveSuccess: boolean;
  saveError: string | null;
  saveSuccessMessage: string | null;
}

export const EMPTY_CHATBOT_PROMPT: ChatbotPromptConfig = {
  system_prompt: '',
  tone: '',
  response_style: '',
  response_length: '',
  language: '',
  extra_instruction: '',
};

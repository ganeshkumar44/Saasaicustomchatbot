export interface PlanLimits {
  plan_name: string;
  max_chatbots: number;
  chatbot_message_limit: number | null;
  playground_message_limit: number | null;
  chatbot_message_unlimited: boolean;
  playground_message_unlimited: boolean;
}

export interface ChatbotUsage {
  chatbot_id: number;
  website_messages_used: number;
  playground_messages_used: number;
  website_tokens_used: number;
  playground_tokens_used: number;
  website_last_reset_at: string | null;
  playground_last_reset_at: string | null;
  limits: PlanLimits;
}

export interface ChatbotUsageSuccessResponse {
  success: true;
  data: ChatbotUsage;
}

export interface SubscriptionState {
  loading: boolean;
  error: string | null;
  plan: string | null;
  limits: PlanLimits | null;
  usage: ChatbotUsage | null;
  playgroundMessagingDisabled: boolean;
  playgroundLimitMessage: string | null;
}

export const PLAYGROUND_MESSAGE_LIMIT_ERROR_CODE = 'PLAYGROUND_MESSAGE_LIMIT_REACHED';
export const WEBSITE_MESSAGE_LIMIT_ERROR_CODE = 'WEBSITE_MESSAGE_LIMIT_REACHED';

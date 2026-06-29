import type {
  AppearanceSettingsForm,
  ChatbotDetails,
  GeneralSettingsForm,
  MessageSettingsForm,
  SecuritySettingsForm,
} from '@/types/chatbotSettings.types';

export function mapDetailsToGeneralForm(details: ChatbotDetails): GeneralSettingsForm {
  return {
    chatbot_name: details.chatbot_name ?? '',
    description: details.description ?? '',
    typing_indicator: details.typing_indicator,
  };
}

export function mapDetailsToAppearanceForm(
  details: ChatbotDetails,
): AppearanceSettingsForm {
  return {
    primary_color: details.primary_color,
    widget_position: details.widget_position,
    show_avatar: details.show_avatar,
  };
}

export function mapDetailsToMessageForm(details: ChatbotDetails): MessageSettingsForm {
  return {
    chat_title: details.chat_title,
    welcome_message: details.welcome_message,
    input_placeholder: details.input_placeholder,
  };
}

export function mapDetailsToSecurityForm(details: ChatbotDetails): SecuritySettingsForm {
  return {
    ai_model: details.ai_model ?? '',
    allowed_domains: details.allowed_domains,
  };
}

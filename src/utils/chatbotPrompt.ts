import type { ChatbotPromptConfig } from '@/types/chatbotPrompt.types';

export function isCustomPromptEnabled(config: ChatbotPromptConfig | null): boolean {
  if (!config) {
    return false;
  }

  return Object.values(config).some((value) => value.trim().length > 0);
}

export function configsAreEqual(
  left: ChatbotPromptConfig,
  right: ChatbotPromptConfig,
): boolean {
  return (
    left.system_prompt === right.system_prompt
    && left.tone === right.tone
    && left.response_style === right.response_style
    && left.response_length === right.response_length
    && left.language === right.language
    && left.extra_instruction === right.extra_instruction
  );
}

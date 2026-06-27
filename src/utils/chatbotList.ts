import type { ChatbotListItem } from '@/types/chatbot.types';

export function filterPublishedChatbots(
  chatbots: ChatbotListItem[],
): ChatbotListItem[] {
  return chatbots.filter((chatbot) => chatbot.status === 'published');
}

export function isChatbotActive(status: string): boolean {
  return status === 'published';
}

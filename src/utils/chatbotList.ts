import type {
  ChatbotListItem,
  ChatbotStatusFilter,
} from '@/types/chatbot.types';

export const DASHBOARD_RECENT_CHATBOT_LIMIT = 3;
export const CHATBOT_LIST_PAGE_SIZE = 9;

export function filterPublishedChatbots(
  chatbots: ChatbotListItem[],
): ChatbotListItem[] {
  return chatbots.filter((chatbot) => chatbot.status === 'published');
}

export function isChatbotActive(status: string): boolean {
  return status === 'published';
}

export function sortChatbotsByUpdatedAtDesc(
  chatbots: ChatbotListItem[],
): ChatbotListItem[] {
  return [...chatbots].sort(
    (left, right) =>
      new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime(),
  );
}

export function getRecentChatbots(
  chatbots: ChatbotListItem[],
  limit: number,
): ChatbotListItem[] {
  return sortChatbotsByUpdatedAtDesc(chatbots).slice(0, limit);
}

export function filterChatbotsBySearch(
  chatbots: ChatbotListItem[],
  searchTerm: string,
): ChatbotListItem[] {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return chatbots;
  }

  return chatbots.filter((chatbot) => {
    const chatbotName = chatbot.chatbot_name?.toLowerCase() ?? '';
    const description = chatbot.description?.toLowerCase() ?? '';

    return chatbotName.includes(query) || description.includes(query);
  });
}

export function filterChatbotsByStatus(
  chatbots: ChatbotListItem[],
  statusFilter: ChatbotStatusFilter,
): ChatbotListItem[] {
  if (statusFilter === 'all') {
    return chatbots;
  }

  return chatbots.filter(
    (chatbot) => chatbot.status.toLowerCase() === statusFilter,
  );
}

export function getAvailableStatusFilters(
  chatbots: ChatbotListItem[],
): ChatbotStatusFilter[] {
  const filters: ChatbotStatusFilter[] = ['all', 'published', 'draft'];
  const hasArchived = chatbots.some(
    (chatbot) => chatbot.status.toLowerCase() === 'archived',
  );

  if (hasArchived) {
    filters.push('archived');
  }

  return filters;
}

export function getChatbotsPageStatusFilters(
  chatbots: ChatbotListItem[],
): ChatbotStatusFilter[] {
  const filters: ChatbotStatusFilter[] = ['all', 'published'];
  const hasArchived = chatbots.some(
    (chatbot) => chatbot.status.toLowerCase() === 'archived',
  );

  if (hasArchived) {
    filters.push('archived');
  }

  return filters;
}

export function getStatusFilterLabel(statusFilter: ChatbotStatusFilter): string {
  switch (statusFilter) {
    case 'all':
      return 'All';
    case 'published':
      return 'Published';
    case 'draft':
      return 'Draft';
    case 'archived':
      return 'Archived';
    default:
      return statusFilter;
  }
}

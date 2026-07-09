import type {
  ChatbotListItem,
  ChatbotStatusFilter,
} from '@/types/chatbot.types';

export const DASHBOARD_RECENT_CHATBOT_LIMIT = 3;
export const CHATBOT_LIST_PAGE_SIZE = 9;

export const CHATBOTS_PAGE_STATUS_FILTERS: ChatbotStatusFilter[] = [
  'all',
  'published',
  'draft',
  'deleted',
];

export function filterPublishedChatbots(
  chatbots: ChatbotListItem[],
): ChatbotListItem[] {
  return chatbots.filter((chatbot) => chatbot.status === 'published');
}

export function isChatbotDraft(status: string): boolean {
  return status.toLowerCase() === 'draft';
}

/** Excludes draft chatbots from listing UIs while keeping published, deleted, etc. */
export function filterListableChatbots(
  chatbots: ChatbotListItem[],
): ChatbotListItem[] {
  return chatbots.filter((chatbot) => !isChatbotDraft(chatbot.status));
}

export function isChatbotActive(status: string): boolean {
  return status === 'published';
}

export function isChatbotDeleted(status: string): boolean {
  return status.toLowerCase() === 'deleted';
}

export function getChatbotStatusDisplay(status: string): {
  label: string;
  dotClassName: string;
} {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === 'published') {
    return { label: 'active', dotClassName: 'bg-green-500' };
  }

  if (normalizedStatus === 'deleted') {
    return { label: 'Deleted', dotClassName: 'bg-red-500' };
  }

  return {
    label: normalizedStatus,
    dotClassName: 'bg-gray-400',
  };
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
  const filters: ChatbotStatusFilter[] = [...CHATBOTS_PAGE_STATUS_FILTERS];
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
    case 'deleted':
      return 'Deleted';
    case 'archived':
      return 'Archived';
    default:
      return statusFilter;
  }
}

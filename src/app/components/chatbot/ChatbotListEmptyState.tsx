import { Bot, Loader2, Plus } from 'lucide-react';

interface ChatbotListEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onCreateChatbot: () => void;
  createLoading?: boolean;
  createDisabled?: boolean;
}

export function ChatbotListEmptyState({
  title = 'No Chatbots Yet',
  description = "You haven't created any chatbots yet. Get started by creating your first AI-powered chatbot to assist your customers.",
  actionLabel = 'Create Your First Chatbot',
  onCreateChatbot,
  createLoading = false,
  createDisabled = false,
}: ChatbotListEmptyStateProps) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Bot className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{description}</p>
      <button
        onClick={onCreateChatbot}
        disabled={createLoading || createDisabled}
        className="px-6 py-3 bg-[#003A96] text-white rounded-lg hover:bg-[#002d75] transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {createLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {actionLabel}
      </button>
    </div>
  );
}

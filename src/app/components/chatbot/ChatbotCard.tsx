import { useNavigate } from 'react-router';
import {
  BarChart3,
  Bot,
  Loader2,
  MessageSquare,
  Settings,
  Trash2,
} from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import type { ChatbotListItem } from '@/types/chatbot.types';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { getChatbotStatusDisplay } from '@/utils/chatbotList';
import { canDeleteChatbot } from '@/utils/chatbotPermissions';

interface ChatbotCardProps {
  chatbot: ChatbotListItem;
  onDelete?: (chatbotId: number) => void;
  deleteDisabled?: boolean;
}

export function ChatbotCard({
  chatbot,
  onDelete,
  deleteDisabled = false,
}: ChatbotCardProps) {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const statusDisplay = getChatbotStatusDisplay(chatbot.status);
  const showDeleteButton = canDeleteChatbot(user) && Boolean(onDelete);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/chatbot/${chatbot.chatbot_id}/settings`)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          {showDeleteButton && (
            <button
              type="button"
              onClick={() => onDelete?.(chatbot.chatbot_id)}
              disabled={deleteDisabled}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {deleteDisabled ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold dark:text-white mb-2">
        {chatbot.chatbot_name ?? 'Untitled Chatbot'}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Model:</span>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {chatbot.ai_model ?? '—'}
        </span>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Owner:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
            {chatbot.owner_name ?? '—'}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {chatbot.total_conversations.toLocaleString()} conversations
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDisplay.dotClassName}`} />
          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
            {statusDisplay.label}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatRelativeTime(chatbot.updated_at)}
        </span>
      </div>

      <button
        onClick={() => navigate('/dashboard/analytics')}
        className="w-full mt-4 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:border-blue-500"
      >
        <BarChart3 className="w-4 h-4" />
        View Analytics
      </button>
    </div>
  );
}

import { Copy } from 'lucide-react';
import { MarkdownMessage } from '@/components/common/MarkdownMessage';
import type { PlaygroundMessage } from '@/types/playground.types';
import { formatChatMessageTime } from '@/utils/chatHistoryFormat';
import { copyToClipboard } from '@/utils/copyToClipboard';

interface PlaygroundMessageBubbleProps {
  message: PlaygroundMessage;
}

export function PlaygroundMessageBubble({ message }: PlaygroundMessageBubbleProps) {
  const isUser = message.sender === 'user';
  const timestamp = formatChatMessageTime(message.created_at);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[70%] bg-blue-600 text-white rounded-2xl px-4 py-3">
          <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
          <p className="text-xs mt-1 text-blue-100">{timestamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start group">
      <div className="max-w-[85%] sm:max-w-[70%] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl px-4 py-3 relative">
        <MarkdownMessage content={message.message} />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
          <button
            type="button"
            onClick={() => void copyToClipboard(message.message, 'Response copied')}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Copy response"
            title="Copy response"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import { MarkdownMessage } from '@/components/common/MarkdownMessage';
import type { PlaygroundMessage } from '@/types/playground.types';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { formatPlaygroundMessageTimestamp } from '@/utils/timeFormatter';

interface PlaygroundMessageBubbleProps {
  message: PlaygroundMessage;
  animate?: boolean;
  onTypingProgress?: () => void;
  onTypingComplete?: () => void;
}

export function PlaygroundMessageBubble({
  message,
  animate = false,
  onTypingProgress,
  onTypingComplete,
}: PlaygroundMessageBubbleProps) {
  const isUser = message.sender === 'user';
  const timestamp = formatPlaygroundMessageTimestamp(message.created_at);
  const [displayedContent, setDisplayedContent] = useState(
    animate ? '' : message.message,
  );
  const [isTyping, setIsTyping] = useState(animate);
  const onTypingProgressRef = useRef(onTypingProgress);
  const onTypingCompleteRef = useRef(onTypingComplete);

  useEffect(() => {
    onTypingProgressRef.current = onTypingProgress;
    onTypingCompleteRef.current = onTypingComplete;
  }, [onTypingProgress, onTypingComplete]);

  useEffect(() => {
    if (!animate) {
      setDisplayedContent(message.message);
      setIsTyping(false);
      return;
    }

    setDisplayedContent('');
    setIsTyping(true);

    const fullText = message.message;
    let index = 0;
    const step = Math.max(1, Math.ceil(fullText.length / 180));
    const intervalMs = 16;

    const intervalId = window.setInterval(() => {
      index = Math.min(fullText.length, index + step);
      setDisplayedContent(fullText.slice(0, index));
      onTypingProgressRef.current?.();

      if (index >= fullText.length) {
        window.clearInterval(intervalId);
        setIsTyping(false);
        onTypingCompleteRef.current?.();
      }
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [animate, message.id, message.message]);

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
        {displayedContent ? (
          <MarkdownMessage content={displayedContent} />
        ) : (
          <span className="inline-block w-1.5 h-4 bg-gray-400 dark:bg-gray-500 animate-pulse rounded-sm" />
        )}
        {isTyping && (
          <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-gray-400 dark:bg-gray-500 animate-pulse rounded-sm" />
        )}
        {!isTyping && (
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
        )}
      </div>
    </div>
  );
}

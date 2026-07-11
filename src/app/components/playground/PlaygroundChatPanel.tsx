import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2, MessageSquare, Send } from 'lucide-react';
import { ConfirmDialog } from '@/app/components/ui/ConfirmDialog';
import { PlaygroundMessageBubble } from '@/app/components/playground/PlaygroundMessageBubble';
import { PlaygroundSessionSidebar } from '@/app/components/playground/PlaygroundSessionSidebar';
import { TypingIndicator } from '@/app/components/playground/TypingIndicator';
import {
  SkeletonConversationMessages,
  SkeletonConversationPanel,
  SkeletonSessionList,
} from '@/components/Skeleton';
import { usePlayground } from '@/hooks/usePlayground';

interface PlaygroundChatPanelProps {
  chatbotId: number;
  chatbotName: string;
  enabled?: boolean;
  showMobileSessionToggle?: boolean;
}

export function PlaygroundChatPanel({
  chatbotId,
  chatbotName,
  enabled = true,
  showMobileSessionToggle = true,
}: PlaygroundChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('chat');
  const [sessionPendingDelete, setSessionPendingDelete] = useState<number | null>(null);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const wasSendingRef = useRef(false);

  const {
    sessions,
    currentSessionId,
    currentSession,
    messages,
    loadingSessions,
    loadingMessages,
    creatingSession,
    deletingSession,
    sending,
    initializing,
    error,
    selectSession,
    createSession,
    deleteSession,
    sendMessage,
    retryInitialize,
    retryMessages,
  } = usePlayground({ chatbotId, enabled });

  const scrollMessagesToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleTypingComplete = useCallback(() => {
    setTypingMessageId(null);
  }, []);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [messages, sending, typingMessageId, scrollMessagesToBottom]);

  useEffect(() => {
    if (wasSendingRef.current && !sending) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender === 'assistant') {
        setTypingMessageId(lastMessage.id);
      }
    }
    wasSendingRef.current = sending;
  }, [sending, messages]);

  useEffect(() => {
    setTypingMessageId(null);
  }, [currentSessionId]);

  useEffect(() => {
    if (!sending && typingMessageId === null) {
      inputRef.current?.focus();
    }
  }, [sending, currentSessionId, typingMessageId]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || sending || !currentSessionId) {
      return;
    }

    setInputValue('');
    const success = await sendMessage(trimmed);
    if (!success) {
      setInputValue(trimmed);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
      return;
    }

    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handleSelectSession = (sessionId: number) => {
    selectSession(sessionId);
    if (showMobileSessionToggle) {
      setMobileView('chat');
    }
  };

  const handleCreateSession = async () => {
    const created = await createSession();
    if (created && showMobileSessionToggle) {
      setMobileView('chat');
    }
  };

  const handleConfirmDelete = async () => {
    if (sessionPendingDelete === null) {
      return;
    }

    const deleted = await deleteSession(sessionPendingDelete);
    if (deleted) {
      setSessionPendingDelete(null);
    }
  };

  const showListPanel = !showMobileSessionToggle || mobileView === 'list';
  const showChatPanel = !showMobileSessionToggle || mobileView === 'chat';
  const inputDisabled = sending || deletingSession || !currentSessionId || loadingMessages;

  if (initializing && sessions.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-280px)] min-h-[480px]">
        <div className="hidden lg:block lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <SkeletonSessionList count={6} />
        </div>
        <div className="lg:col-span-2">
          <SkeletonConversationPanel />
        </div>
      </div>
    );
  }

  if (error && sessions.length === 0 && !initializing) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center space-y-4 min-h-[320px] flex flex-col items-center justify-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          type="button"
          onClick={retryInitialize}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        open={sessionPendingDelete !== null}
        title="Delete Playground session?"
        message="This will permanently delete this test conversation. This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
        loading={deletingSession}
        onCancel={() => {
          if (!deletingSession) {
            setSessionPendingDelete(null);
          }
        }}
        onConfirm={() => void handleConfirmDelete()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-h-[calc(100vh-260px)] min-h-[480px] h-[calc(100vh-260px)] lg:items-stretch">
        <div className={`lg:col-span-1 ${showListPanel ? 'block' : 'hidden lg:block'} h-full min-h-0`}>
          <PlaygroundSessionSidebar
            sessions={sessions}
            currentSessionId={currentSessionId}
            loadingSessions={loadingSessions && !initializing}
            creatingSession={creatingSession}
            deletingSession={deletingSession}
            sending={sending}
            error={error}
            onSelectSession={handleSelectSession}
            onCreateSession={() => void handleCreateSession()}
            onDeleteSession={(sessionId) => setSessionPendingDelete(sessionId)}
            onRetry={retryInitialize}
          />
        </div>

        <div className={`lg:col-span-2 ${showChatPanel ? 'block' : 'hidden lg:block'} h-full min-h-0`}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-full max-h-full flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
              {showMobileSessionToggle && (
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className="lg:hidden flex items-center gap-2 mb-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sessions
                </button>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold dark:text-white">{chatbotName}</h2>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  Playground
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentSession?.title ?? 'New Chat'}
              </p>
            </div>

            {loadingMessages ? (
              <div className="flex-1 min-h-0 overflow-y-auto">
                <SkeletonConversationMessages />
              </div>
            ) : error && messages.length === 0 && !sending ? (
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={retryMessages}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : messages.length === 0 && !sending ? (
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-6 text-center">
                <MessageSquare className="w-14 h-14 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold dark:text-white mb-2">
                  Start testing your chatbot
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                  Ask a question to test knowledge base, personality, and AI responses.
                  Playground chats stay separate from production history.
                </p>
              </div>
            ) : (
              <div
                ref={messagesContainerRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4"
              >
                {messages.map((message) => (
                  <PlaygroundMessageBubble
                    key={message.id}
                    message={message}
                    animate={message.id === typingMessageId}
                    onTypingProgress={scrollMessagesToBottom}
                    onTypingComplete={handleTypingComplete}
                  />
                ))}
                {sending && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={inputDisabled}
                  rows={1}
                  placeholder="Message your chatbot..."
                  className="flex-1 resize-none max-h-32 min-h-[44px] px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:opacity-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={inputDisabled || !inputValue.trim()}
                  className="shrink-0 w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Enter to send · Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

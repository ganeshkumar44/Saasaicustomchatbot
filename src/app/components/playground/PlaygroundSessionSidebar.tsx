import { useMemo, useState } from 'react';
import { Loader2, MessageSquare, Plus, Search, Trash2 } from 'lucide-react';
import { SkeletonSessionList } from '@/components/Skeleton';
import type { PlaygroundSession } from '@/types/playground.types';
import { formatRelativeLastActivity } from '@/utils/timeFormatter';

interface PlaygroundSessionSidebarProps {
  sessions: PlaygroundSession[];
  currentSessionId: number | null;
  loadingSessions: boolean;
  creatingSession: boolean;
  deletingSession: boolean;
  sending: boolean;
  error: string | null;
  onSelectSession: (sessionId: number) => void;
  onCreateSession: () => void;
  onDeleteSession: (sessionId: number) => void;
  onRetry: () => void;
}

export function PlaygroundSessionSidebar({
  sessions,
  currentSessionId,
  loadingSessions,
  creatingSession,
  deletingSession,
  sending,
  error,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onRetry,
}: PlaygroundSessionSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const actionsDisabled = creatingSession || deletingSession || sending;

  const filteredSessions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return sessions;
    }
    return sessions.filter((session) =>
      session.title.toLowerCase().includes(query),
    );
  }, [searchTerm, sessions]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold dark:text-white">Playground Sessions</h3>
        </div>
        <button
          type="button"
          onClick={() => void onCreateSession()}
          disabled={actionsDisabled}
          className="w-full px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {creatingSession ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          New Chat
        </button>
        {sessions.length > 5 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search sessions..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {loadingSessions ? (
          <SkeletonSessionList count={6} />
        ) : error && sessions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            No sessions yet.
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            No sessions match your search.
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isSelected = currentSessionId === session.id;

            return (
              <div
                key={session.id}
                className={`group flex items-start gap-2 border-b border-gray-200 dark:border-gray-800 ${
                  isSelected ? 'bg-blue-50 dark:bg-blue-950' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectSession(session.id)}
                  disabled={actionsDisabled && !isSelected}
                  className="flex-1 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="text-sm font-medium dark:text-white line-clamp-1">
                      {session.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">
                    {formatRelativeLastActivity(session.updated_at)}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteSession(session.id)}
                  disabled={actionsDisabled}
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-3 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all disabled:opacity-30"
                  aria-label={`Delete session ${session.title}`}
                  title="Delete session"
                >
                  {deletingSession && isSelected ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

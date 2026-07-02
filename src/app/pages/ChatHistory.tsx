import { useState } from 'react';
import { Search, Filter, Download, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/app/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';
import { useChatHistory } from '@/hooks/useChatHistory';
import type { ChatSession } from '@/types/chatHistory.types';
import {
  formatChatMessageTime,
  formatSessionDuration,
  formatSessionTimestamp,
  getSessionStatusClassName,
  getVisitorDisplayName,
} from '@/utils/chatHistoryFormat';

function SessionListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`session-skeleton-${index}`}
          className="w-full p-4 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="w-5 h-5" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

function ConversationSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`message-skeleton-${index}`}
          className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
        >
          <Skeleton className={`h-16 rounded-2xl ${index % 2 === 0 ? 'w-1/2' : 'w-2/3'}`} />
        </div>
      ))}
    </div>
  );
}

function matchesSearchQuery(session: ChatSession, searchTerm: string): boolean {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const visitorName = getVisitorDisplayName(session.visitor_name, session.visitor_email).toLowerCase();
  const visitorEmail = session.visitor_email?.toLowerCase() ?? '';
  const firstMessage = session.first_message?.toLowerCase() ?? '';
  const chatbotName = session.chatbot_name?.toLowerCase() ?? '';

  return (
    visitorName.includes(query)
    || visitorEmail.includes(query)
    || firstMessage.includes(query)
    || chatbotName.includes(query)
  );
}

export function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    sessions,
    selectedSession,
    sessionDetails,
    currentPage,
    totalPages,
    loadingSessions,
    loadingMessages,
    error,
    changePage,
    selectSession,
    refetch,
    refetchDetails,
  } = useChatHistory();

  const filteredSessions = sessions.filter((session) => matchesSearchQuery(session, searchTerm));
  const selectedVisitorName = selectedSession
    ? getVisitorDisplayName(selectedSession.visitor_name, selectedSession.visitor_email)
    : '';
  const selectedDuration = selectedSession
    ? formatSessionDuration(selectedSession.session_started_at, selectedSession.last_activity)
    : '';
  const selectedTimestamp = selectedSession
    ? formatSessionTimestamp(selectedSession.session_started_at)
    : '';

  const showConversationPanel = Boolean(selectedSession);
  const activeSessionDetails =
    selectedSession && sessionDetails && !loadingMessages ? sessionDetails : null;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Chat History</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View and analyze past conversations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-360px)]">
              {loadingSessions ? (
                <SessionListSkeleton />
              ) : error && sessions.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => refetch()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                  No chat history found.
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                  No conversations match your search.
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const visitorName = getVisitorDisplayName(
                    session.visitor_name,
                    session.visitor_email,
                  );
                  const isSelected =
                    selectedSession?.chat_session_id === session.chat_session_id;

                  return (
                    <button
                      key={session.chat_session_id}
                      onClick={() => selectSession(session)}
                      className={`w-full p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left ${
                        isSelected ? 'bg-blue-50 dark:bg-blue-950' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {visitorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium dark:text-white text-sm">{visitorName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {session.visitor_email ?? '—'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {session.first_message ?? 'No message preview'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {session.total_messages}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatSessionDuration(
                            session.session_started_at,
                            session.last_activity,
                          )}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSessionStatusClassName(session.status)}`}
                        >
                          {session.status}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          if (currentPage > 1) {
                            changePage(currentPage - 1);
                          }
                        }}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(event) => {
                            event.preventDefault();
                            changePage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          if (currentPage < totalPages) {
                            changePage(currentPage + 1);
                          }
                        }}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {showConversationPanel ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[calc(100vh-180px)] flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {selectedVisitorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold dark:text-white">{selectedVisitorName}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedSession?.visitor_email ?? '—'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTimestamp}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDuration}</p>
                  </div>
                </div>
              </div>

              {loadingMessages ? (
                <ConversationSkeleton />
              ) : error && !sessionDetails ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => refetchDetails()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : activeSessionDetails && activeSessionDetails.messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6 text-gray-600 dark:text-gray-400">
                  No messages available.
                </div>
              ) : activeSessionDetails ? (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {activeSessionDetails.messages.map((message, index) => (
                    <div key={`${activeSessionDetails.chat_session_id}-${index}`}>
                      <div className="flex justify-end">
                        <div className="max-w-[70%] bg-blue-600 text-white rounded-2xl px-4 py-3">
                          <p className="text-sm">{message.user_message}</p>
                          <p className="text-xs mt-1 text-blue-100">
                            {formatChatMessageTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-start mt-4">
                        <div className="max-w-[70%] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl px-4 py-3">
                          <p className="text-sm">{message.bot_response}</p>
                          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            {formatChatMessageTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : loadingSessions ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[calc(100vh-180px)] flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 ml-auto" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </div>
              </div>
              <ConversationSkeleton />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 h-[calc(100vh-180px)] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold dark:text-white mb-2">No Conversation Selected</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a conversation from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

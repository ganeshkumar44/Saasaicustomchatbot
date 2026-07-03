import { Filter, Loader2, Plus, Search } from 'lucide-react';
import { ChatbotCard } from '@/app/components/chatbot/ChatbotCard';
import { ChatbotCardsSkeleton } from '@/app/components/chatbot/ChatbotCardsSkeleton';
import { ChatbotListEmptyState } from '@/app/components/chatbot/ChatbotListEmptyState';
import { ChatbotListErrorState } from '@/app/components/chatbot/ChatbotListErrorState';
import { ChatbotListPagination } from '@/app/components/chatbot/ChatbotListPagination';
import { ChatbotViewModeToggle } from '@/app/components/chatbot/ChatbotViewModeToggle';
import { useChatbot } from '@/hooks/useChatbot';
import { useChatbotListPage } from '@/hooks/useChatbotListPage';
import type { ChatbotStatusFilter } from '@/types/chatbot.types';
import { getStatusFilterLabel } from '@/utils/chatbotList';

export function Chatbots() {
  const { createDraft, createDraftLoading } = useChatbot();
  const {
    allChatbotList,
    filteredChatbots,
    paginatedChatbots,
    loading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    availableStatusFilters,
    viewMode,
    setViewMode,
    currentPage,
    totalPages,
    changePage,
  } = useChatbotListPage();

  const handleCreateChatbot = () => {
    void createDraft();
  };

  const hasSearchOrFilter = searchTerm.trim().length > 0 || statusFilter !== 'all';
  const showEmptyResults = !loading && !error && filteredChatbots.length === 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Chatbots</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all your AI chatbots in one place
          </p>
        </div>
        <button
          onClick={handleCreateChatbot}
          disabled={createDraftLoading}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {createDraftLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          Create Chatbot
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by chatbot name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as ChatbotStatusFilter)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  {availableStatusFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {getStatusFilterLabel(filter)}
                    </option>
                  ))}
                </select>
              </div>

              <ChatbotViewModeToggle viewMode={viewMode} onChange={setViewMode} />
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {loading
              ? 'Loading chatbots...'
              : `${filteredChatbots.length} ${filteredChatbots.length === 1 ? 'chatbot' : 'chatbots'} found`}
          </p>
        </div>

        {loading ? (
          <ChatbotCardsSkeleton count={6} />
        ) : error ? (
          <ChatbotListErrorState error={error} onRetry={() => void refetch()} />
        ) : allChatbotList.length === 0 ? (
          <ChatbotListEmptyState
            onCreateChatbot={handleCreateChatbot}
            createLoading={createDraftLoading}
          />
        ) : showEmptyResults ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold dark:text-white mb-2">No chatbots found.</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {hasSearchOrFilter
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'Create your first chatbot to get started.'}
            </p>
            {!hasSearchOrFilter && (
              <button
                onClick={handleCreateChatbot}
                disabled={createDraftLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {createDraftLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                Create Chatbot
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'
                  : 'grid grid-cols-1 gap-6 p-6'
              }
            >
              {paginatedChatbots.map((chatbot) => (
                <ChatbotCard key={chatbot.chatbot_id} chatbot={chatbot} />
              ))}
            </div>

            <div className="pb-6">
              <ChatbotListPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

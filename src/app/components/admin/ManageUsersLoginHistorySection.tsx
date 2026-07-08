import { Search } from 'lucide-react';
import { ManageLoginHistoryTable } from '@/app/components/admin/ManageLoginHistoryTable';
import { ManageLoginHistoryToolbar } from '@/app/components/admin/ManageLoginHistoryToolbar';
import { ChatbotListPagination } from '@/app/components/chatbot/ChatbotListPagination';
import { SkeletonPagination, SkeletonToolbar } from '@/components/Skeleton';
import { useManageUsersLoginHistory } from '@/hooks/useManageUsersLoginHistory';

export function ManageUsersLoginHistorySection() {
  const {
    data,
    loading,
    error,
    pagination,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    changePage,
    refresh,
    clearError,
  } = useManageUsersLoginHistory();

  const isInitialLoading = loading && data.length === 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold dark:text-white">Login History</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Review login activity across all user accounts
        </p>
      </div>

      <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
        {isInitialLoading ? (
          <SkeletonToolbar />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            <ManageLoginHistoryToolbar
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onRoleFilterChange={setRoleFilter}
              onStatusFilterChange={setStatusFilter}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => {
              clearError();
              refresh();
            }}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      <ManageLoginHistoryTable items={data} loading={loading} />

      <div className="px-6 pb-6">
        {isInitialLoading ? (
          <SkeletonPagination />
        ) : (
          <ChatbotListPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={changePage}
          />
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { ManageUserEditModal } from '@/app/components/admin/ManageUserEditModal';
import { ManageUsersTable } from '@/app/components/admin/ManageUsersTable';
import { ManageUsersToolbar } from '@/app/components/admin/ManageUsersToolbar';
import { ChatbotListPagination } from '@/app/components/chatbot/ChatbotListPagination';
import { ConfirmDialog } from '@/app/components/ui/ConfirmDialog';
import { SkeletonPagination, SkeletonToolbar } from '@/components/Skeleton';
import { useManageUsers } from '@/hooks/useManageUsers';
import {
  updateUser as updateUserThunk,
  updateUserStatus as updateUserStatusThunk,
} from '@/store/manageUsersThunk';
import type { ManageUserListItem, UpdateManageUserRequest } from '@/types/manageUsers.types';

type StatusConfirmAction = 'activate' | 'deactivate';

export function ManageUsers() {
  const {
    users,
    allUsers,
    selectedUser,
    loading,
    detailsLoading,
    updating,
    statusUpdating,
    pagination,
    error,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    getUsers,
    getUserDetails,
    updateUser,
    updateUserStatus,
    changePage,
    clearError,
    clearSelectedUser,
  } = useManageUsers();

  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [statusAction, setStatusAction] = useState<StatusConfirmAction | null>(null);
  const [pendingStatusUser, setPendingStatusUser] = useState<ManageUserListItem | null>(null);

  const isEditModalOpen = editUserId !== null;
  const isInitialLoading = loading && users.length === 0;
  const hasActiveFilters =
    search.trim().length > 0 || roleFilter !== 'all' || statusFilter !== 'all';
  const showEmptyResults = !loading && !error && users.length === 0;

  const handleEdit = (user: ManageUserListItem) => {
    clearError();
    setEditUserId(user.user_id);
    void getUserDetails(user.user_id);
  };

  const handleCloseEditModal = () => {
    setEditUserId(null);
    clearSelectedUser();
    clearError();
  };

  const handleSaveUser = async (payload: UpdateManageUserRequest) => {
    if (!editUserId) {
      return { success: false };
    }

    const result = await updateUser(editUserId, payload);

    if (updateUserThunk.fulfilled.match(result)) {
      void getUsers(pagination.page);
      return { success: true, message: result.payload.message };
    }

    return { success: false };
  };

  const openStatusConfirm = (
    user: ManageUserListItem,
    action: StatusConfirmAction,
  ) => {
    clearError();
    setPendingStatusUser(user);
    setStatusAction(action);
  };

  const closeStatusConfirm = () => {
    setStatusAction(null);
    setPendingStatusUser(null);
    clearError();
  };

  const handleConfirmStatus = async () => {
    if (!pendingStatusUser || !statusAction) {
      return;
    }

    const result = await updateUserStatus(pendingStatusUser.user_id, {
      action: statusAction,
    });

    if (updateUserStatusThunk.fulfilled.match(result)) {
      toast.success(result.payload.message);
      closeStatusConfirm();
      void getUsers(pagination.page);
      return;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <ManageUserEditModal
        open={isEditModalOpen}
        user={selectedUser}
        loading={detailsLoading}
        updating={updating}
        error={error}
        onClose={handleCloseEditModal}
        onSave={handleSaveUser}
        onClearError={clearError}
      />

      <ConfirmDialog
        open={statusAction === 'deactivate'}
        title="Delete Account"
        message="Are you sure you want to deactivate this account?"
        confirmLabel="Deactivate"
        confirmVariant="warning"
        loading={statusUpdating}
        error={error}
        onCancel={closeStatusConfirm}
        onConfirm={() => void handleConfirmStatus()}
      />

      <ConfirmDialog
        open={statusAction === 'activate'}
        title="Activate Account"
        message="Are you sure you want to activate this account?"
        confirmLabel="Activate"
        confirmVariant="primary"
        loading={statusUpdating}
        error={error}
        onCancel={closeStatusConfirm}
        onConfirm={() => void handleConfirmStatus()}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Manage Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all user accounts
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 space-y-4">
          {isInitialLoading ? (
            <SkeletonToolbar />
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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

              <ManageUsersToolbar
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                onRoleFilterChange={setRoleFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </div>
          )}
        </div>

        {error && !isEditModalOpen && statusAction === null && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <button
              type="button"
              onClick={() => {
                clearError();
                void getUsers(pagination.page);
              }}
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <ManageUsersTable
          users={showEmptyResults && hasActiveFilters && allUsers.length > 0 ? [] : users}
          loading={loading}
          onEdit={handleEdit}
          onDeactivate={(user) => openStatusConfirm(user, 'deactivate')}
          onActivate={(user) => openStatusConfirm(user, 'activate')}
        />

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
    </div>
  );
}

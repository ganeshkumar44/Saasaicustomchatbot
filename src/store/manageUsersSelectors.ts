import type { RootState } from '@/store/index';

export const selectManageUsers = (state: RootState) => state.manageUsers.users;

export const selectSelectedManageUser = (state: RootState) =>
  state.manageUsers.selectedUser;

export const selectManageUsersLoading = (state: RootState): boolean =>
  state.manageUsers.loading;

export const selectManageUserDetailsLoading = (state: RootState): boolean =>
  state.manageUsers.detailsLoading;

export const selectManageUsersUpdating = (state: RootState): boolean =>
  state.manageUsers.updating;

export const selectManageUserStatusUpdating = (state: RootState): boolean =>
  state.manageUsers.statusUpdating;

export const selectManageUsersPagination = (state: RootState) =>
  state.manageUsers.pagination;

export const selectManageUsersError = (state: RootState): string | null =>
  state.manageUsers.error;

export const selectManageLoginHistoryItems = (state: RootState) =>
  state.manageUsers.loginHistory.items;

export const selectManageLoginHistoryLoading = (state: RootState): boolean =>
  state.manageUsers.loginHistory.loading;

export const selectManageLoginHistoryError = (state: RootState): string | null =>
  state.manageUsers.loginHistory.error;

export const selectManageLoginHistoryPagination = (state: RootState) =>
  state.manageUsers.loginHistory.pagination;

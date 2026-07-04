import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearManageUsersError,
  clearSelectedManageUser,
} from '@/store/manageUsersSlice';
import {
  selectManageUserDetailsLoading,
  selectManageUserStatusUpdating,
  selectManageUsers,
  selectManageUsersError,
  selectManageUsersLoading,
  selectManageUsersPagination,
  selectManageUsersUpdating,
  selectSelectedManageUser,
} from '@/store/manageUsersSelectors';
import {
  getUserDetails as getUserDetailsThunk,
  getUsers as getUsersThunk,
  updateUser as updateUserThunk,
  updateUserStatus as updateUserStatusThunk,
} from '@/store/manageUsersThunk';
import type {
  ManageUserRoleFilter,
  ManageUserStatusFilter,
  UpdateManageUserRequest,
  UpdateManageUserStatusRequest,
} from '@/types/manageUsers.types';
import {
  applyManageUserFilters,
  MANAGE_USERS_PAGE_SIZE,
} from '@/utils/manageUsers';

const SEARCH_DEBOUNCE_MS = 300;

export function useManageUsers() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectManageUsers);
  const selectedUser = useAppSelector(selectSelectedManageUser);
  const loading = useAppSelector(selectManageUsersLoading);
  const detailsLoading = useAppSelector(selectManageUserDetailsLoading);
  const updating = useAppSelector(selectManageUsersUpdating);
  const statusUpdating = useAppSelector(selectManageUserStatusUpdating);
  const pagination = useAppSelector(selectManageUsersPagination);
  const error = useAppSelector(selectManageUsersError);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<ManageUserRoleFilter>('all');
  const [statusFilter, setStatusFilter] = useState<ManageUserStatusFilter>('all');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  const fetchUsers = useCallback(
    (page: number = pagination.page) => {
      void dispatch(
        getUsersThunk({
          page,
          perPage: MANAGE_USERS_PAGE_SIZE,
          search: debouncedSearch || undefined,
        }),
      );
    },
    [dispatch, debouncedSearch, pagination.page],
  );

  useEffect(() => {
    void dispatch(
      getUsersThunk({
        page: 1,
        perPage: MANAGE_USERS_PAGE_SIZE,
        search: debouncedSearch || undefined,
      }),
    );
  }, [dispatch, debouncedSearch]);

  const filteredUsers = useMemo(
    () => applyManageUserFilters(users, roleFilter, statusFilter),
    [users, roleFilter, statusFilter],
  );

  const getUserDetails = useCallback(
    (userId: number) => dispatch(getUserDetailsThunk(userId)),
    [dispatch],
  );

  const updateUser = useCallback(
    (userId: number, payload: UpdateManageUserRequest) =>
      dispatch(updateUserThunk({ userId, payload })),
    [dispatch],
  );

  const updateUserStatus = useCallback(
    (userId: number, payload: UpdateManageUserStatusRequest) =>
      dispatch(updateUserStatusThunk({ userId, payload })),
    [dispatch],
  );

  const changePage = useCallback(
    (page: number) => {
      void dispatch(
        getUsersThunk({
          page,
          perPage: MANAGE_USERS_PAGE_SIZE,
          search: debouncedSearch || undefined,
        }),
      );
    },
    [dispatch, debouncedSearch],
  );

  const clearError = useCallback(() => {
    dispatch(clearManageUsersError());
  }, [dispatch]);

  const clearSelectedUser = useCallback(() => {
    dispatch(clearSelectedManageUser());
  }, [dispatch]);

  return {
    users: filteredUsers,
    allUsers: users,
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
    getUsers: fetchUsers,
    getUserDetails,
    updateUser,
    updateUserStatus,
    changePage,
    clearError,
    clearSelectedUser,
  };
}

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearManageLoginHistoryError } from '@/store/manageUsersSlice';
import {
  selectManageLoginHistoryError,
  selectManageLoginHistoryItems,
  selectManageLoginHistoryLoading,
  selectManageLoginHistoryPagination,
} from '@/store/manageUsersSelectors';
import { getManageUsersLoginHistory } from '@/store/manageUsersThunk';
import type {
  LoginHistoryRoleFilter,
  LoginHistoryStatusFilter,
} from '@/types/loginHistory.types';
import {
  MANAGE_LOGIN_HISTORY_PAGE_SIZE,
  toApiDateFrom,
  toApiDateTo,
} from '@/utils/loginHistory';

const SEARCH_DEBOUNCE_MS = 300;

export function useManageUsersLoginHistory() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectManageLoginHistoryItems);
  const loading = useAppSelector(selectManageLoginHistoryLoading);
  const error = useAppSelector(selectManageLoginHistoryError);
  const pagination = useAppSelector(selectManageLoginHistoryPagination);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<LoginHistoryRoleFilter>('all');
  const [statusFilter, setStatusFilter] = useState<LoginHistoryStatusFilter>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  const buildParams = useCallback(
    (page: number) => ({
      page,
      perPage: MANAGE_LOGIN_HISTORY_PAGE_SIZE,
      search: debouncedSearch || undefined,
      role: roleFilter !== 'all' ? roleFilter : undefined,
      loginStatus: statusFilter !== 'all' ? statusFilter : undefined,
      dateFrom: toApiDateFrom(dateFrom),
      dateTo: toApiDateTo(dateTo),
    }),
    [debouncedSearch, roleFilter, statusFilter, dateFrom, dateTo],
  );

  const fetchLoginHistory = useCallback(
    (page: number) => {
      void dispatch(getManageUsersLoginHistory(buildParams(page)));
    },
    [dispatch, buildParams],
  );

  useEffect(() => {
    fetchLoginHistory(1);
  }, [fetchLoginHistory]);

  const changePage = useCallback(
    (page: number) => {
      fetchLoginHistory(page);
    },
    [fetchLoginHistory],
  );

  const refresh = useCallback(() => {
    fetchLoginHistory(pagination.page);
  }, [fetchLoginHistory, pagination.page]);

  const clearError = useCallback(() => {
    dispatch(clearManageLoginHistoryError());
  }, [dispatch]);

  return {
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
  };
}

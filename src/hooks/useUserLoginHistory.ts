import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectUserLoginHistory,
  selectUserLoginHistoryError,
  selectUserLoginHistoryLoading,
} from '@/store/accountSettingsSelectors';
import { fetchUserLoginHistory } from '@/store/accountSettingsThunk';
import { getLatestUserLoginHistoryItems } from '@/utils/loginHistory';

export function useUserLoginHistory(enabled: boolean) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectUserLoginHistory);
  const loading = useAppSelector(selectUserLoginHistoryLoading);
  const error = useAppSelector(selectUserLoginHistoryError);

  const refresh = useCallback(() => {
    void dispatch(fetchUserLoginHistory());
  }, [dispatch]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    refresh();
  }, [enabled, refresh]);

  const data = useMemo(() => getLatestUserLoginHistoryItems(items), [items]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}

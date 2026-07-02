import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDashboardAnalytics,
  selectDashboardAnalyticsError,
  selectDashboardAnalyticsLoading,
} from '@/store/dashboardAnalyticsSelectors';
import { fetchDashboardAnalytics } from '@/store/dashboardAnalyticsThunk';

export function useDashboardAnalytics() {
  const dispatch = useAppDispatch();
  const analytics = useAppSelector(selectDashboardAnalytics);
  const loading = useAppSelector(selectDashboardAnalyticsLoading);
  const error = useAppSelector(selectDashboardAnalyticsError);

  const refresh = useCallback(
    () => dispatch(fetchDashboardAnalytics()),
    [dispatch],
  );

  useEffect(() => {
    void dispatch(fetchDashboardAnalytics());
  }, [dispatch]);

  return {
    analytics,
    loading,
    error,
    refresh,
  };
}

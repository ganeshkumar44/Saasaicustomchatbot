import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectConversationsChart,
  selectConversationsChartError,
  selectConversationsChartLoading,
  selectSelectedAnalyticsRange,
  selectUsersChart,
  selectUsersChartError,
  selectUsersChartLoading,
} from '@/store/dashboardAnalyticsSelectors';
import { setSelectedAnalyticsRange } from '@/store/dashboardAnalyticsSlice';
import {
  fetchConversationsChart,
  fetchUsersChart,
} from '@/store/dashboardAnalyticsThunk';
import type { AnalyticsRange } from '@/types/dashboardAnalytics.types';

export function useAnalytics() {
  const dispatch = useAppDispatch();
  const conversationsChart = useAppSelector(selectConversationsChart);
  const usersChart = useAppSelector(selectUsersChart);
  const selectedRange = useAppSelector(selectSelectedAnalyticsRange);
  const conversationsLoading = useAppSelector(selectConversationsChartLoading);
  const usersLoading = useAppSelector(selectUsersChartLoading);
  const conversationsError = useAppSelector(selectConversationsChartError);
  const usersError = useAppSelector(selectUsersChartError);

  const loading = conversationsLoading || usersLoading;
  const error = conversationsError ?? usersError;

  const refetch = useCallback(
    (range: AnalyticsRange = selectedRange) => {
      void dispatch(fetchConversationsChart(range));
      void dispatch(fetchUsersChart(range));
    },
    [dispatch, selectedRange],
  );

  const changeRange = useCallback(
    (range: AnalyticsRange) => {
      dispatch(setSelectedAnalyticsRange(range));
    },
    [dispatch],
  );

  useEffect(() => {
    void dispatch(fetchConversationsChart(selectedRange));
    void dispatch(fetchUsersChart(selectedRange));
  }, [dispatch, selectedRange]);

  return {
    conversationsChart,
    usersChart,
    selectedRange,
    conversationsLoading,
    usersLoading,
    conversationsError,
    usersError,
    loading,
    error,
    changeRange,
    refetch,
  };
}

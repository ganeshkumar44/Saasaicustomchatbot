import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectConversationsChart,
  selectConversationsChartError,
  selectConversationsChartLoading,
  selectResolutionChart,
  selectResolutionChartError,
  selectResolutionChartLoading,
  selectResponseTimeChart,
  selectResponseTimeChartError,
  selectResponseTimeChartLoading,
  selectSelectedAnalyticsRange,
  selectUsersChart,
  selectUsersChartError,
  selectUsersChartLoading,
} from '@/store/dashboardAnalyticsSelectors';
import { setSelectedAnalyticsRange } from '@/store/dashboardAnalyticsSlice';
import {
  fetchConversationsChart,
  fetchResolutionChart,
  fetchResponseTimeChart,
  fetchUsersChart,
} from '@/store/dashboardAnalyticsThunk';
import type { AnalyticsRange } from '@/types/dashboardAnalytics.types';

export function useAnalytics() {
  const dispatch = useAppDispatch();
  const conversationsChart = useAppSelector(selectConversationsChart);
  const usersChart = useAppSelector(selectUsersChart);
  const resolutionChart = useAppSelector(selectResolutionChart);
  const responseTimeChart = useAppSelector(selectResponseTimeChart);
  const selectedRange = useAppSelector(selectSelectedAnalyticsRange);
  const conversationsLoading = useAppSelector(selectConversationsChartLoading);
  const usersLoading = useAppSelector(selectUsersChartLoading);
  const resolutionLoading = useAppSelector(selectResolutionChartLoading);
  const responseTimeLoading = useAppSelector(selectResponseTimeChartLoading);
  const conversationsError = useAppSelector(selectConversationsChartError);
  const usersError = useAppSelector(selectUsersChartError);
  const resolutionError = useAppSelector(selectResolutionChartError);
  const responseTimeError = useAppSelector(selectResponseTimeChartError);

  const loading =
    conversationsLoading
    || usersLoading
    || resolutionLoading
    || responseTimeLoading;
  const error =
    conversationsError
    ?? usersError
    ?? resolutionError
    ?? responseTimeError;

  const refetch = useCallback(
    (range: AnalyticsRange = selectedRange) => {
      void dispatch(fetchConversationsChart(range));
      void dispatch(fetchUsersChart(range));
      void dispatch(fetchResolutionChart(range));
      void dispatch(fetchResponseTimeChart(range));
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
    void dispatch(fetchResolutionChart(selectedRange));
    void dispatch(fetchResponseTimeChart(selectedRange));
  }, [dispatch, selectedRange]);

  return {
    conversationsChart,
    usersChart,
    resolutionChart,
    responseTimeChart,
    selectedRange,
    conversationsLoading,
    usersLoading,
    resolutionLoading,
    responseTimeLoading,
    conversationsError,
    usersError,
    resolutionError,
    responseTimeError,
    loading,
    error,
    changeRange,
    refetch,
  };
}

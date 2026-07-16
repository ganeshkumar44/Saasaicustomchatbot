import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectChatbotAnalytics,
  selectChatbotAnalyticsError,
  selectChatbotAnalyticsLoading,
  selectChatbotConversationsChart,
  selectChatbotConversationsChartError,
  selectChatbotConversationsChartLoading,
  selectChatbotResolutionChart,
  selectChatbotResolutionChartError,
  selectChatbotResolutionChartLoading,
  selectChatbotResponseTimeChart,
  selectChatbotResponseTimeChartError,
  selectChatbotResponseTimeChartLoading,
  selectChatbotAnalyticsSelectedRange,
  selectChatbotUsersChart,
  selectChatbotUsersChartError,
  selectChatbotUsersChartLoading,
} from '@/store/chatbotAnalyticsSelectors';
import {
  resetChatbotAnalyticsState,
  setChatbotAnalyticsSelectedRange,
} from '@/store/chatbotAnalyticsSlice';
import {
  fetchChatbotAnalytics,
  fetchChatbotConversationsChart,
  fetchChatbotResolutionChart,
  fetchChatbotResponseTimeChart,
  fetchChatbotUsersChart,
} from '@/store/chatbotAnalyticsThunk';
import type { AnalyticsRange } from '@/types/dashboardAnalytics.types';

export function useChatbotAnalytics(chatbotId: number | null) {
  const dispatch = useAppDispatch();
  const analytics = useAppSelector(selectChatbotAnalytics);
  const loading = useAppSelector(selectChatbotAnalyticsLoading);
  const error = useAppSelector(selectChatbotAnalyticsError);
  const conversationsChart = useAppSelector(selectChatbotConversationsChart);
  const usersChart = useAppSelector(selectChatbotUsersChart);
  const resolutionChart = useAppSelector(selectChatbotResolutionChart);
  const responseTimeChart = useAppSelector(selectChatbotResponseTimeChart);
  const selectedRange = useAppSelector(selectChatbotAnalyticsSelectedRange);
  const conversationsLoading = useAppSelector(selectChatbotConversationsChartLoading);
  const usersLoading = useAppSelector(selectChatbotUsersChartLoading);
  const resolutionLoading = useAppSelector(selectChatbotResolutionChartLoading);
  const responseTimeLoading = useAppSelector(selectChatbotResponseTimeChartLoading);
  const conversationsError = useAppSelector(selectChatbotConversationsChartError);
  const usersError = useAppSelector(selectChatbotUsersChartError);
  const resolutionError = useAppSelector(selectChatbotResolutionChartError);
  const responseTimeError = useAppSelector(selectChatbotResponseTimeChartError);

  const refreshAnalytics = useCallback(() => {
    if (chatbotId == null) {
      return;
    }
    void dispatch(fetchChatbotAnalytics({ chatbotId }));
  }, [chatbotId, dispatch]);

  const refetchCharts = useCallback(
    (range: AnalyticsRange = selectedRange) => {
      if (chatbotId == null) {
        return;
      }
      void dispatch(fetchChatbotConversationsChart({ chatbotId, range }));
      void dispatch(fetchChatbotUsersChart({ chatbotId, range }));
      void dispatch(fetchChatbotResolutionChart({ chatbotId, range }));
      void dispatch(fetchChatbotResponseTimeChart({ chatbotId, range }));
    },
    [chatbotId, dispatch, selectedRange],
  );

  const changeRange = useCallback(
    (range: AnalyticsRange) => {
      dispatch(setChatbotAnalyticsSelectedRange(range));
    },
    [dispatch],
  );

  useEffect(() => {
    if (chatbotId == null) {
      dispatch(resetChatbotAnalyticsState());
      return;
    }

    void dispatch(fetchChatbotAnalytics({ chatbotId }));
  }, [chatbotId, dispatch]);

  useEffect(() => {
    if (chatbotId == null) {
      return;
    }
    void dispatch(fetchChatbotConversationsChart({ chatbotId, range: selectedRange }));
    void dispatch(fetchChatbotUsersChart({ chatbotId, range: selectedRange }));
    void dispatch(fetchChatbotResolutionChart({ chatbotId, range: selectedRange }));
    void dispatch(fetchChatbotResponseTimeChart({ chatbotId, range: selectedRange }));
  }, [chatbotId, dispatch, selectedRange]);

  return {
    analytics,
    loading,
    error,
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
    changeRange,
    refreshAnalytics,
    refetchCharts,
  };
}

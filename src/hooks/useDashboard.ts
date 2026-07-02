import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectRecentConversations,
  selectRecentConversationsError,
  selectRecentConversationsLoading,
} from '@/store/dashboardSelectors';
import { fetchRecentConversations } from '@/store/dashboardThunk';

export function useDashboard() {
  const dispatch = useAppDispatch();
  const recentConversations = useAppSelector(selectRecentConversations);
  const loading = useAppSelector(selectRecentConversationsLoading);
  const error = useAppSelector(selectRecentConversationsError);

  const refetchRecentConversations = useCallback(
    () => dispatch(fetchRecentConversations()),
    [dispatch],
  );

  useEffect(() => {
    void dispatch(fetchRecentConversations());
  }, [dispatch]);

  return {
    recentConversations,
    loading,
    error,
    refetchRecentConversations,
  };
}

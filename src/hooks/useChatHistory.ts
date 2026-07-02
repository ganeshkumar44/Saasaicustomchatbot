import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectChatHistoryCurrentPage,
  selectChatHistoryError,
  selectChatHistoryLoadingMessages,
  selectChatHistoryLoadingSessions,
  selectChatHistoryPerPage,
  selectChatHistoryTotalPages,
  selectChatHistoryTotalRecords,
  selectChatSessionDetails,
  selectChatSessions,
  selectSelectedChatSession,
} from '@/store/chatHistorySelectors';
import {
  CHAT_HISTORY_PER_PAGE,
  selectChatSession,
} from '@/store/chatHistorySlice';
import {
  fetchChatSessionDetails,
  fetchChatSessions,
} from '@/store/chatHistoryThunk';
import type { ChatSession } from '@/types/chatHistory.types';

export function useChatHistory() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectChatSessions);
  const selectedSession = useAppSelector(selectSelectedChatSession);
  const sessionDetails = useAppSelector(selectChatSessionDetails);
  const currentPage = useAppSelector(selectChatHistoryCurrentPage);
  const totalPages = useAppSelector(selectChatHistoryTotalPages);
  const totalRecords = useAppSelector(selectChatHistoryTotalRecords);
  const perPage = useAppSelector(selectChatHistoryPerPage);
  const loadingSessions = useAppSelector(selectChatHistoryLoadingSessions);
  const loadingMessages = useAppSelector(selectChatHistoryLoadingMessages);
  const error = useAppSelector(selectChatHistoryError);

  const refetch = useCallback(
    (page: number = currentPage) => {
      void dispatch(fetchChatSessions({ page, perPage: CHAT_HISTORY_PER_PAGE }));
    },
    [dispatch, currentPage],
  );

  const refetchDetails = useCallback(() => {
    if (!selectedSession) {
      return;
    }

    void dispatch(fetchChatSessionDetails(selectedSession.chat_session_id));
  }, [dispatch, selectedSession]);

  const changePage = useCallback(
    (page: number) => {
      void dispatch(fetchChatSessions({ page, perPage: CHAT_HISTORY_PER_PAGE }));
    },
    [dispatch],
  );

  const selectSession = useCallback(
    (session: ChatSession) => {
      dispatch(selectChatSession(session));
    },
    [dispatch],
  );

  useEffect(() => {
    void dispatch(fetchChatSessions({ page: 1, perPage: CHAT_HISTORY_PER_PAGE }));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedSession) {
      return;
    }

    void dispatch(fetchChatSessionDetails(selectedSession.chat_session_id));
  }, [dispatch, selectedSession?.chat_session_id]);

  return {
    sessions,
    selectedSession,
    sessionDetails,
    currentPage,
    totalPages,
    totalRecords,
    perPage,
    loadingSessions,
    loadingMessages,
    error,
    changePage,
    selectSession,
    refetch,
    refetchDetails,
  };
}

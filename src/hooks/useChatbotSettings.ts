import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetChatbotSettingsState,
} from '@/store/chatbotSettingsSlice';
import {
  selectChatbotDetails,
  selectChatbotDetailsError,
  selectChatbotDetailsLoading,
  selectChatbotDetailsSuccess,
} from '@/store/chatbotSettingsSelectors';
import { fetchChatbotDetails } from '@/store/chatbotSettingsThunk';
import { parseChatbotIdParam } from '@/utils/chatbotRoute';

export function useChatbotSettings() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const chatbotId = parseChatbotIdParam(id);
  const chatbotDetails = useAppSelector(selectChatbotDetails);
  const loading = useAppSelector(selectChatbotDetailsLoading);
  const success = useAppSelector(selectChatbotDetailsSuccess);
  const error = useAppSelector(selectChatbotDetailsError);

  const refetch = useCallback(() => {
    if (!chatbotId) {
      return;
    }

    void dispatch(fetchChatbotDetails(chatbotId));
  }, [chatbotId, dispatch]);

  useEffect(() => {
    if (!chatbotId) {
      return;
    }

    void dispatch(fetchChatbotDetails(chatbotId));
  }, [chatbotId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetChatbotSettingsState());
    };
  }, [dispatch]);

  return {
    chatbotId,
    chatbotDetails,
    loading,
    success,
    error,
    invalidChatbotId: chatbotId === null,
    refetch,
  };
}

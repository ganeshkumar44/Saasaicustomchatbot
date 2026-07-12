import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearPlaygroundError,
  resetPlaygroundState,
  selectPlaygroundSession,
} from '@/store/playgroundSlice';
import {
  selectPlaygroundCreatingSession,
  selectPlaygroundCurrentSession,
  selectPlaygroundCurrentSessionId,
  selectPlaygroundDeletingSession,
  selectPlaygroundError,
  selectPlaygroundInitializing,
  selectPlaygroundLoadingMessages,
  selectPlaygroundLoadingSessions,
  selectPlaygroundMessages,
  selectPlaygroundSendError,
  selectPlaygroundSending,
  selectPlaygroundSessions,
} from '@/store/playgroundSelectors';
import {
  createNewPlaygroundSession,
  fetchPlaygroundMessages,
  initializePlayground,
  removePlaygroundSession,
  sendPlaygroundMessage,
} from '@/store/playgroundThunk';
import { useSubscription } from '@/hooks/useSubscription';
import { PLAYGROUND_MESSAGE_LIMIT_ERROR_CODE } from '@/types/subscription.types';

interface UsePlaygroundOptions {
  chatbotId: number | null;
  enabled?: boolean;
}

export function usePlayground({ chatbotId, enabled = true }: UsePlaygroundOptions) {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectPlaygroundSessions);
  const currentSessionId = useAppSelector(selectPlaygroundCurrentSessionId);
  const currentSession = useAppSelector(selectPlaygroundCurrentSession);
  const messages = useAppSelector(selectPlaygroundMessages);
  const loadingSessions = useAppSelector(selectPlaygroundLoadingSessions);
  const loadingMessages = useAppSelector(selectPlaygroundLoadingMessages);
  const creatingSession = useAppSelector(selectPlaygroundCreatingSession);
  const deletingSession = useAppSelector(selectPlaygroundDeletingSession);
  const sending = useAppSelector(selectPlaygroundSending);
  const initializing = useAppSelector(selectPlaygroundInitializing);
  const error = useAppSelector(selectPlaygroundError);
  const sendError = useAppSelector(selectPlaygroundSendError);

  const {
    playgroundMessagingDisabled,
    playgroundLimitMessage,
    refreshUsage,
    disablePlaygroundMessaging,
  } = useSubscription({ chatbotId, enabled });

  useEffect(() => {
    if (!enabled || !chatbotId) {
      return;
    }

    void dispatch(initializePlayground(chatbotId));

    return () => {
      dispatch(resetPlaygroundState());
    };
  }, [chatbotId, dispatch, enabled]);

  useEffect(() => {
    if (!sendError) {
      return;
    }
    toast.error(sendError);
    dispatch(clearPlaygroundError());
  }, [dispatch, sendError]);

  const selectSession = useCallback(
    (sessionId: number) => {
      if (sessionId === currentSessionId || sending || deletingSession) {
        return;
      }
      dispatch(selectPlaygroundSession(sessionId));
      void dispatch(fetchPlaygroundMessages(sessionId));
    },
    [currentSessionId, deletingSession, dispatch, sending],
  );

  const createSession = useCallback(async () => {
    if (!chatbotId || creatingSession || sending) {
      return false;
    }

    const result = await dispatch(createNewPlaygroundSession(chatbotId));
    if (createNewPlaygroundSession.fulfilled.match(result)) {
      toast.success('New chat created');
      return true;
    }

    toast.error(
      typeof result.payload === 'string'
        ? result.payload
        : 'Failed to create a new chat. Please try again.',
    );
    return false;
  }, [chatbotId, creatingSession, dispatch, sending]);

  const deleteSession = useCallback(
    async (sessionId: number) => {
      if (!chatbotId || deletingSession || sending) {
        return false;
      }

      const result = await dispatch(
        removePlaygroundSession({ sessionId, chatbotId }),
      );
      if (removePlaygroundSession.fulfilled.match(result)) {
        toast.success('Session deleted');
        return true;
      }

      toast.error(
        typeof result.payload === 'string'
          ? result.payload
          : 'Failed to delete session. Please try again.',
      );
      return false;
    },
    [chatbotId, deletingSession, dispatch, sending],
  );

  const sendMessage = useCallback(
    async (question: string) => {
      if (
        !chatbotId ||
        !currentSessionId ||
        sending ||
        playgroundMessagingDisabled
      ) {
        return false;
      }

      const trimmed = question.trim();
      if (!trimmed) {
        return false;
      }

      const result = await dispatch(
        sendPlaygroundMessage({
          chatbot_id: chatbotId,
          question: trimmed,
          session_id: currentSessionId,
        }),
      );

      if (sendPlaygroundMessage.fulfilled.match(result)) {
        refreshUsage();
        return true;
      }

      if (sendPlaygroundMessage.rejected.match(result)) {
        const payload = result.payload;
        if (
          payload &&
          typeof payload === 'object' &&
          payload.errorCode === PLAYGROUND_MESSAGE_LIMIT_ERROR_CODE
        ) {
          disablePlaygroundMessaging(payload.message);
        }
      }

      return false;
    },
    [
      chatbotId,
      currentSessionId,
      disablePlaygroundMessaging,
      dispatch,
      playgroundMessagingDisabled,
      refreshUsage,
      sending,
    ],
  );

  const retryInitialize = useCallback(() => {
    if (!chatbotId) {
      return;
    }
    void dispatch(initializePlayground(chatbotId));
  }, [chatbotId, dispatch]);

  const retryMessages = useCallback(() => {
    if (!currentSessionId) {
      return;
    }
    void dispatch(fetchPlaygroundMessages(currentSessionId));
  }, [currentSessionId, dispatch]);

  return {
    sessions,
    currentSessionId,
    currentSession,
    messages,
    loadingSessions,
    loadingMessages,
    creatingSession,
    deletingSession,
    sending,
    initializing,
    error,
    messagingDisabled: playgroundMessagingDisabled,
    limitMessage: playgroundLimitMessage,
    selectSession,
    createSession,
    deleteSession,
    sendMessage,
    retryInitialize,
    retryMessages,
  };
}

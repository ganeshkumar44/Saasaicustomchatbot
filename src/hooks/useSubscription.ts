import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearPlaygroundMessagingLimit,
  clearSubscriptionError,
  resetSubscriptionState,
  setPlaygroundMessagingDisabled,
} from '@/store/subscriptionSlice';
import {
  selectPlaygroundLimitMessage,
  selectPlaygroundMessagingDisabled,
  selectSubscriptionError,
  selectSubscriptionLimits,
  selectSubscriptionLoading,
  selectSubscriptionPlan,
  selectSubscriptionUsage,
} from '@/store/subscriptionSelectors';
import { fetchChatbotSubscriptionUsage } from '@/store/subscriptionThunk';

interface UseSubscriptionOptions {
  chatbotId: number | null;
  enabled?: boolean;
}

export function useSubscription({
  chatbotId,
  enabled = true,
}: UseSubscriptionOptions) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSubscriptionLoading);
  const error = useAppSelector(selectSubscriptionError);
  const plan = useAppSelector(selectSubscriptionPlan);
  const limits = useAppSelector(selectSubscriptionLimits);
  const usage = useAppSelector(selectSubscriptionUsage);
  const playgroundMessagingDisabled = useAppSelector(
    selectPlaygroundMessagingDisabled,
  );
  const playgroundLimitMessage = useAppSelector(selectPlaygroundLimitMessage);

  useEffect(() => {
    if (!enabled || !chatbotId) {
      return;
    }

    void dispatch(fetchChatbotSubscriptionUsage(chatbotId));

    return () => {
      dispatch(resetSubscriptionState());
    };
  }, [chatbotId, dispatch, enabled]);

  const refreshUsage = useCallback(() => {
    if (!chatbotId) {
      return;
    }
    void dispatch(fetchChatbotSubscriptionUsage(chatbotId));
  }, [chatbotId, dispatch]);

  const disablePlaygroundMessaging = useCallback(
    (message: string) => {
      dispatch(
        setPlaygroundMessagingDisabled({
          disabled: true,
          message,
        }),
      );
    },
    [dispatch],
  );

  const clearPlaygroundLimit = useCallback(() => {
    dispatch(clearPlaygroundMessagingLimit());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearSubscriptionError());
  }, [dispatch]);

  return {
    loading,
    error,
    plan,
    limits,
    usage,
    playgroundMessagingDisabled,
    playgroundLimitMessage,
    refreshUsage,
    disablePlaygroundMessaging,
    clearPlaygroundLimit,
    clearError,
  };
}

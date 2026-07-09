import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCurrentUserProfile } from '@/store/authThunk';
import {
  selectCanCreateChatbot,
  selectHasReachedChatbotLimit,
  selectPlanDisplayName,
  selectShouldDisplayUserPlan,
  selectUser,
  selectUserPlan,
} from '@/store/authSelectors';
import {
  buildChatbotLimitUpgradeMessage,
  CHATBOT_LIMIT_TOOLTIP_MESSAGE,
} from '@/utils/userPlan';

export function useUserPlan() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const plan = useAppSelector(selectUserPlan);
  const planDisplayName = useAppSelector(selectPlanDisplayName);
  const showPlan = useAppSelector(selectShouldDisplayUserPlan);
  const canCreate = useAppSelector(selectCanCreateChatbot);
  const hasReachedLimit = useAppSelector(selectHasReachedChatbotLimit);

  const refreshUserPlan = useCallback(
    () => dispatch(fetchCurrentUserProfile()),
    [dispatch],
  );

  const upgradeMessage = hasReachedLimit
    ? buildChatbotLimitUpgradeMessage(plan)
    : null;

  return {
    user,
    plan,
    planDisplayName,
    showPlan,
    canCreateChatbot: canCreate,
    hasReachedChatbotLimit: hasReachedLimit,
    chatbotLimitUpgradeMessage: upgradeMessage,
    chatbotLimitTooltip: hasReachedLimit ? CHATBOT_LIMIT_TOOLTIP_MESSAGE : null,
    refreshUserPlan,
  };
}

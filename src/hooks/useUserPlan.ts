import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCurrentUserProfile } from '@/store/authThunk';
import {
  selectCanCreateChatbot,
  selectDraftChatbotId,
  selectHasDraftChatbot,
  selectHasReachedChatbotLimit,
  selectPlanDisplayName,
  selectShouldDisplayUserPlan,
  selectUser,
  selectUserPlan,
} from '@/store/authSelectors';
import {
  buildChatbotLimitUpgradeMessage,
  canStartOrResumeChatbot,
  CHATBOT_LIMIT_TOOLTIP_MESSAGE,
  CHATBOT_RESUME_DRAFT_TOOLTIP_MESSAGE,
} from '@/utils/userPlan';

export function useUserPlan(hasDraftOverride?: boolean) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const plan = useAppSelector(selectUserPlan);
  const planDisplayName = useAppSelector(selectPlanDisplayName);
  const showPlan = useAppSelector(selectShouldDisplayUserPlan);
  const canCreate = useAppSelector(selectCanCreateChatbot);
  const hasReachedLimit = useAppSelector(selectHasReachedChatbotLimit);
  const backendHasDraft = useAppSelector(selectHasDraftChatbot);
  const draftChatbotId = useAppSelector(selectDraftChatbotId);

  const hasDraft = hasDraftOverride ?? backendHasDraft;
  const canStartOrResume = canStartOrResumeChatbot(plan, user?.role, hasDraft);

  const refreshUserPlan = useCallback(
    () => dispatch(fetchCurrentUserProfile()),
    [dispatch],
  );

  const upgradeMessage = hasReachedLimit && !hasDraft
    ? buildChatbotLimitUpgradeMessage(plan)
    : null;

  return {
    user,
    plan,
    planDisplayName,
    showPlan,
    hasDraft,
    draftChatbotId,
    canCreateChatbot: canCreate,
    canStartOrResumeChatbot: canStartOrResume,
    hasReachedChatbotLimit: hasReachedLimit,
    chatbotLimitUpgradeMessage: upgradeMessage,
    chatbotLimitTooltip:
      hasReachedLimit && !hasDraft ? CHATBOT_LIMIT_TOOLTIP_MESSAGE : null,
    chatbotResumeDraftTooltip: hasDraft
      ? CHATBOT_RESUME_DRAFT_TOOLTIP_MESSAGE
      : null,
    refreshUserPlan,
  };
}

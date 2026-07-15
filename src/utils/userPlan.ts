import type { UserPlanSummary } from '@/types/userPlan.types';
import { hasAdminAccess, USER_ROLE_USER } from '@/utils/userRole';

export function formatPlanDisplayName(planName: string): string {
  const trimmed = planName.trim();

  if (!trimmed) {
    return trimmed;
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function shouldDisplayUserPlan(
  role: string | null | undefined,
  plan: UserPlanSummary | null | undefined,
): boolean {
  if (!plan) {
    return false;
  }

  return role?.toLowerCase() === USER_ROLE_USER;
}

export function hasReachedChatbotLimit(
  plan: UserPlanSummary | null | undefined,
  role: string | null | undefined,
): boolean {
  if (hasAdminAccess(role)) {
    return false;
  }

  if (!plan) {
    return false;
  }

  return plan.created_chatbots_count >= plan.chatbot_limit;
}

export function canCreateChatbot(
  plan: UserPlanSummary | null | undefined,
  role: string | null | undefined,
): boolean {
  return !hasReachedChatbotLimit(plan, role);
}

/** Analytics page, dashboard charts, and View Analytics CTA. Admins always; Free plan never. */
export function canViewAnalytics(
  plan: UserPlanSummary | null | undefined,
  role: string | null | undefined,
): boolean {
  if (hasAdminAccess(role)) {
    return true;
  }

  return (plan?.plan_name ?? '').trim().toLowerCase() !== 'free';
}

/**
 * Whether the user may open the create/resume chatbot flow.
 * Plan limit still applies for new drafts, but an existing draft can always be resumed.
 */
export function canStartOrResumeChatbot(
  plan: UserPlanSummary | null | undefined,
  role: string | null | undefined,
  hasDraft: boolean,
): boolean {
  if (hasDraft) {
    return true;
  }

  return canCreateChatbot(plan, role);
}

export function buildChatbotLimitUpgradeMessage(
  plan: UserPlanSummary | null | undefined,
): string {
  const planLabel = formatPlanDisplayName(plan?.plan_name ?? '');

  return `You have reached the maximum chatbot limit for your current plan (${planLabel}). Upgrade your plan to create additional chatbots.`;
}

export const CHATBOT_LIMIT_TOOLTIP_MESSAGE =
  'You have reached your chatbot limit.';

export const CHATBOT_RESUME_DRAFT_TOOLTIP_MESSAGE =
  'Continue your unfinished draft chatbot.';

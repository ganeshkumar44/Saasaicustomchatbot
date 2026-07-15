import type { RootState } from '@/store/index';
import {
  canCreateChatbot,
  canViewAnalytics,
  formatPlanDisplayName,
  hasReachedChatbotLimit,
  shouldDisplayUserPlan,
} from '@/utils/userPlan';

export const selectSignupLoading = (state: RootState): boolean =>
  state.auth.loading;

export const selectSignupSuccess = (state: RootState): boolean =>
  state.auth.success;

export const selectSignupError = (state: RootState): string | null =>
  state.auth.error;

export const selectRegisteredUser = (state: RootState) =>
  state.auth.registeredUser;

export const selectRegisteredEmail = (state: RootState): string | null =>
  state.auth.registeredEmail;

export const selectSignupSuccessMessage = (state: RootState): string | null =>
  state.auth.successMessage;

export const selectUser = (state: RootState) => state.auth.user;

export const selectUserPlan = (state: RootState) => state.auth.user?.plan ?? null;

export const selectPlanDisplayName = (state: RootState): string | null => {
  const plan = selectUserPlan(state);

  if (!plan) {
    return null;
  }

  return formatPlanDisplayName(plan.plan_name);
};

export const selectShouldDisplayUserPlan = (state: RootState): boolean =>
  shouldDisplayUserPlan(selectUser(state)?.role, selectUserPlan(state));

export const selectHasReachedChatbotLimit = (state: RootState): boolean =>
  hasReachedChatbotLimit(selectUserPlan(state), selectUser(state)?.role);

export const selectHasDraftChatbot = (state: RootState): boolean =>
  Boolean(selectUserPlan(state)?.has_draft);

export const selectDraftChatbotId = (state: RootState): number | null =>
  selectUserPlan(state)?.draft_chatbot_id ?? null;

export const selectCanCreateChatbot = (state: RootState): boolean =>
  canCreateChatbot(selectUserPlan(state), selectUser(state)?.role);

export const selectCanViewAnalytics = (state: RootState): boolean =>
  canViewAnalytics(selectUserPlan(state), selectUser(state)?.role);

export const selectAccessToken = (state: RootState): string | null =>
  state.auth.accessToken;

export const selectRefreshToken = (state: RootState): string | null =>
  state.auth.refreshToken;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;

export const selectLoginLoading = (state: RootState): boolean =>
  state.auth.loginLoading;

export const selectLoginSuccess = (state: RootState): boolean =>
  state.auth.loginSuccess;

export const selectLoginError = (state: RootState): string | null =>
  state.auth.loginError;

export const selectLoginSuccessMessage = (state: RootState): string | null =>
  state.auth.loginSuccessMessage;

export const selectSignoutLoading = (state: RootState): boolean =>
  state.auth.signoutLoading;

export const selectSignoutSuccess = (state: RootState): boolean =>
  state.auth.signoutSuccess;

export const selectSignoutError = (state: RootState): string | null =>
  state.auth.signoutError;

export const selectSignoutSuccessMessage = (state: RootState): string | null =>
  state.auth.signoutSuccessMessage;

export const selectVerificationLoading = (state: RootState): boolean =>
  state.auth.verificationLoading;

export const selectVerificationSuccess = (state: RootState): boolean =>
  state.auth.verificationSuccess;

export const selectVerificationError = (state: RootState): string | null =>
  state.auth.verificationError;

export const selectVerificationSuccessMessage = (state: RootState): string | null =>
  state.auth.verificationSuccessMessage;

export const selectResendLoading = (state: RootState): boolean =>
  state.auth.resendLoading;

export const selectResendSuccess = (state: RootState): boolean =>
  state.auth.resendSuccess;

export const selectResendError = (state: RootState): string | null =>
  state.auth.resendError;

export const selectResendSuccessMessage = (state: RootState): string | null =>
  state.auth.resendSuccessMessage;

export const selectShowResendLink = (state: RootState): boolean =>
  state.auth.showResendLink;

export const selectIsEmailVerified = (state: RootState): boolean =>
  state.auth.isEmailVerified;

export const selectIsMobileVerified = (state: RootState): boolean =>
  state.auth.isMobileVerified;

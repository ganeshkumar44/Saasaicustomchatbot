import type { RootState } from '@/store';

export const selectSubscriptionLoading = (state: RootState) =>
  state.subscription.loading;

export const selectSubscriptionError = (state: RootState) =>
  state.subscription.error;

export const selectSubscriptionPlan = (state: RootState) =>
  state.subscription.plan;

export const selectSubscriptionLimits = (state: RootState) =>
  state.subscription.limits;

export const selectSubscriptionUsage = (state: RootState) =>
  state.subscription.usage;

export const selectPlaygroundMessagingDisabled = (state: RootState) =>
  state.subscription.playgroundMessagingDisabled;

export const selectPlaygroundLimitMessage = (state: RootState) =>
  state.subscription.playgroundLimitMessage;

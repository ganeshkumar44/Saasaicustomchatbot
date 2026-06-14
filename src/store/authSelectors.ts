import type { RootState } from '@/store/index';

export const selectSignupLoading = (state: RootState): boolean =>
  state.auth.loading;

export const selectSignupSuccess = (state: RootState): boolean =>
  state.auth.success;

export const selectSignupError = (state: RootState): string | null =>
  state.auth.error;

export const selectRegisteredUser = (state: RootState) =>
  state.auth.registeredUser;

export const selectSignupSuccessMessage = (state: RootState): string | null =>
  state.auth.successMessage;

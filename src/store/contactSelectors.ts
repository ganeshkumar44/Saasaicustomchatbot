import type { RootState } from '@/store';

export const selectContactSubmitting = (state: RootState): boolean =>
  state.contact.submitting;

export const selectContactError = (state: RootState): string | null =>
  state.contact.error;

export const selectContactSuccessMessage = (state: RootState): string | null =>
  state.contact.successMessage;

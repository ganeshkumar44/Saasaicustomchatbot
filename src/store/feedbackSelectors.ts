import type { RootState } from '@/store';

export const selectFeedbackSubmitting = (state: RootState) =>
  state.feedback.submitting;

export const selectFeedbackError = (state: RootState) => state.feedback.error;

export const selectFeedbackSuccessMessage = (state: RootState) =>
  state.feedback.successMessage;

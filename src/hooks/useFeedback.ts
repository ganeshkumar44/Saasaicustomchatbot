import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearFeedbackError,
  clearFeedbackSuccess,
  resetFeedbackState,
} from '@/store/feedbackSlice';
import {
  selectFeedbackError,
  selectFeedbackSubmitting,
  selectFeedbackSuccessMessage,
} from '@/store/feedbackSelectors';
import { submitFeedbackThunk } from '@/store/feedbackThunk';
import type { CreateFeedbackRequest } from '@/types/feedback.types';

export function useFeedback() {
  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectFeedbackSubmitting);
  const error = useAppSelector(selectFeedbackError);
  const successMessage = useAppSelector(selectFeedbackSuccessMessage);

  const submitFeedback = useCallback(
    async (payload: CreateFeedbackRequest) => {
      const result = await dispatch(submitFeedbackThunk(payload));
      return submitFeedbackThunk.fulfilled.match(result);
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch(clearFeedbackError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearFeedbackSuccess());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetFeedbackState());
  }, [dispatch]);

  return {
    submitting,
    error,
    successMessage,
    submitFeedback,
    clearError,
    clearSuccess,
    reset,
  };
}

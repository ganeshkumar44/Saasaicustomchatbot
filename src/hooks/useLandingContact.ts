import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectContactError,
  selectContactSubmitting,
  selectContactSuccessMessage,
} from '@/store/contactSelectors';
import {
  clearContactError,
  clearContactSuccess,
  resetContactState,
} from '@/store/contactSlice';
import { submitContactThunk } from '@/store/contactThunk';
import type { ContactRequest } from '@/types/landing.types';

export function useLandingContact() {
  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectContactSubmitting);
  const error = useAppSelector(selectContactError);
  const successMessage = useAppSelector(selectContactSuccessMessage);

  const submit = useCallback(
    async (payload: ContactRequest): Promise<boolean> => {
      const result = await dispatch(submitContactThunk(payload));
      return submitContactThunk.fulfilled.match(result);
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch(resetContactState());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearContactError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearContactSuccess());
  }, [dispatch]);

  return {
    submit,
    submitting,
    error,
    successMessage,
    reset,
    clearError,
    clearSuccess,
  };
}

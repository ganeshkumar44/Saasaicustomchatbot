import axios from 'axios';
import type { ApiErrorResponse } from '@/types/api.types';
import { getApiErrorMessage } from '@/utils/apiError';

export function getSignoutErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.status === 401) {
      return 'Session expired. Please login again.';
    }

    if (!error.response) {
      return 'Network connection error.';
    }

    if (error.response.status >= 500) {
      return 'Sign out failed. Please try again.';
    }

    if (error.response.data?.message) {
      return error.response.data.message;
    }
  }

  return getApiErrorMessage(error);
}

export function shouldForceLocalSignout(errorMessage: string): boolean {
  return [
    'Session expired. Please login again.',
    'User is already signed out.',
    'Authentication token not found.',
    'Authentication token missing.',
    'Please login first.',
  ].includes(errorMessage);
}

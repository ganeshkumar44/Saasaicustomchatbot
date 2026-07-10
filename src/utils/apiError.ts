import axios from 'axios';
import type { ApiErrorResponse } from '@/types/api.types';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.';
    }
    if (error.message === 'Network Error') {
      return 'Network error. Please check your connection and try again.';
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

import type { AuthUser } from '@/types/auth.types';
import { AUTH_TOKEN_KEY } from '@/api/axios';

export interface SignoutValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateSignoutSession(
  isAuthenticated: boolean,
  user: AuthUser | null,
  accessToken: string | null,
): SignoutValidationResult {
  if (!isAuthenticated) {
    return { isValid: false, error: 'User is already signed out.' };
  }

  if (!user) {
    return { isValid: false, error: 'Please login first.' };
  }

  if (!accessToken || accessToken.trim() === '') {
    return { isValid: false, error: 'Authentication token not found.' };
  }

  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!storedToken || storedToken.trim() === '') {
    return { isValid: false, error: 'Authentication token missing.' };
  }

  return { isValid: true, error: null };
}

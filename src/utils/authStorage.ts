import type { AuthUser } from '@/types/auth.types';
import { AUTH_TOKEN_KEY } from '@/api/axios';

export const AUTH_USER_KEY = 'auth_user';
export const AUTH_TOKEN_TYPE_KEY = 'token_type';
export const AUTH_REFRESH_TOKEN_KEY = 'refresh_token';

export interface StoredAuthSession {
  user: AuthUser;
  accessToken: string;
  tokenType: string;
  refreshToken: string | null;
}

export function saveAuthSession(session: StoredAuthSession): void {
  localStorage.setItem(AUTH_TOKEN_KEY, session.accessToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
  localStorage.setItem(AUTH_TOKEN_TYPE_KEY, session.tokenType);

  if (session.refreshToken) {
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, session.refreshToken);
  } else {
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  }
}

export function loadAuthSession(): StoredAuthSession | null {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const userRaw = localStorage.getItem(AUTH_USER_KEY);

  if (!accessToken || !userRaw) {
    return null;
  }

  try {
    const user = JSON.parse(userRaw) as AuthUser;
    const tokenType = localStorage.getItem(AUTH_TOKEN_TYPE_KEY) ?? 'Bearer';
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);

    return {
      user,
      accessToken,
      tokenType,
      refreshToken,
    };
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_TYPE_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
}

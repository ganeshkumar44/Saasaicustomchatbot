const DEFAULT_INACTIVE_TIMEOUT_MINUTES = 10;

export const IDLE_ACTIVITY_STORAGE_KEY = 'auth_last_activity_at';
export const IDLE_LOGOUT_STORAGE_KEY = 'auth_idle_logout';

export function getInactiveTimeoutMs(): number {
  const raw = import.meta.env.VITE_INACTIVE_TIMEOUT_MINUTES;
  const minutes = raw ? Number(raw) : DEFAULT_INACTIVE_TIMEOUT_MINUTES;

  if (!Number.isFinite(minutes) || minutes <= 0) {
    return DEFAULT_INACTIVE_TIMEOUT_MINUTES * 60 * 1000;
  }

  return minutes * 60 * 1000;
}

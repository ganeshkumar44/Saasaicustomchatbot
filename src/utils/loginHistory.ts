import type {
  LoginHistoryRoleFilter,
  LoginHistoryStatusFilter,
  LoginStatus,
  UserLoginHistoryItem,
} from '@/types/loginHistory.types';
import { formatDisplayDate } from '@/utils/formatRelativeTime';

export const USER_LOGIN_HISTORY_DISPLAY_LIMIT = 5;
export const MANAGE_LOGIN_HISTORY_PAGE_SIZE = 10;

export const LOGIN_HISTORY_ROLE_FILTERS: LoginHistoryRoleFilter[] = [
  'all',
  'admin',
  'user',
  'superadmin',
];

export const LOGIN_HISTORY_STATUS_FILTERS: LoginHistoryStatusFilter[] = [
  'all',
  'success',
  'failed',
];

export function getLoginHistoryRoleFilterLabel(filter: LoginHistoryRoleFilter): string {
  if (filter === 'all') {
    return 'All Roles';
  }

  if (filter === 'superadmin') {
    return 'Super Admin';
  }

  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export function getLoginHistoryStatusFilterLabel(filter: LoginHistoryStatusFilter): string {
  if (filter === 'all') {
    return 'All Statuses';
  }

  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export function getLoginStatusBadgeClassName(status: LoginStatus): string {
  if (status === 'success') {
    return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
  }

  return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
}

export function getLoginStatusLabel(status: LoginStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatLoginHistoryDateTime(value: string | null): string {
  return formatDisplayDate(value);
}

export function formatLoginDeviceLabel(
  browser: string | null,
  operatingSystem: string | null,
): string {
  const browserLabel = browser?.trim() || 'Unknown Browser';
  const osLabel = operatingSystem?.trim() || 'Unknown OS';
  return `${browserLabel} on ${osLabel}`;
}

export function formatLoginLocationLabel(
  ipAddress: string | null,
  loginAt: string,
  logoutAt: string | null,
): string {
  const ipLabel = ipAddress?.trim() || 'Unknown IP';
  const loginLabel = formatLoginHistoryDateTime(loginAt);
  const logoutLabel = logoutAt ? formatLoginHistoryDateTime(logoutAt) : null;

  if (logoutLabel) {
    return `${ipLabel} · Login: ${loginLabel} · Logout: ${logoutLabel}`;
  }

  return `${ipLabel} · Login: ${loginLabel}`;
}

export function getLatestUserLoginHistoryItems(
  items: UserLoginHistoryItem[],
  limit: number = USER_LOGIN_HISTORY_DISPLAY_LIMIT,
): UserLoginHistoryItem[] {
  return items.slice(0, limit);
}

export function toApiDateFrom(value: string): string | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

export function toApiDateTo(value: string): string | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const date = new Date(`${value}T23:59:59.999`);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

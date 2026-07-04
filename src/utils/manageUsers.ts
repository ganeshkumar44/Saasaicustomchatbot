import type {
  ManageUserDetail,
  ManageUserFormState,
  ManageUserListItem,
  ManageUserRoleFilter,
  ManageUserStatusFilter,
  UpdateManageUserRequest,
} from '@/types/manageUsers.types';
import type { ValidationResult } from '@/utils/validation';
import { validateUpdateProfileForm } from '@/utils/accountValidation';

export const MANAGE_USERS_PAGE_SIZE = 10;

export const MANAGE_USER_ROLE_FILTERS: ManageUserRoleFilter[] = ['all', 'admin', 'user'];

export const MANAGE_USER_STATUS_FILTERS: ManageUserStatusFilter[] = [
  'all',
  'active',
  'deactivated',
];

export function getManageUserRoleFilterLabel(filter: ManageUserRoleFilter): string {
  if (filter === 'all') {
    return 'All Roles';
  }

  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export function getManageUserStatusFilterLabel(filter: ManageUserStatusFilter): string {
  if (filter === 'all') {
    return 'All Statuses';
  }

  return filter.charAt(0).toUpperCase() + filter.slice(1);
}

export function filterUsersByRole(
  users: ManageUserListItem[],
  roleFilter: ManageUserRoleFilter,
): ManageUserListItem[] {
  if (roleFilter === 'all') {
    return users;
  }

  return users.filter((user) => user.role.toLowerCase() === roleFilter);
}

export function filterUsersByAccountStatus(
  users: ManageUserListItem[],
  statusFilter: ManageUserStatusFilter,
): ManageUserListItem[] {
  if (statusFilter === 'all') {
    return users;
  }

  return users.filter((user) => user.account_status === statusFilter);
}

export function applyManageUserFilters(
  users: ManageUserListItem[],
  roleFilter: ManageUserRoleFilter,
  statusFilter: ManageUserStatusFilter,
): ManageUserListItem[] {
  const byRole = filterUsersByRole(users, roleFilter);
  return filterUsersByAccountStatus(byRole, statusFilter);
}

export function getAccountStatusBadgeClassName(status: string): string {
  if (status === 'active') {
    return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
  }

  if (status === 'deactivated') {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400';
  }

  return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
}

export function getAccountStatusLabel(status: string): string {
  if (status === 'active') {
    return 'Active';
  }

  if (status === 'deactivated') {
    return 'Deactivated';
  }

  if (status === 'deleted') {
    return 'Deleted';
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatManageUserDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function mapManageUserDetailToForm(detail: ManageUserDetail): ManageUserFormState {
  return {
    firstName: detail.first_name,
    lastName: detail.last_name,
    email: detail.email,
    mobile: detail.mobile ?? '',
    company: detail.company ?? '',
    website: detail.website ?? '',
    language: detail.language ?? 'English',
    bio: detail.bio ?? '',
    role: detail.role,
  };
}

export function validateManageUserUpdateForm(
  data: UpdateManageUserRequest,
): ValidationResult {
  const baseValidation = validateUpdateProfileForm(data);

  if (!data.role?.trim()) {
    return {
      isValid: false,
      errors: [...baseValidation.errors, 'Role is required.'],
    };
  }

  const normalizedRole = data.role.trim().toLowerCase();
  if (normalizedRole !== 'admin' && normalizedRole !== 'user') {
    return {
      isValid: false,
      errors: [...baseValidation.errors, 'Please select a valid role.'],
    };
  }

  return baseValidation;
}

export function canDeactivateManageUser(user: ManageUserListItem): boolean {
  return user.account_status === 'active';
}

export function canActivateManageUser(user: ManageUserListItem): boolean {
  return user.account_status === 'deactivated' || user.account_status === 'deleted';
}

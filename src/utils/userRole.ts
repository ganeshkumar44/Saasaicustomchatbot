export const USER_ROLE_SUPERADMIN = 'superadmin';
export const USER_ROLE_ADMIN = 'admin';
export const USER_ROLE_USER = 'user';

export function isSuperAdminRole(role: string | null | undefined): boolean {
  return role?.toLowerCase() === USER_ROLE_SUPERADMIN;
}

/** Returns true only for the Admin role (not Super Admin). */
export function isAdminRole(role: string | null | undefined): boolean {
  return role?.toLowerCase() === USER_ROLE_ADMIN;
}

/**
 * Returns true when the user has admin-level privileges (Admin or Super Admin).
 * Use for permission checks, route guards, menu visibility, and action buttons.
 */
export function hasAdminAccess(role: string | null | undefined): boolean {
  return isAdminRole(role) || isSuperAdminRole(role);
}

/** @deprecated Use hasAdminAccess — kept as alias for existing call sites. */
export function isManageUsersMenuVisibleRole(role: string | null | undefined): boolean {
  return hasAdminAccess(role);
}

export function formatRoleLabel(role: string | null | undefined): string {
  if (!role?.trim()) {
    return 'User';
  }

  const normalized = role.toLowerCase();

  if (normalized === USER_ROLE_SUPERADMIN) {
    return 'Super Admin';
  }

  if (normalized === USER_ROLE_ADMIN) {
    return 'Admin';
  }

  if (normalized === USER_ROLE_USER) {
    return 'User';
  }

  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

export function getRoleBadgeClassName(role: string | null | undefined): string {
  if (hasAdminAccess(role)) {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400';
  }

  return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
}

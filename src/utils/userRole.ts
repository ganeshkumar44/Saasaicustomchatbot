export function isAdminRole(role: string | null | undefined): boolean {
  return role?.toLowerCase() === 'admin';
}

export function formatRoleLabel(role: string | null | undefined): string {
  if (!role?.trim()) {
    return 'User';
  }

  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

export function getRoleBadgeClassName(role: string | null | undefined): string {
  if (isAdminRole(role)) {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400';
  }

  return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
}

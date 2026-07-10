import type { AuthUser } from '@/types/auth.types';
import {
  hasAdminAccess,
  isSuperAdminRole,
  USER_ROLE_SUPERADMIN,
} from '@/utils/userRole';

export function canDeleteChatbot(
  user: Pick<AuthUser, 'id' | 'role'> | null,
  ownerUserId?: number,
): boolean {
  if (!user) {
    return false;
  }

  if (hasAdminAccess(user.role)) {
    return true;
  }

  if (ownerUserId === undefined) {
    return true;
  }

  return ownerUserId === user.id;
}

export function canActivateChatbot(
  user: Pick<AuthUser, 'role'> | null,
): boolean {
  return hasAdminAccess(user?.role);
}

/**
 * Return true when the actor may permanently delete a chatbot owned by the given role.
 *
 * SuperAdmin: any chatbot.
 * Admin: Admin and User chatbots only (not SuperAdmin-owned).
 * User: never.
 */
export function canPermanentlyDeleteChatbot(
  user: Pick<AuthUser, 'role'> | null,
  ownerRole?: string | null,
): boolean {
  if (!user || !hasAdminAccess(user.role)) {
    return false;
  }

  if (isSuperAdminRole(user.role)) {
    return true;
  }

  if (ownerRole == null || ownerRole === '') {
    return false;
  }

  return ownerRole.toLowerCase() !== USER_ROLE_SUPERADMIN;
}

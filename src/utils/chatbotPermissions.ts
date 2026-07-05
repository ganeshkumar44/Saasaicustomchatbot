import type { AuthUser } from '@/types/auth.types';
import { hasAdminAccess } from '@/utils/userRole';

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

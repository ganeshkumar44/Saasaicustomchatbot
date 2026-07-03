import type { AuthUser } from '@/types/auth.types';
import { isAdminRole } from '@/utils/userRole';

export function canDeleteChatbot(
  user: Pick<AuthUser, 'id' | 'role'> | null,
  ownerUserId?: number,
): boolean {
  if (!user) {
    return false;
  }

  if (isAdminRole(user.role)) {
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
  return isAdminRole(user?.role);
}

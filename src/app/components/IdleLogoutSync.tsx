import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { router } from '@/app/routes';
import { getInactiveTimeoutMs } from '@/constants/auth';
import { INACTIVE_LOGOUT_MESSAGE } from '@/constants/authMessages';
import { useIdleLogout } from '@/hooks/useIdleLogout';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSelectors';
import { logout } from '@/store/authSlice';
import { signoutUser } from '@/store/authThunk';
import { store } from '@/store/index';

export function IdleLogoutSync() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoggingOutRef = useRef(false);
  const inactiveTimeoutMs = getInactiveTimeoutMs();

  const handleIdleLogout = useCallback(async () => {
    if (isLoggingOutRef.current) {
      return;
    }

    if (!store.getState().auth.isAuthenticated) {
      return;
    }

    isLoggingOutRef.current = true;

    try {
      const result = await store.dispatch(signoutUser());

      if (!signoutUser.fulfilled.match(result)) {
        store.dispatch(logout());
      }

      toast.info(INACTIVE_LOGOUT_MESSAGE);
      router.navigate('/signin', { replace: true });
    } finally {
      isLoggingOutRef.current = false;
    }
  }, []);

  useIdleLogout(handleIdleLogout, inactiveTimeoutMs, isAuthenticated);

  return null;
}

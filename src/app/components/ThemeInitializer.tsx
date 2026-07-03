import { useEffect, type PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSelectors';
import {
  selectThemeInitialized,
  selectThemeLoading,
} from '@/store/themeSelectors';
import { fetchThemeMode } from '@/store/themeThunk';

export function ThemeInitializer({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialized = useAppSelector(selectThemeInitialized);
  const loading = useAppSelector(selectThemeLoading);

  useEffect(() => {
    if (isAuthenticated && !initialized && !loading) {
      void dispatch(fetchThemeMode());
    }
  }, [dispatch, initialized, isAuthenticated, loading]);

  if (isAuthenticated && !initialized) {
    return null;
  }

  return children;
}

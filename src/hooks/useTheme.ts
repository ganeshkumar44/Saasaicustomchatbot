import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectThemeError,
  selectThemeInitialized,
  selectThemeLoading,
  selectThemeMode,
} from '@/store/themeSelectors';
import { fetchThemeMode, updateThemeModeThunk } from '@/store/themeThunk';
import type { ThemeMode } from '@/types/theme.types';

export function useAppTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectThemeMode);
  const loading = useAppSelector(selectThemeLoading);
  const error = useAppSelector(selectThemeError);
  const initialized = useAppSelector(selectThemeInitialized);

  const fetchTheme = useCallback(
    () => dispatch(fetchThemeMode()),
    [dispatch],
  );

  const toggleTheme = useCallback(async () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    const result = await dispatch(updateThemeModeThunk(nextTheme));

    if (updateThemeModeThunk.fulfilled.match(result)) {
      toast.success(result.payload.message);
      return;
    }

    const errorMessage =
      result.payload ?? 'Failed to update theme. Please try again.';
    toast.error(errorMessage);
  }, [dispatch, theme]);

  const setThemeMode = useCallback(
    async (mode: ThemeMode) => {
      const result = await dispatch(updateThemeModeThunk(mode));

      if (updateThemeModeThunk.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return;
      }

      const errorMessage =
        result.payload ?? 'Failed to update theme. Please try again.';
      toast.error(errorMessage);
    },
    [dispatch],
  );

  return {
    theme,
    loading,
    error,
    initialized,
    toggleTheme,
    fetchTheme,
    setThemeMode,
  };
}

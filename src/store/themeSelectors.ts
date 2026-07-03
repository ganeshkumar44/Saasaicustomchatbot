import type { RootState } from '@/store/index';

export const selectThemeMode = (state: RootState) => state.theme.theme;

export const selectThemeLoading = (state: RootState): boolean =>
  state.theme.loading;

export const selectThemeError = (state: RootState): string | null =>
  state.theme.error;

export const selectThemeInitialized = (state: RootState): boolean =>
  state.theme.initialized;

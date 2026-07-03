import type { ThemeMode } from '@/types/theme.types';

export function normalizeThemeMode(value: string): ThemeMode {
  return value === 'light' ? 'light' : 'dark';
}

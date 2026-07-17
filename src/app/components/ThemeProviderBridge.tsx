import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSelectors';
import {
  selectThemeInitialized,
  selectThemeMode,
} from '@/store/themeSelectors';

export function ThemeProviderBridge({ children }: PropsWithChildren) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const theme = useAppSelector(selectThemeMode);
  const initialized = useAppSelector(selectThemeInitialized);

  // Auth screens (unauthenticated) always render in light theme. Once the
  // user is logged in and their saved theme is loaded, apply the selected
  // theme; until then default to light.
  const forcedTheme = isAuthenticated && initialized ? theme : 'light';

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme={forcedTheme}
      storageKey="saasa-theme-preference"
    >
      {children}
    </ThemeProvider>
  );
}

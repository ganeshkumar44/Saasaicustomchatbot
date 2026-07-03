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

  const forcedTheme = isAuthenticated && initialized ? theme : 'dark';

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme={forcedTheme}
      storageKey="saasa-theme-preference"
    >
      {children}
    </ThemeProvider>
  );
}

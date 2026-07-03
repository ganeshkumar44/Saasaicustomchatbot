import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import {
  selectThemeInitialized,
  selectThemeMode,
} from '@/store/themeSelectors';

export function ThemeProviderBridge({ children }: PropsWithChildren) {
  const theme = useAppSelector(selectThemeMode);
  const initialized = useAppSelector(selectThemeInitialized);

  const forcedTheme = initialized ? theme : 'dark';

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

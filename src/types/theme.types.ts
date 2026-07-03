export type ThemeMode = 'light' | 'dark';

export interface ThemeData {
  theme: ThemeMode;
}

export interface ThemeResponse {
  success: true;
  message: string | null;
  data: ThemeData;
}

export interface UpdateThemeRequest {
  theme: ThemeMode;
}

export interface UpdateThemeResponse {
  success: true;
  message: string;
  data: ThemeData;
}

export interface ThemeState {
  theme: ThemeMode;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

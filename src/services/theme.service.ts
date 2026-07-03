import { apiClient } from '@/api/axios';
import type {
  ThemeMode,
  ThemeResponse,
  UpdateThemeResponse,
} from '@/types/theme.types';

export async function getThemeMode(): Promise<ThemeResponse> {
  const response = await apiClient.get<ThemeResponse>('/v1/theme/color-mode');
  return response.data;
}

export async function updateThemeMode(theme: ThemeMode): Promise<UpdateThemeResponse> {
  const response = await apiClient.put<UpdateThemeResponse>(
    '/v1/theme/color-mode',
    { theme },
  );
  return response.data;
}

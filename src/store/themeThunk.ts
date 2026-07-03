import { createAsyncThunk } from '@reduxjs/toolkit';
import { getThemeMode, updateThemeMode } from '@/services/theme.service';
import type { ThemeMode } from '@/types/theme.types';
import { getApiErrorMessage } from '@/utils/apiError';
import { normalizeThemeMode } from '@/utils/theme';

interface FetchThemeModePayload {
  theme: ThemeMode;
}

interface UpdateThemeModePayload {
  message: string;
  theme: ThemeMode;
}

export const fetchThemeMode = createAsyncThunk<
  FetchThemeModePayload,
  void,
  { rejectValue: string }
>('theme/fetchThemeMode', async (_, { rejectWithValue }) => {
  try {
    const response = await getThemeMode();
    return {
      theme: normalizeThemeMode(response.data.theme),
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateThemeModeThunk = createAsyncThunk<
  UpdateThemeModePayload,
  ThemeMode,
  { rejectValue: string }
>('theme/updateThemeMode', async (theme, { rejectWithValue }) => {
  try {
    const response = await updateThemeMode(theme);
    return {
      message: response.message,
      theme: normalizeThemeMode(response.data.theme),
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

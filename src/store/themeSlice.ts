import { createSlice } from '@reduxjs/toolkit';
import { logout } from '@/store/authSlice';
import { fetchThemeMode, updateThemeModeThunk } from '@/store/themeThunk';
import type { ThemeState } from '@/types/theme.types';

const initialState: ThemeState = {
  theme: 'dark',
  loading: false,
  error: null,
  initialized: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    clearThemeError: (state) => {
      state.error = null;
    },
    resetThemeState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThemeMode.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.theme = action.payload.theme;
        state.initialized = true;
      })
      .addCase(fetchThemeMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load theme. Please try again.';
        state.initialized = true;
      })
      .addCase(updateThemeModeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateThemeModeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.theme = action.payload.theme;
        state.initialized = true;
      })
      .addCase(updateThemeModeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update theme. Please try again.';
      })
      .addCase(logout, () => initialState);
  },
});

export const { clearThemeError, resetThemeState } = themeSlice.actions;

export default themeSlice.reducer;

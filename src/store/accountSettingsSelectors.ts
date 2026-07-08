import type { RootState } from '@/store/index';

export const selectUserDetails = (state: RootState) =>
  state.accountSettings.userDetails;

export const selectProfileLoading = (state: RootState): boolean =>
  state.accountSettings.profileLoading;

export const selectProfileUpdating = (state: RootState): boolean =>
  state.accountSettings.profileUpdating;

export const selectPasswordUpdating = (state: RootState): boolean =>
  state.accountSettings.passwordUpdating;

export const selectRemoveProfilePictureLoading = (state: RootState): boolean =>
  state.accountSettings.removeProfilePictureLoading;

export const selectActivateLoading = (state: RootState): boolean =>
  state.accountSettings.activateLoading;

export const selectDeactivateLoading = (state: RootState): boolean =>
  state.accountSettings.deactivateLoading;

export const selectDeleteLoading = (state: RootState): boolean =>
  state.accountSettings.deleteLoading;

export const selectAccountSettingsSuccess = (state: RootState): boolean =>
  state.accountSettings.success;

export const selectAccountSettingsError = (state: RootState): string | null =>
  state.accountSettings.error;

export const selectAccountSettingsSuccessMessage = (
  state: RootState,
): string | null => state.accountSettings.successMessage;

export const selectUserLoginHistory = (state: RootState) =>
  state.accountSettings.loginHistory;

export const selectUserLoginHistoryLoading = (state: RootState): boolean =>
  state.accountSettings.loginHistoryLoading;

export const selectUserLoginHistoryError = (state: RootState): string | null =>
  state.accountSettings.loginHistoryError;

export const selectNotificationSettings = (state: RootState) =>
  state.accountSettings.notificationSettings;

export const selectNotificationSettingsLoading = (state: RootState): boolean =>
  state.accountSettings.notificationSettingsLoading;

export const selectNotificationSettingsSaving = (state: RootState): boolean =>
  state.accountSettings.notificationSettingsSaving;

export const selectNotificationSettingsError = (state: RootState): string | null =>
  state.accountSettings.notificationSettingsError;

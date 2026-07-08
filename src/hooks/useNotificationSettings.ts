import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearNotificationSettingsError } from '@/store/accountSettingsSlice';
import {
  selectNotificationSettings,
  selectNotificationSettingsError,
  selectNotificationSettingsLoading,
  selectNotificationSettingsSaving,
} from '@/store/accountSettingsSelectors';
import {
  fetchNotificationSettings,
  updateNotificationSettings as updateNotificationSettingsThunk,
} from '@/store/accountSettingsThunk';
import type { NotificationSettings, NotificationSettingsKey } from '@/types/notification.types';

export function useNotificationSettings(enabled: boolean) {
  const dispatch = useAppDispatch();
  const notificationSettings = useAppSelector(selectNotificationSettings);
  const loading = useAppSelector(selectNotificationSettingsLoading);
  const saving = useAppSelector(selectNotificationSettingsSaving);
  const error = useAppSelector(selectNotificationSettingsError);
  const isSavingRef = useRef(false);

  const refresh = useCallback(() => {
    void dispatch(fetchNotificationSettings());
  }, [dispatch]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    refresh();
  }, [enabled, refresh]);

  const updateNotificationSettings = useCallback(
    async (nextSettings: NotificationSettings) => {
      if (isSavingRef.current) {
        return { success: false };
      }

      isSavingRef.current = true;
      dispatch(clearNotificationSettingsError());

      const result = await dispatch(updateNotificationSettingsThunk(nextSettings));

      isSavingRef.current = false;

      if (updateNotificationSettingsThunk.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return { success: true };
      }

      const errorMessage =
        result.payload ?? 'Failed to update notification settings. Please try again.';
      toast.error(errorMessage);
      return { success: false };
    },
    [dispatch],
  );

  const toggleNotificationSetting = useCallback(
    async (key: NotificationSettingsKey) => {
      if (!notificationSettings || saving) {
        return;
      }

      const nextSettings: NotificationSettings = {
        ...notificationSettings,
        [key]: !notificationSettings[key],
      };

      await updateNotificationSettings(nextSettings);
    },
    [notificationSettings, saving, updateNotificationSettings],
  );

  const saveNotificationSettings = useCallback(async () => {
    if (!notificationSettings || saving) {
      return;
    }

    await updateNotificationSettings(notificationSettings);
  }, [notificationSettings, saving, updateNotificationSettings]);

  const clearError = useCallback(() => {
    dispatch(clearNotificationSettingsError());
  }, [dispatch]);

  return {
    notificationSettings,
    loading,
    saving,
    error,
    refresh,
    updateNotificationSettings,
    toggleNotificationSetting,
    saveNotificationSettings,
    clearError,
  };
}

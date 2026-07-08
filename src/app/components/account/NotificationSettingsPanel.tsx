import { memo } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';
import { NOTIFICATION_SETTINGS_SECTIONS } from '@/types/notification.types';
import type { NotificationSettingsKey } from '@/types/notification.types';

const SkeletonNotificationSettings = memo(function SkeletonNotificationSettings() {
  return (
    <div className="space-y-6">
      {NOTIFICATION_SETTINGS_SECTIONS.map((group) => (
        <div key={group.section}>
          <Skeleton className="h-4 w-40 mb-3" />
          <div className="space-y-4">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-full max-w-sm" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    </div>
  );
});

interface NotificationToggleProps {
  enabled: boolean;
  disabled: boolean;
  onToggle: () => void;
}

function NotificationToggle({ enabled, disabled, onToggle }: NotificationToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={enabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed ${
        enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

interface NotificationSettingsPanelProps {
  enabled: boolean;
}

export function NotificationSettingsPanel({ enabled }: NotificationSettingsPanelProps) {
  const {
    notificationSettings,
    loading,
    saving,
    error,
    refresh,
    toggleNotificationSetting,
    saveNotificationSettings,
    clearError,
  } = useNotificationSettings(enabled);

  const handleToggle = (key: NotificationSettingsKey) => {
    void toggleNotificationSetting(key);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        <SkeletonNotificationSettings />
      </div>
    );
  }

  if (error && !notificationSettings) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="py-8 text-center">
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => {
              clearError();
              refresh();
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!notificationSettings) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <p className="py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          No notification settings found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
      {NOTIFICATION_SETTINGS_SECTIONS.map((group) => (
        <div key={group.section}>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {group.section}
          </h3>
          <div className="space-y-4">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <NotificationToggle
                  enabled={notificationSettings[item.key]}
                  disabled={saving}
                  onToggle={() => handleToggle(item.key)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={() => void saveNotificationSettings()}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}

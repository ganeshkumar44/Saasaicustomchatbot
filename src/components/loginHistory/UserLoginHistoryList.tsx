import { Loader2 } from 'lucide-react';
import { CurrentSessionBadge } from '@/components/loginHistory/CurrentSessionBadge';
import {
  LoginHistoryDeviceIcon,
  SkeletonLoginHistoryList,
} from '@/components/loginHistory/SkeletonLoginHistory';
import { LoginStatusBadge } from '@/components/loginHistory/LoginStatusBadge';
import type { UserLoginHistoryItem } from '@/types/loginHistory.types';
import {
  formatLoginDeviceLabel,
  formatLoginHistoryDateTime,
  formatLoginLocationLabel,
} from '@/utils/loginHistory';

interface UserLoginHistoryListProps {
  items: UserLoginHistoryItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function UserLoginHistoryList({
  items,
  loading,
  error,
  onRetry,
}: UserLoginHistoryListProps) {
  if (loading) {
    return <SkeletonLoginHistoryList />;
  }

  if (error) {
    return (
      <div className="py-6 text-center">
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        No login history found.
      </p>
    );
  }

  return (
    <>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-start justify-between gap-4 py-3 ${
            index > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''
          } ${item.is_current_session ? 'bg-blue-50/60 dark:bg-blue-950/20 -mx-2 px-2 rounded-lg' : ''}`}
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <LoginHistoryDeviceIcon deviceType={item.device_type} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium dark:text-white">
                {formatLoginDeviceLabel(item.browser, item.operating_system)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {item.device_type ?? 'Unknown Device'} · {item.ip_address ?? 'Unknown IP'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Login: {formatLoginHistoryDateTime(item.login_at)}
              </p>
              {item.logout_at && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Logout: {formatLoginHistoryDateTime(item.logout_at)}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 lg:hidden">
                {formatLoginLocationLabel(item.ip_address, item.login_at, item.logout_at)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <LoginStatusBadge status={item.login_status} />
            {item.is_current_session && <CurrentSessionBadge />}
          </div>
        </div>
      ))}
    </>
  );
}

export function UserLoginHistorySection({
  items,
  loading,
  error,
  onRetry,
}: UserLoginHistoryListProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold dark:text-white">Active Sessions</h2>
        {loading && <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />}
      </div>
      <UserLoginHistoryList
        items={items}
        loading={loading}
        error={error}
        onRetry={onRetry}
      />
    </div>
  );
}

import { CurrentSessionBadge } from '@/components/loginHistory/CurrentSessionBadge';
import { LoginStatusBadge } from '@/components/loginHistory/LoginStatusBadge';
import { SkeletonLoginHistoryTable } from '@/components/loginHistory/SkeletonLoginHistory';
import type { ManageLoginHistoryItem } from '@/types/loginHistory.types';
import { formatLoginHistoryDateTime } from '@/utils/loginHistory';
import { formatRoleLabel, getRoleBadgeClassName } from '@/utils/userRole';

interface ManageLoginHistoryTableProps {
  items: ManageLoginHistoryItem[];
  loading: boolean;
}

export function ManageLoginHistoryTable({ items, loading }: ManageLoginHistoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Browser
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Operating System
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Device Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              IP Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Login Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Logout Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Login Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Current Session
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {loading ? (
            <SkeletonLoginHistoryTable rowCount={8} />
          ) : items.length === 0 ? (
            <tr>
              <td
                colSpan={11}
                className="px-6 py-12 text-center text-gray-600 dark:text-gray-400"
              >
                No login history available.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  item.is_current_session ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-white">
                  {item.user_name ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {item.email ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.role ? (
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClassName(item.role)}`}
                    >
                      {formatRoleLabel(item.role)}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {item.browser ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {item.operating_system ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {item.device_type ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {item.ip_address ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {formatLoginHistoryDateTime(item.login_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {formatLoginHistoryDateTime(item.logout_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <LoginStatusBadge status={item.login_status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.is_current_session ? <CurrentSessionBadge /> : '—'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

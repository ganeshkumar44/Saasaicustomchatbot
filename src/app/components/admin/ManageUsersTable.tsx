import { Skeleton } from '@/app/components/ui/skeleton';
import {
  ManageUserActionsMenu,
  ManageUserAvatar,
} from '@/app/components/admin/ManageUserActionsMenu';
import type { ManageUserListItem } from '@/types/manageUsers.types';
import {
  formatManageUserDate,
  getAccountStatusBadgeClassName,
  getAccountStatusLabel,
} from '@/utils/manageUsers';
import { formatRoleLabel, getRoleBadgeClassName } from '@/utils/userRole';

interface ManageUsersTableProps {
  users: ManageUserListItem[];
  loading: boolean;
  onEdit: (user: ManageUserListItem) => void;
  onDeactivate: (user: ManageUserListItem) => void;
  onActivate: (user: ManageUserListItem) => void;
}

function ManageUsersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={`manage-user-skeleton-${index}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="w-10 h-10 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-40" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-10" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-5 w-20 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <Skeleton className="h-5 w-5 ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function ManageUsersTable({
  users,
  loading,
  onEdit,
  onDeactivate,
  onActivate,
}: ManageUsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Profile Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Mobile
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Chatbots
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Account Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {loading ? (
            <ManageUsersTableSkeleton />
          ) : users.length === 0 ? (
            <tr>
              <td
                colSpan={11}
                className="px-6 py-12 text-center text-gray-600 dark:text-gray-400"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <ManageUserAvatar
                    profileImage={user.profile_image}
                    fullName={user.full_name}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium dark:text-white">
                  {user.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {user.mobile ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClassName(user.role)}`}
                  >
                    {formatRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {user.company ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {user.total_chatbots}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountStatusBadgeClassName(user.account_status)}`}
                  >
                    {getAccountStatusLabel(user.account_status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.email_verified
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {user.email_verified ? 'Verified' : 'Unverified'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {formatManageUserDate(user.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ManageUserActionsMenu
                    user={user}
                    onEdit={onEdit}
                    onDeactivate={onDeactivate}
                    onActivate={onActivate}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import { MoreVertical, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { ManageUserListItem } from '@/types/manageUsers.types';
import {
  canActivateManageUser,
  canDeactivateManageUser,
} from '@/utils/manageUsers';

interface ManageUserActionsMenuProps {
  user: ManageUserListItem;
  onEdit: (user: ManageUserListItem) => void;
  onDeactivate: (user: ManageUserListItem) => void;
  onActivate: (user: ManageUserListItem) => void;
}

export function ManageUserActionsMenu({
  user,
  onEdit,
  onDeactivate,
  onActivate,
}: ManageUserActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label={`Actions for ${user.full_name}`}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[10rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => onEdit(user)}
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-950/60 dark:focus:text-blue-300"
        >
          Edit Information
        </DropdownMenuItem>
        {canDeactivateManageUser(user) && (
          <DropdownMenuItem
            onClick={() => onDeactivate(user)}
            className="rounded-md px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400"
          >
            Delete Account
          </DropdownMenuItem>
        )}
        {canActivateManageUser(user) && (
          <DropdownMenuItem
            onClick={() => onActivate(user)}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer focus:bg-blue-50 focus:text-blue-700 dark:focus:bg-blue-950/60 dark:focus:text-blue-300"
          >
            Activate Account
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ManageUserAvatarProps {
  profileImage: string | null;
  fullName: string;
}

export function ManageUserAvatar({ profileImage, fullName }: ManageUserAvatarProps) {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={fullName}
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#003A96] flex items-center justify-center text-white font-medium">
      {fullName.trim() ? (
        fullName.charAt(0).toUpperCase()
      ) : (
        <User className="w-5 h-5" />
      )}
    </div>
  );
}

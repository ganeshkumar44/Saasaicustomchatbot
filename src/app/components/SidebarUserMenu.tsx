import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { AuthUser } from '@/types/auth.types';
import { useUserPlan } from '@/hooks/useUserPlan';

interface SidebarUserMenuProps {
  user: AuthUser | null;
  profileImage: string | null;
  roleLabel: string;
  roleBadgeClassName: string;
  collapsed: boolean;
  signoutLoading: boolean;
  onSignout: () => void;
}

export function SidebarUserMenu({
  user,
  profileImage,
  roleLabel,
  roleBadgeClassName,
  collapsed,
  signoutLoading,
  onSignout,
}: SidebarUserMenuProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { showPlan, planDisplayName } = useUserPlan();

  const fullName = user
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
    : 'User';

  const handleSettings = () => {
    setOpen(false);
    navigate('/dashboard/settings');
  };

  const handleSignout = () => {
    setOpen(false);
    onSignout();
  };

  const renderAvatar = (sizeClass: string, iconClass: string) => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt="Profile"
          className={`${sizeClass} rounded-full object-cover flex-shrink-0 ring-2 ring-gray-100 dark:ring-gray-800`}
        />
      );
    }

    return (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 ring-2 ring-gray-100 dark:ring-gray-800`}
      >
        <User className={`${iconClass} text-white`} />
      </div>
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`w-full rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            collapsed ? 'flex justify-center p-1' : 'flex items-center gap-3 px-1 py-1'
          }`}
          aria-label="Open account menu"
        >
          {collapsed ? (
            renderAvatar('w-8 h-8', 'w-4 h-4')
          ) : (
            <>
              {renderAvatar('w-8 h-8', 'w-4 h-4')}
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium dark:text-white truncate">{fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email ?? ''}
                </p>
                {user?.role && (
                  <div className="flex flex-wrap items-center gap-1 mt-1">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${roleBadgeClassName}`}
                    >
                      {roleLabel}
                    </span>
                    {showPlan && planDisplayName && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        Plan {planDisplayName}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align={collapsed ? 'center' : 'start'}
        sideOffset={8}
        className="w-64 p-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg"
      >
        <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center text-center gap-2">
            {renderAvatar('w-14 h-14', 'w-6 h-6')}
            <div className="min-w-0 w-full">
              <p className="text-sm font-semibold dark:text-white truncate">{fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {user?.email ?? ''}
              </p>
              {user?.role && (
                <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeClassName}`}
                  >
                    {roleLabel}
                  </span>
                  {showPlan && planDisplayName && (
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      Plan {planDisplayName}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-1.5">
          <DropdownMenuItem
            onClick={handleSettings}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-800"
          >
            <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-gray-100 dark:bg-gray-800" />

          <DropdownMenuItem
            onClick={handleSignout}
            disabled={signoutLoading}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400 [&_svg]:text-red-600 dark:[&_svg]:text-red-400"
          >
            {signoutLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

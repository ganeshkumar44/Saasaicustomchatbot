import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { selectUserDetails } from '@/store/accountSettingsSelectors';
import { fetchUserDetails } from '@/store/accountSettingsThunk';
import { useAuth } from '@/hooks/useAuth';
import { useAppTheme } from '@/hooks/useTheme';
import { formatRoleLabel, getRoleBadgeClassName, hasAdminAccess } from '@/utils/userRole';
import { useChatbot } from '@/hooks/useChatbot';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  CreditCard,
  Plus,
  Moon,
  Sun,
  UserCog,
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { SidebarUserMenu } from '@/app/components/SidebarUserMenu';
import { NgMarkIcon } from '@/assets/logos';
import { fetchCurrentUserProfile } from '@/store/authThunk';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { theme, toggleTheme, loading: themeLoading } = useAppTheme();
  const user = useAppSelector(selectUser);
  const userDetails = useAppSelector(selectUserDetails);
  const roleLabel = formatRoleLabel(user?.role);
  const roleBadgeClassName = getRoleBadgeClassName(user?.role);
  const { signout, signoutLoading } = useAuth();
  const { createDraft, createDraftLoading, canCreateChatbot } = useChatbot();

  useEffect(() => {
    void dispatch(fetchUserDetails());
    void dispatch(fetchCurrentUserProfile());
  }, [dispatch]);

  const profileImage = user?.profile_image ?? userDetails?.profile_image ?? null;

  const handleLogout = () => {
    void signout();
  };

  const handleMenuClick = (path: string, label: string) => {
    if (label === 'Create Chatbot') {
      if (!canCreateChatbot) {
        return;
      }

      void createDraft();
      return;
    }

    navigate(path);
  };

  const showManageUsersMenu = hasAdminAccess(user?.role);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/create', icon: Plus, label: 'Create Chatbot' },
    { path: '/dashboard/history', icon: MessageSquare, label: 'Chat History' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { path: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
    ...(showManageUsersMenu
      ? [{ path: '/dashboard/manage-users', icon: UserCog, label: 'Manage Users' }]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-[64px]' : 'w-60'
        } transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0 relative`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800 overflow-hidden">
          {collapsed ? (
            <NgMarkIcon />
          ) : (
            <div className="flex items-center gap-2 px-4 w-full">
              <NgMarkIcon />
              <span className="font-bold text-lg dark:text-white whitespace-nowrap">NexGenChat</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path, item.label)}
              title={collapsed ? item.label : undefined}
              disabled={
                item.label === 'Create Chatbot' &&
                (createDraftLoading || !canCreateChatbot)
              }
              className={`w-full flex items-center gap-3 py-3 transition-colors ${
                collapsed ? 'justify-center px-0' : 'px-4'
              } ${
                isActive(item.path)
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User info */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-3">
          <SidebarUserMenu
            user={user}
            profileImage={profileImage}
            roleLabel={roleLabel}
            roleBadgeClassName={roleBadgeClassName}
            collapsed={collapsed}
            signoutLoading={signoutLoading}
            onSignout={handleLogout}
          />
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => void toggleTheme()}
              disabled={themeLoading}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

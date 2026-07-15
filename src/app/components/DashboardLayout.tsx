import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCanViewAnalytics, selectUser } from '@/store/authSelectors';
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
  Menu,
  X,
} from 'lucide-react';
import { SidebarUserMenu } from '@/app/components/SidebarUserMenu';
import { FeedbackFloatingButton } from '@/app/components/feedback/FeedbackFloatingButton';
import { NgMarkIcon } from '@/assets/logos';
import { fetchCurrentUserProfile } from '@/store/authThunk';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { theme, toggleTheme, loading: themeLoading } = useAppTheme();
  const user = useAppSelector(selectUser);
  const userDetails = useAppSelector(selectUserDetails);
  const roleLabel = formatRoleLabel(user?.role);
  const roleBadgeClassName = getRoleBadgeClassName(user?.role);
  const { signout, signoutLoading } = useAuth();
  const { createDraft, createDraftLoading, hasDraft } = useChatbot();

  useEffect(() => {
    void dispatch(fetchUserDetails());
    void dispatch(fetchCurrentUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const profileImage = user?.profile_image ?? userDetails?.profile_image ?? null;

  const handleLogout = () => {
    void signout();
  };

  const handleMenuClick = (path: string, label: string) => {
    if (label === 'Create Chatbot' || label === 'Continue Draft') {
      void createDraft();
      setMobileMenuOpen(false);
      return;
    }

    navigate(path);
    setMobileMenuOpen(false);
  };

  const showManageUsersMenu = hasAdminAccess(user?.role);
  const showAnalyticsMenu = useAppSelector(selectCanViewAnalytics);
  const createLabel = hasDraft ? 'Continue Draft' : 'Create Chatbot';

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/create', icon: Plus, label: createLabel },
    { path: '/dashboard/history', icon: MessageSquare, label: 'Chat History' },
    ...(showAnalyticsMenu
      ? [{ path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' }]
      : []),
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

  const showExpandedLabels = mobileMenuOpen || !collapsed;

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-950">
      {mobileMenuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      ) : null}

      {/* Sidebar — off-canvas on mobile, collapsible on tablet/desktop */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col flex-shrink-0
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          w-60
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:transition-[width] md:duration-300
          ${collapsed ? 'md:w-[64px]' : 'md:w-60'}
        `}
      >
        {/* Logo — desktop/tablet only (mobile logo is in header) */}
        <div className="h-16 hidden md:flex items-center justify-center border-b border-gray-200 dark:border-gray-800 overflow-hidden">
          {collapsed ? (
            <NgMarkIcon />
          ) : (
            <div className="flex items-center gap-2 px-4 w-full">
              <NgMarkIcon />
              <span className="font-bold text-lg dark:text-white whitespace-nowrap">NexGenChat</span>
            </div>
          )}
        </div>

        {/* Mobile drawer header */}
        <div className="h-16 flex md:hidden items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <NgMarkIcon />
            <span className="font-bold text-lg dark:text-white">NexGenChat</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path, item.label)}
              title={!showExpandedLabels ? item.label : undefined}
              disabled={
                (item.label === 'Create Chatbot' || item.label === 'Continue Draft')
                && createDraftLoading
              }
              className={`w-full flex items-center gap-3 py-3 transition-colors px-4 ${
                !showExpandedLabels ? 'md:justify-center md:px-0' : ''
              } ${
                isActive(item.path)
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {showExpandedLabels && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User info — tablet/desktop sidebar only */}
        <div className="hidden md:block border-t border-gray-200 dark:border-gray-800 p-3">
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

        {/* Collapse toggle — tablet/desktop only */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
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
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <div className="md:hidden flex items-center gap-2 min-w-0">
              <NgMarkIcon />
              <span className="font-bold text-base dark:text-white truncate">NexGenChat</span>
            </div>
            <div className="hidden md:block flex-1" />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => void toggleTheme()}
              disabled={themeLoading}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <div className="md:hidden">
              <SidebarUserMenu
                user={user}
                profileImage={profileImage}
                roleLabel={roleLabel}
                roleBadgeClassName={roleBadgeClassName}
                collapsed
                placement="header"
                signoutLoading={signoutLoading}
                onSignout={handleLogout}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>

      <FeedbackFloatingButton />
    </div>
  );
}

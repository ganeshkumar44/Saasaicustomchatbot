import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useTheme } from 'next-themes';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { useAuth } from '@/hooks/useAuth';
import { useChatbot } from '@/hooks/useChatbot';
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  BarChart3,
  CreditCard,
  Plus,
  Moon,
  Sun,
  LogOut,
  Loader2,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const user = useAppSelector(selectUser);
  const { signout, signoutLoading } = useAuth();
  const { createDraft, createDraftLoading } = useChatbot();

  const handleLogout = () => {
    void signout();
  };

  const handleMenuClick = (path: string, label: string) => {
    if (label === 'Create Chatbot') {
      void createDraft();
      return;
    }

    navigate(path);
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/create', icon: Plus, label: 'Create Chatbot' },
    { path: '/dashboard/history', icon: MessageSquare, label: 'Chat History' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { path: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const renderUserAvatar = (sizeClass: string, iconClass: string) => {
    if (user?.profile_image) {
      return (
        <img
          src={user.profile_image}
          alt="Profile"
          className={`${sizeClass} rounded-full object-cover flex-shrink-0`}
        />
      );
    }

    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
        <User className={`${iconClass} text-white`} />
      </div>
    );
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
            <Bot className="w-7 h-7 text-blue-600" />
          ) : (
            <div className="flex items-center gap-2 px-4 w-full">
              <Bot className="w-7 h-7 text-blue-600 flex-shrink-0" />
              <span className="font-bold text-lg dark:text-white whitespace-nowrap">ChatAI</span>
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
              disabled={item.label === 'Create Chatbot' && createDraftLoading}
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
          {collapsed ? (
            <div className="flex justify-center">
              {renderUserAvatar('w-8 h-8', 'w-4 h-4')}
            </div>
          ) : (
            <div className="flex items-center gap-3 px-1">
              {renderUserAvatar('w-8 h-8', 'w-4 h-4')}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium dark:text-white truncate">
                  {user ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}` : 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email ?? ''}
                </p>
              </div>
            </div>
          )}
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
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={handleLogout}
              disabled={signoutLoading}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {signoutLoading ? (
                <Loader2 className="w-5 h-5 text-gray-600 dark:text-gray-300 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
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

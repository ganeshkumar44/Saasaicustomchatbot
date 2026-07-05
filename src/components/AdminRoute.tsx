import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { hasAdminAccess } from '@/utils/userRole';

export function AdminRoute() {
  const user = useAppSelector(selectUser);

  if (!hasAdminAccess(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

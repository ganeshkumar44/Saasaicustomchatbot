import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { isAdminRole } from '@/utils/userRole';

export function AdminRoute() {
  const user = useAppSelector(selectUser);

  if (!isAdminRole(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

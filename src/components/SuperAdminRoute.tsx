import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { isSuperAdminRole } from '@/utils/userRole';

export function SuperAdminRoute() {
  const user = useAppSelector(selectUser);

  if (!isSuperAdminRole(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

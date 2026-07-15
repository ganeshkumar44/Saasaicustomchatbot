import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { selectCanViewAnalytics } from '@/store/authSelectors';

export function AnalyticsRoute() {
  const canViewAnalytics = useAppSelector(selectCanViewAnalytics);

  if (!canViewAnalytics) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

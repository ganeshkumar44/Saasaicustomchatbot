import { AnalyticsDashboardView } from '@/app/components/analytics/AnalyticsDashboardView';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useAnalytics } from '@/hooks/useAnalytics';

export function Analytics() {
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refresh: refreshAnalytics,
  } = useDashboardAnalytics();
  const {
    conversationsChart,
    usersChart,
    resolutionChart,
    responseTimeChart,
    selectedRange,
    conversationsLoading,
    usersLoading,
    resolutionLoading,
    responseTimeLoading,
    conversationsError,
    usersError,
    resolutionError,
    responseTimeError,
    changeRange,
    refetch,
  } = useAnalytics();

  return (
    <AnalyticsDashboardView
      analytics={analytics}
      analyticsLoading={analyticsLoading}
      analyticsError={analyticsError}
      onRefreshAnalytics={() => void refreshAnalytics()}
      conversationsChart={conversationsChart}
      usersChart={usersChart}
      resolutionChart={resolutionChart}
      responseTimeChart={responseTimeChart}
      selectedRange={selectedRange}
      conversationsLoading={conversationsLoading}
      usersLoading={usersLoading}
      resolutionLoading={resolutionLoading}
      responseTimeLoading={responseTimeLoading}
      conversationsError={conversationsError}
      usersError={usersError}
      resolutionError={resolutionError}
      responseTimeError={responseTimeError}
      onChangeRange={changeRange}
      onRefetchCharts={() => refetch()}
    />
  );
}

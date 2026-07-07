import { Users, MessageSquare, Clock, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsTrendBadge } from '@/app/components/AnalyticsTrendBadge';
import { AnalyticsRangeSelector } from '@/app/components/AnalyticsRangeSelector';
import { UsersChartPanel } from '@/app/components/UsersChartPanel';
import { SkeletonChart, SkeletonStatistic } from '@/components/Skeleton';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  formatAverageResponseTime,
  formatResolutionRate,
} from '@/utils/dashboardAnalyticsFormat';
import {
  getAnalyticsRangeLabel,
  isChartDataEmpty,
  isResolutionChartEmpty,
  isResponseTimeChartEmpty,
  mapConversationsChartData,
  mapResolutionChartData,
  mapResponseTimeChartData,
  mapUsersChartData,
} from '@/utils/analyticsChart';

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

  const rangeLabel = getAnalyticsRangeLabel(selectedRange);
  const conversationsChartData = mapConversationsChartData(conversationsChart);
  const usersChartData = mapUsersChartData(usersChart);
  const resolutionChartData = mapResolutionChartData(resolutionChart);
  const responseTimeChartData = mapResponseTimeChartData(responseTimeChart);

  const tooltipStyle = {
    backgroundColor: '#1f2937',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track performance and insights</p>
        </div>
        <AnalyticsRangeSelector value={selectedRange} onChange={changeRange} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsLoading ? (
          <SkeletonStatistic />
        ) : analyticsError ? (
          <div className="col-span-full bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{analyticsError}</p>
            <button
              onClick={() => refreshAnalytics()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !analytics ? (
          <div className="col-span-full bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <AnalyticsTrendBadge
                  change={analytics.total_conversations_change}
                  trend={analytics.total_conversations_trend}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Conversations</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {analytics.total_conversations.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <AnalyticsTrendBadge
                  change={analytics.resolution_rate_change}
                  trend={analytics.resolution_rate_trend}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Resolution Rate</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {formatResolutionRate(analytics.resolution_rate)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <AnalyticsTrendBadge
                  change={analytics.average_response_time_change}
                  trend={analytics.average_response_time_trend}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Response Time</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {formatAverageResponseTime(analytics.average_response_time)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <AnalyticsTrendBadge
                  change={analytics.total_visitors_change}
                  trend={analytics.total_visitors_trend}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {analytics.total_visitors.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs last month</p>
            </div>
          </>
        )}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Conversation Trends</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{rangeLabel} performance</p>
          </div>
          {conversationsLoading ? (
            <SkeletonChart />
          ) : conversationsError ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{conversationsError}</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : isChartDataEmpty(conversationsChart) ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversationsChartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid key="trend-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis key="trend-x" dataKey="name" stroke="#9ca3af" />
                <YAxis key="trend-y" stroke="#9ca3af" />
                <Tooltip key="trend-tooltip" contentStyle={tooltipStyle} />
                <Area key="conversations-trend" type="monotone" dataKey="conversations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Resolution Status</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved vs Escalated</p>
          </div>
          {resolutionLoading ? (
            <SkeletonChart />
          ) : resolutionError ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{resolutionError}</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : isResolutionChartEmpty(resolutionChart) ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionChartData}>
                <CartesianGrid key="status-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis key="status-x" dataKey="date" stroke="#9ca3af" />
                <YAxis key="status-y" stroke="#9ca3af" />
                <Tooltip key="status-tooltip" contentStyle={tooltipStyle} />
                <Legend key="status-legend" />
                <Bar key="resolved-bar" dataKey="resolved" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar key="unresolved-bar" dataKey="unresolved" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-lg font-semibold dark:text-white">Response Time by Hour</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average response time (seconds)</p>
          </div>
          {responseTimeLoading ? (
            <SkeletonChart />
          ) : responseTimeError ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{responseTimeError}</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : isResponseTimeChartEmpty(responseTimeChart) ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeChartData}>
                <CartesianGrid key="response-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis key="response-x" dataKey="hour" stroke="#9ca3af" />
                <YAxis key="response-y" stroke="#9ca3af" />
                <Tooltip key="response-tooltip" contentStyle={tooltipStyle} />
                <Line key="time-line" type="monotone" dataKey="time" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <UsersChartPanel
          title="Total Users"
          subtitle={rangeLabel}
          data={usersChartData}
          loading={usersLoading}
          error={usersError}
          isEmpty={isChartDataEmpty(usersChart)}
          onRetry={() => refetch()}
        />
      </div>
    </div>
  );
}

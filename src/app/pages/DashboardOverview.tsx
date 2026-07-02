import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MessageSquare, Users, TrendingUp, Zap, ArrowUp, ArrowDown, MoreVertical, Bot, Plus, Settings, Trash2, BarChart3, Loader2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useChatbot } from '@/hooks/useChatbot';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useDashboard } from '@/hooks/useDashboard';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { formatMessageTime, formatRelativeTime } from '@/utils/formatRelativeTime';
import {
  formatAnalyticsChange,
  formatAverageResponseTime,
  formatResolutionRate,
  getAnalyticsTrendClassName,
} from '@/utils/dashboardAnalyticsFormat';
import {
  getAnalyticsRangeLabel,
  isChartDataEmpty,
  mapConversationsChartData,
  mapUsersChartData,
} from '@/utils/analyticsChart';
import { isChatbotActive } from '@/utils/chatbotList';
import type { AnalyticsTrend } from '@/types/dashboardAnalytics.types';

function AnalyticsTrendBadge({
  change,
  trend,
}: {
  change: string;
  trend: AnalyticsTrend;
}) {
  return (
    <span className={`flex items-center gap-1 text-sm ${getAnalyticsTrendClassName(trend)}`}>
      {trend === 'up' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      )}
      {formatAnalyticsChange(change)}
    </span>
  );
}

export function DashboardOverview() {
  const navigate = useNavigate();
  const {
    chatbotList,
    loading,
    error,
    refetch,
    createDraft,
    createDraftLoading,
  } = useChatbot();
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refresh: refreshAnalytics,
  } = useDashboardAnalytics();
  const {
    conversationsChart,
    usersChart,
    selectedRange,
    conversationsLoading,
    usersLoading,
    conversationsError,
    usersError,
    refetch: refetchCharts,
  } = useAnalytics();
  const {
    recentConversations,
    loading: recentConversationsLoading,
    error: recentConversationsError,
    refetchRecentConversations,
  } = useDashboard();
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const handleCreateChatbot = () => {
    void createDraft();
  };

  const conversationsChartData = mapConversationsChartData(conversationsChart);
  const usersChartData = mapUsersChartData(usersChart);
  const rangeLabel = getAnalyticsRangeLabel(selectedRange);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Chatbots Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Your Chatbots</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {loading
                ? 'Loading chatbots...'
                : chatbotList.length === 0
                  ? 'No chatbots created yet'
                  : `${chatbotList.length} ${chatbotList.length === 1 ? 'chatbot' : 'chatbots'} active`}
            </p>
          </div>
          <button
            onClick={handleCreateChatbot}
            disabled={createDraftLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {createDraftLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            Create Chatbot
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-4 w-full pt-4" />
                <Skeleton className="h-10 w-full mt-4 rounded-lg" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : chatbotList.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">No Chatbots Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              You haven't created any chatbots yet. Get started by creating your first AI-powered chatbot to assist your customers.
            </p>
            <button
              onClick={handleCreateChatbot}
              disabled={createDraftLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {createDraftLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              Create Your First Chatbot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {chatbotList.map((chatbot) => {
              const isActive = isChatbotActive(chatbot.status);

              return (
              <div
                key={chatbot.chatbot_id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/chatbot/${chatbot.chatbot_id}/settings`)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold dark:text-white mb-2">
                  {chatbot.chatbot_name ?? 'Untitled Chatbot'}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Model:</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {chatbot.ai_model ?? '—'}
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Owner:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {chatbot.owner_name ?? '—'}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {chatbot.total_conversations.toLocaleString()} conversations
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {isActive ? 'active' : chatbot.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(chatbot.updated_at)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/dashboard/analytics')}
                  className="w-full mt-4 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:border-blue-500"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </button>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsLoading ? (
          [1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-9 w-24" />
            </div>
          ))
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
        ) : (
          <>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                {analytics && (
                  <AnalyticsTrendBadge
                    change={analytics.total_conversations_change}
                    trend={analytics.total_conversations_trend}
                  />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Conversations</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {analytics?.total_conversations.toLocaleString() ?? '0'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                {analytics && (
                  <AnalyticsTrendBadge
                    change={analytics.total_visitors_change}
                    trend={analytics.total_visitors_trend}
                  />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {analytics?.total_visitors.toLocaleString() ?? '0'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                {analytics && (
                  <AnalyticsTrendBadge
                    change={analytics.resolution_rate_change}
                    trend={analytics.resolution_rate_trend}
                  />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Resolution Rate</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {formatResolutionRate(analytics?.resolution_rate ?? '0')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">vs last month</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                {analytics && (
                  <AnalyticsTrendBadge
                    change={analytics.average_response_time_change}
                    trend={analytics.average_response_time_trend}
                  />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Average Response Time</p>
              <p className="text-3xl font-bold dark:text-white mt-1">
                {formatAverageResponseTime(analytics?.average_response_time ?? '0')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">vs last month</p>
            </div>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">Conversations</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{rangeLabel}</p>
            </div>
          </div>
          {conversationsLoading ? (
            <Skeleton className="w-full h-[300px] rounded-lg" />
          ) : conversationsError ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{conversationsError}</p>
              <button
                onClick={() => refetchCharts()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : isChartDataEmpty(conversationsChart) ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversationsChartData}>
                <defs>
                  <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid key="conv-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis key="conv-x" dataKey="name" stroke="#9ca3af" />
                <YAxis key="conv-y" stroke="#9ca3af" />
                <Tooltip
                  key="conv-tooltip"
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area key="conversations-area" type="monotone" dataKey="conversations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConversations)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">Total Users</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{rangeLabel}</p>
            </div>
          </div>
          {usersLoading ? (
            <Skeleton className="w-full h-[300px] rounded-lg" />
          ) : usersError ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{usersError}</p>
              <button
                onClick={() => refetchCharts()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : isChartDataEmpty(usersChart) ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">No data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersChartData}>
                <CartesianGrid key="users-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis key="users-x" dataKey="name" stroke="#9ca3af" />
                <YAxis key="users-y" stroke="#9ca3af" />
                <Tooltip
                  key="users-tooltip"
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar key="users-bar" dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Recent Conversations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentConversationsLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={`recent-conversation-skeleton-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-full max-w-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Skeleton className="h-5 w-5 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : recentConversationsError ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{recentConversationsError}</p>
                    <button
                      onClick={() => refetchRecentConversations()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : recentConversations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-600 dark:text-gray-400">
                    No recent conversations found.
                  </td>
                </tr>
              ) : (
                recentConversations.map((conversation) => {
                  const visitorName = conversation.visitor_name?.trim() || 'Visitor';

                  return (
                    <tr
                      key={conversation.chat_session_id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                            {visitorName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium dark:text-white">{visitorName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 dark:text-gray-300">{conversation.user_question}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {formatMessageTime(conversation.message_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            conversation.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                        >
                          {conversation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

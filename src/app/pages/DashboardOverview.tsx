import { useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MessageSquare, Users, TrendingUp, Zap, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsTrendBadge } from '@/app/components/AnalyticsTrendBadge';
import { UsersChartPanel } from '@/app/components/UsersChartPanel';
import { ChatbotCard } from '@/app/components/chatbot/ChatbotCard';
import { ChatbotCardsSkeleton } from '@/app/components/chatbot/ChatbotCardsSkeleton';
import { ChatbotListEmptyState } from '@/app/components/chatbot/ChatbotListEmptyState';
import { ChatbotListErrorState } from '@/app/components/chatbot/ChatbotListErrorState';
import { DeleteChatbotConfirmDialog } from '@/app/components/chatbot/DeleteChatbotConfirmDialog';
import { PermanentlyDeleteChatbotConfirmDialog } from '@/app/components/chatbot/PermanentlyDeleteChatbotConfirmDialog';
import {
  SkeletonChart,
  SkeletonConversation,
  SkeletonStatistic,
} from '@/components/Skeleton';
import { ChatbotPlanLimitAlert } from '@/app/components/chatbot/ChatbotPlanLimitAlert';
import { CreateChatbotButton } from '@/app/components/chatbot/CreateChatbotButton';
import { useChatbot } from '@/hooks/useChatbot';
import { useUserPlan } from '@/hooks/useUserPlan';
import { useDeleteChatbot } from '@/hooks/useDeleteChatbot';
import { usePermanentlyDeleteChatbot } from '@/hooks/usePermanentlyDeleteChatbot';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useDashboard } from '@/hooks/useDashboard';
import { formatMessageTime } from '@/utils/formatRelativeTime';
import {
  formatAverageResponseTime,
  formatResolutionRate,
} from '@/utils/dashboardAnalyticsFormat';
import {
  getAnalyticsRangeLabel,
  isChartDataEmpty,
  mapConversationsChartData,
  mapUsersChartData,
} from '@/utils/analyticsChart';
import {
  DASHBOARD_RECENT_CHATBOT_LIMIT,
  getRecentChatbots,
} from '@/utils/chatbotList';
export function DashboardOverview() {
  const {
    chatbotList,
    loading,
    error,
    refetch,
    createDraft,
    createDraftLoading,
  } = useChatbot();
  const {
    hasDraft,
    hasReachedChatbotLimit,
    chatbotLimitUpgradeMessage,
  } = useUserPlan();
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

  const {
    deleteLoading,
    deleteError,
    isDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    pendingChatbotId,
  } = useDeleteChatbot();

  const {
    permanentDeleteLoading,
    permanentDeleteError,
    isPermanentDeleteDialogOpen,
    openPermanentDeleteDialog,
    closePermanentDeleteDialog,
    confirmPermanentDelete,
    pendingPermanentDeleteChatbotId,
  } = usePermanentlyDeleteChatbot();

  const recentChatbots = useMemo(
    () => getRecentChatbots(chatbotList, DASHBOARD_RECENT_CHATBOT_LIMIT),
    [chatbotList],
  );

  const showViewAllChatbots = chatbotList.length > DASHBOARD_RECENT_CHATBOT_LIMIT;
  const isDeleteActionLoading = deleteLoading || permanentDeleteLoading;

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
      <DeleteChatbotConfirmDialog
        open={isDialogOpen}
        loading={deleteLoading}
        error={deleteError}
        onCancel={closeDeleteDialog}
        onConfirm={() => void confirmDelete()}
      />
      <PermanentlyDeleteChatbotConfirmDialog
        open={isPermanentDeleteDialogOpen}
        loading={permanentDeleteLoading}
        error={permanentDeleteError}
        onCancel={closePermanentDeleteDialog}
        onConfirm={() => void confirmPermanentDelete()}
      />

      <div>
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Chatbots Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Recent Chatbots</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {loading
                ? 'Loading chatbots...'
                : chatbotList.length === 0
                  ? 'No chatbots created yet'
                  : `${chatbotList.length} ${chatbotList.length === 1 ? 'chatbot' : 'chatbots'} found`}
            </p>
          </div>
          <CreateChatbotButton
            onClick={handleCreateChatbot}
            loading={createDraftLoading}
            hasDraft={hasDraft}
          />
        </div>

        {hasReachedChatbotLimit && !hasDraft && chatbotLimitUpgradeMessage && (
          <ChatbotPlanLimitAlert
            message={chatbotLimitUpgradeMessage}
            className="mx-6 mt-4"
          />
        )}

        {hasReachedChatbotLimit && hasDraft && (
          <ChatbotPlanLimitAlert
            message="You have reached your chatbot limit, but you can continue your unfinished draft chatbot."
            className="mx-6 mt-4"
          />
        )}

        {loading ? (
          <ChatbotCardsSkeleton count={3} />
        ) : error ? (
          <ChatbotListErrorState error={error} onRetry={() => void refetch()} />
        ) : chatbotList.length === 0 ? (
          <ChatbotListEmptyState
            onCreateChatbot={handleCreateChatbot}
            createLoading={createDraftLoading}
            createDisabled={false}
            actionLabel={hasDraft ? 'Continue Draft' : 'Create Your First Chatbot'}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {recentChatbots.map((chatbot) => (
                <ChatbotCard
                  key={chatbot.chatbot_id}
                  chatbot={chatbot}
                  onDelete={openDeleteDialog}
                  onPermanentDelete={openPermanentDeleteDialog}
                  deleteDisabled={
                    isDeleteActionLoading &&
                    (pendingChatbotId === chatbot.chatbot_id ||
                      pendingPermanentDeleteChatbotId === chatbot.chatbot_id)
                  }
                />
              ))}
            </div>

            {showViewAllChatbots && (
              <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-center bg-gray-50/80 dark:bg-gray-950/50">
                <Link
                  to="/dashboard/chatbots"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                >
                  View All Chatbots
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats Cards */}
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
            <SkeletonChart />
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

        <UsersChartPanel
          title="Total Users"
          subtitle={rangeLabel}
          data={usersChartData}
          loading={usersLoading}
          error={usersError}
          isEmpty={isChartDataEmpty(usersChart)}
          onRetry={() => refetchCharts()}
        />
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
                <SkeletonConversation />
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

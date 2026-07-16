import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { AnalyticsDashboardView } from '@/app/components/analytics/AnalyticsDashboardView';
import { useChatbotAnalytics } from '@/hooks/useChatbotAnalytics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectChatbotDetails,
  selectChatbotDetailsError,
  selectChatbotDetailsLoading,
} from '@/store/chatbotSettingsSelectors';
import { fetchChatbotDetails } from '@/store/chatbotSettingsThunk';
import { selectPricingCurrentPlan } from '@/store/pricingSelectors';
import { fetchCurrentPricingPlan } from '@/store/pricingThunk';
import { getChatbotStatusDisplay } from '@/utils/chatbotList';

function formatCreatedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ChatbotAnalytics() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const chatbotId = useMemo(() => {
    const parsed = Number(id);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [id]);

  const details = useAppSelector(selectChatbotDetails);
  const detailsLoading = useAppSelector(selectChatbotDetailsLoading);
  const detailsError = useAppSelector(selectChatbotDetailsError);
  const currentPlan = useAppSelector(selectPricingCurrentPlan);

  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
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
    refreshAnalytics,
    refetchCharts,
  } = useChatbotAnalytics(chatbotId);

  useEffect(() => {
    if (chatbotId == null) {
      return;
    }
    void dispatch(fetchChatbotDetails(chatbotId));
    void dispatch(fetchCurrentPricingPlan());
  }, [chatbotId, dispatch]);

  const matchingDetails =
    details != null && chatbotId != null && details.id === chatbotId
      ? details
      : null;
  const statusDisplay = matchingDetails
    ? getChatbotStatusDisplay(matchingDetails.status)
    : null;

  const displayAnalytics =
    analytics != null && analytics.total_chatbots > 0 ? analytics : null;

  const headerExtra = (
    <div className="mb-4 space-y-3">
      <button
        type="button"
        onClick={() => navigate('/dashboard/chatbots')}
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chatbots
      </button>

      {detailsLoading && matchingDetails == null ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading chatbot details…</p>
      ) : detailsError && matchingDetails == null ? (
        <p className="text-sm text-red-600 dark:text-red-400">{detailsError}</p>
      ) : matchingDetails ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${statusDisplay?.dotClassName ?? 'bg-gray-400'}`}
            />
            <span className="capitalize">{statusDisplay?.label ?? matchingDetails.status}</span>
          </span>
          <span>Created {formatCreatedDate(matchingDetails.created_at)}</span>
          {currentPlan?.display_name ? (
            <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
              {currentPlan.display_name}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  if (chatbotId == null) {
    return (
      <div className="p-6">
        <p className="text-red-600 dark:text-red-400">Invalid chatbot ID.</p>
        <button
          type="button"
          onClick={() => navigate('/dashboard/chatbots')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Chatbots
        </button>
      </div>
    );
  }

  return (
    <AnalyticsDashboardView
      title={matchingDetails?.chatbot_name?.trim() || 'Chatbot Analytics'}
      subtitle="Track performance and insights for this chatbot"
      headerExtra={headerExtra}
      emptyMessage="No analytics available for this chatbot."
      analytics={displayAnalytics}
      analyticsLoading={analyticsLoading}
      analyticsError={analyticsError}
      onRefreshAnalytics={refreshAnalytics}
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
      onRefetchCharts={() => refetchCharts()}
    />
  );
}

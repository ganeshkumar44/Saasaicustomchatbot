import { useNavigate } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PlaygroundChatPanel } from '@/app/components/playground/PlaygroundChatPanel';
import { useChatbotSettings } from '@/hooks/useChatbotSettings';

export function ChatbotPlayground() {
  const navigate = useNavigate();
  const {
    chatbotId,
    chatbotDetails,
    loading,
    error,
    invalidChatbotId,
    refetch,
  } = useChatbotSettings();

  if (invalidChatbotId) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">Invalid chatbot ID.</p>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading && !chatbotDetails) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error && !chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!chatbotId || !chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">No chatbot details found.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(`/dashboard/chatbot/${chatbotId}/settings`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold dark:text-white">Playground</h1>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Testing only
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Test {chatbotDetails.chatbot_name ?? 'your chatbot'} before deploying — separate from production chat history
        </p>
      </div>

      <PlaygroundChatPanel
        chatbotId={chatbotId}
        chatbotName={chatbotDetails.chatbot_name ?? 'Chatbot'}
      />
    </div>
  );
}

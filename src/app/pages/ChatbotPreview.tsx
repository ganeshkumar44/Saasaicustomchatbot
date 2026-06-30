import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Bot,
  Copy,
  Database,
  Loader2,
} from 'lucide-react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useChatbotSettings } from '@/hooks/useChatbotSettings';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { formatDisplayDate } from '@/utils/formatRelativeTime';
import {
  getKnowledgebaseUrlDocuments,
  getUploadedKnowledgebaseDocuments,
} from '@/utils/knowledgebaseDocuments';
import { parseAllowedDomainsInput } from '@/utils/chatbotSettingsValidation';

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}

function ReadOnlyTextArea({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        readOnly
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
      />
    </div>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 space-y-4"
        >
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-2/3" />
        </div>
      ))}
    </div>
  );
}

function formatBoolean(value: boolean): string {
  return value ? 'Yes' : 'No';
}

function formatOptional(value: string | null): string {
  return value?.trim() ? value : '—';
}

export function ChatbotPreview() {
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
    return <PreviewSkeleton />;
  }

  if (error && !chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center space-y-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
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

  if (!chatbotDetails) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">No chatbot data available.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  const fileDocuments = getUploadedKnowledgebaseDocuments(
    chatbotDetails.knowledgebase_documents,
  );
  const urlDocuments = getKnowledgebaseUrlDocuments(
    chatbotDetails.knowledgebase_documents,
  );
  const allowedDomains = parseAllowedDomainsInput(chatbotDetails.allowed_domains);

  return (
    <div className="p-6">
      <div className="mb-8">
        <button
          onClick={() => navigate(`/dashboard/chatbot/${chatbotId}/settings`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>
        <h1 className="text-3xl font-bold dark:text-white">Chatbot Preview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View all chatbot configuration in one place
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          Refreshing chatbot details...
        </div>
      )}

      <div className="space-y-6">
        <PreviewSection title="General Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReadOnlyField
              label="Chatbot Name"
              value={formatOptional(chatbotDetails.chatbot_name)}
            />
            <ReadOnlyField
              label="Status"
              value={formatOptional(chatbotDetails.status)}
            />
          </div>
          <ReadOnlyTextArea
            label="Description"
            value={formatOptional(chatbotDetails.description)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReadOnlyField
              label="Personality"
              value={formatOptional(chatbotDetails.personality)}
            />
            <ReadOnlyField
              label="AI Model"
              value={formatOptional(chatbotDetails.ai_model)}
            />
            <ReadOnlyField
              label="Language"
              value={formatOptional(chatbotDetails.language)}
            />
          </div>
        </PreviewSection>

        <PreviewSection title="Appearance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={chatbotDetails.primary_color}
                  readOnly
                  className="w-20 h-12 rounded-lg border border-gray-300 dark:border-gray-700 cursor-default"
                />
                <input
                  type="text"
                  value={chatbotDetails.primary_color}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={chatbotDetails.text_color}
                  readOnly
                  className="w-20 h-12 rounded-lg border border-gray-300 dark:border-gray-700 cursor-default"
                />
                <input
                  type="text"
                  value={chatbotDetails.text_color}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReadOnlyField
              label="Widget Position"
              value={chatbotDetails.widget_position.replace('-', ' ')}
            />
            <ReadOnlyField
              label="Show Avatar"
              value={formatBoolean(chatbotDetails.show_avatar)}
            />
            <ReadOnlyField
              label="Typing Indicator"
              value={formatBoolean(chatbotDetails.typing_indicator)}
            />
          </div>
        </PreviewSection>

        <PreviewSection title="Messages">
          <ReadOnlyField label="Chat Title" value={chatbotDetails.chat_title} />
          <ReadOnlyTextArea
            label="Welcome Message"
            value={chatbotDetails.welcome_message}
          />
          <ReadOnlyField
            label="Input Placeholder"
            value={chatbotDetails.input_placeholder}
          />
        </PreviewSection>

        <PreviewSection title="Knowledge Base">
          {fileDocuments.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploaded Files ({fileDocuments.length})
              </p>
              {fileDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium dark:text-white">
                    {document.original_file_name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No documents uploaded yet.
            </p>
          )}

          {urlDocuments.length > 0 && (
            <div className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                URLs
              </p>
              {urlDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium dark:text-white break-all">
                    {document.url}
                  </span>
                </div>
              ))}
            </div>
          )}
        </PreviewSection>

        <PreviewSection title="Security">
          <ReadOnlyField
            label="AI Model"
            value={formatOptional(chatbotDetails.ai_model)}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Allowed Domains
            </p>
            {allowedDomains.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allowedDomains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">—</p>
            )}
          </div>
        </PreviewSection>

        <PreviewSection title="Embed Information">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Public Key
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={chatbotDetails.public_key}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => void copyToClipboard(chatbotDetails.public_key, 'Public key copied!')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Embed Code
            </label>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm pr-28">
                <code>{chatbotDetails.embed_code}</code>
              </pre>
              <button
                type="button"
                onClick={() => void copyToClipboard(chatbotDetails.embed_code, 'Embed code copied!')}
                className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </PreviewSection>

        <PreviewSection title="Metadata">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReadOnlyField
              label="Created At"
              value={formatDisplayDate(chatbotDetails.created_at)}
            />
            <ReadOnlyField
              label="Updated At"
              value={formatDisplayDate(chatbotDetails.updated_at)}
            />
            <ReadOnlyField
              label="Published At"
              value={formatDisplayDate(chatbotDetails.published_at)}
            />
          </div>
        </PreviewSection>
      </div>
    </div>
  );
}

import { Sparkles } from 'lucide-react';

interface PromptStatusCardProps {
  isCustomEnabled: boolean;
}

export function PromptStatusCard({ isCustomEnabled }: PromptStatusCardProps) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 flex items-start gap-3 ${
        isCustomEnabled
          ? 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30'
          : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60'
      }`}
    >
      <Sparkles
        className={`w-5 h-5 mt-0.5 shrink-0 ${
          isCustomEnabled
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      />
      <div>
        <p className="text-sm font-semibold dark:text-white">
          {isCustomEnabled ? 'Custom Prompt Enabled' : 'Using Global Default Prompt'}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {isCustomEnabled
            ? 'This chatbot merges your custom instructions with the global default prompt.'
            : 'All fields are empty, so only the global default prompt is used.'}
        </p>
      </div>
    </div>
  );
}

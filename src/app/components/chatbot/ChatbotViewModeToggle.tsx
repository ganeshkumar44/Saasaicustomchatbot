import { LayoutGrid, List } from 'lucide-react';
import type { ChatbotViewMode } from '@/types/chatbot.types';

interface ChatbotViewModeToggleProps {
  viewMode: ChatbotViewMode;
  onChange: (viewMode: ChatbotViewMode) => void;
}

export function ChatbotViewModeToggle({
  viewMode,
  onChange,
}: ChatbotViewModeToggleProps) {
  return (
    <div className="flex h-12 items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-1">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
          viewMode === 'grid'
            ? 'bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
          viewMode === 'list'
            ? 'bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}

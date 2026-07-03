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
    <div className="flex items-center gap-1 p-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid'
            ? 'bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list'
            ? 'bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}

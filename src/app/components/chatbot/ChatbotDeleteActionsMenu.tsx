import { ChevronDown, Loader2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface ChatbotDeleteActionsMenuProps {
  disabled?: boolean;
  loading?: boolean;
  showDelete?: boolean;
  showPermanentDelete?: boolean;
  onDelete: () => void;
  onPermanentDelete?: () => void;
  /** Card icon trigger vs settings button trigger */
  variant?: 'icon' | 'button';
}

export function ChatbotDeleteActionsMenu({
  disabled = false,
  loading = false,
  showDelete = true,
  showPermanentDelete = false,
  onDelete,
  onPermanentDelete,
  variant = 'icon',
}: ChatbotDeleteActionsMenuProps) {
  const isDisabled = disabled || loading;
  const hasAnyAction = showDelete || showPermanentDelete;

  if (!hasAnyAction) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'button' ? (
          <button
            type="button"
            disabled={isDisabled}
            className="px-6 py-3 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Delete chatbot actions"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
            Delete Chatbot
            <ChevronDown className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isDisabled}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Delete chatbot actions"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[12rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg"
      >
        {showDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isDisabled}
            className="rounded-md px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400"
          >
            Delete
          </DropdownMenuItem>
        )}
        {showPermanentDelete && (
          <DropdownMenuItem
            onClick={onPermanentDelete}
            disabled={isDisabled}
            variant="destructive"
            className="rounded-md px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-700 dark:focus:text-red-300"
          >
            Permanently Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

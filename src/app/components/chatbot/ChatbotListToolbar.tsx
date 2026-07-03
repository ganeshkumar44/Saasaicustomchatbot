import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ChatbotViewModeToggle } from '@/app/components/chatbot/ChatbotViewModeToggle';
import type { ChatbotStatusFilter, ChatbotViewMode } from '@/types/chatbot.types';
import { getStatusFilterLabel } from '@/utils/chatbotList';

interface ChatbotListToolbarProps {
  statusFilter: ChatbotStatusFilter;
  availableStatusFilters: ChatbotStatusFilter[];
  onStatusFilterChange: (filter: ChatbotStatusFilter) => void;
  viewMode: ChatbotViewMode;
  onViewModeChange: (viewMode: ChatbotViewMode) => void;
}

export function ChatbotListToolbar({
  statusFilter,
  availableStatusFilters,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
}: ChatbotListToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as ChatbotStatusFilter)}
      >
        <SelectTrigger
          className="h-12 min-h-12 min-w-[8.5rem] w-auto gap-2 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-md text-left font-medium text-gray-900 dark:text-white shadow-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/80 [&>svg:last-child]:text-gray-400 dark:[&>svg:last-child]:text-gray-500 data-[size=default]:h-12"
          aria-label="Filter chatbots by status"
        >
          <Filter className="w-5 h-5 shrink-0 text-gray-400 dark:text-gray-500" />
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="min-w-[8.5rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg"
        >
          {availableStatusFilters.map((filter) => (
            <SelectItem
              key={filter}
              value={filter}
              className="rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-900 dark:text-white cursor-pointer data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 dark:data-[highlighted]:bg-blue-950/60 dark:data-[highlighted]:text-blue-300 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 dark:data-[state=checked]:bg-blue-950/60 dark:data-[state=checked]:text-blue-300 [&>span:first-child]:hidden"
            >
              {getStatusFilterLabel(filter)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ChatbotViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
    </div>
  );
}

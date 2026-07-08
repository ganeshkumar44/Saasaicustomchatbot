import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import type {
  LoginHistoryRoleFilter,
  LoginHistoryStatusFilter,
} from '@/types/loginHistory.types';
import {
  getLoginHistoryRoleFilterLabel,
  getLoginHistoryStatusFilterLabel,
  LOGIN_HISTORY_ROLE_FILTERS,
  LOGIN_HISTORY_STATUS_FILTERS,
} from '@/utils/loginHistory';

interface ManageLoginHistoryToolbarProps {
  roleFilter: LoginHistoryRoleFilter;
  statusFilter: LoginHistoryStatusFilter;
  dateFrom: string;
  dateTo: string;
  onRoleFilterChange: (filter: LoginHistoryRoleFilter) => void;
  onStatusFilterChange: (filter: LoginHistoryStatusFilter) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export function ManageLoginHistoryToolbar({
  roleFilter,
  statusFilter,
  dateFrom,
  dateTo,
  onRoleFilterChange,
  onStatusFilterChange,
  onDateFromChange,
  onDateToChange,
}: ManageLoginHistoryToolbarProps) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-3">
      <Select
        value={roleFilter}
        onValueChange={(value) => onRoleFilterChange(value as LoginHistoryRoleFilter)}
      >
        <SelectTrigger
          className="h-12 min-h-12 min-w-[8.5rem] w-full xl:w-auto gap-2 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-md text-left font-medium text-gray-900 dark:text-white shadow-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/80 [&>svg:last-child]:text-gray-400 dark:[&>svg:last-child]:text-gray-500 data-[size=default]:h-12"
          aria-label="Filter login history by role"
        >
          <Filter className="w-5 h-5 shrink-0 text-gray-400 dark:text-gray-500" />
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent className="min-w-[8.5rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg">
          {LOGIN_HISTORY_ROLE_FILTERS.map((filter) => (
            <SelectItem
              key={filter}
              value={filter}
              className="rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-900 dark:text-white cursor-pointer data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 dark:data-[highlighted]:bg-blue-950/60 dark:data-[highlighted]:text-blue-300 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 dark:data-[state=checked]:bg-blue-950/60 dark:data-[state=checked]:text-blue-300 [&>span:first-child]:hidden"
            >
              {getLoginHistoryRoleFilterLabel(filter)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as LoginHistoryStatusFilter)}
      >
        <SelectTrigger
          className="h-12 min-h-12 min-w-[8.5rem] w-full xl:w-auto gap-2 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-md text-left font-medium text-gray-900 dark:text-white shadow-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/80 [&>svg:last-child]:text-gray-400 dark:[&>svg:last-child]:text-gray-500 data-[size=default]:h-12"
          aria-label="Filter login history by status"
        >
          <Filter className="w-5 h-5 shrink-0 text-gray-400 dark:text-gray-500" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="min-w-[8.5rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-lg">
          {LOGIN_HISTORY_STATUS_FILTERS.map((filter) => (
            <SelectItem
              key={filter}
              value={filter}
              className="rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-900 dark:text-white cursor-pointer data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 dark:data-[highlighted]:bg-blue-950/60 dark:data-[highlighted]:text-blue-300 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 dark:data-[state=checked]:bg-blue-950/60 dark:data-[state=checked]:text-blue-300 [&>span:first-child]:hidden"
            >
              {getLoginHistoryStatusFilterLabel(filter)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input
        type="date"
        value={dateFrom}
        onChange={(event) => onDateFromChange(event.target.value)}
        aria-label="Filter from date"
        className="h-12 w-full xl:w-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
      />

      <input
        type="date"
        value={dateTo}
        onChange={(event) => onDateToChange(event.target.value)}
        aria-label="Filter to date"
        className="h-12 w-full xl:w-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
      />
    </div>
  );
}

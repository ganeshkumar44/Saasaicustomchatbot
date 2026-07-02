import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import type { AnalyticsRange } from '@/types/dashboardAnalytics.types';
import { ANALYTICS_RANGE_OPTIONS, getAnalyticsRangeLabel } from '@/utils/analyticsChart';

interface AnalyticsRangeSelectorProps {
  value: AnalyticsRange;
  onChange: (range: AnalyticsRange) => void;
}

export function AnalyticsRangeSelector({ value, onChange }: AnalyticsRangeSelectorProps) {
  return (
    <Select value={value} onValueChange={(nextValue) => onChange(nextValue as AnalyticsRange)}>
      <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <SelectValue placeholder="Select range" />
      </SelectTrigger>
      <SelectContent>
        {ANALYTICS_RANGE_OPTIONS.map((range) => (
          <SelectItem key={range} value={range}>
            {getAnalyticsRangeLabel(range)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import { ArrowDown, ArrowUp } from 'lucide-react';
import type { AnalyticsTrend } from '@/types/dashboardAnalytics.types';
import {
  formatAnalyticsChange,
  getAnalyticsTrendClassName,
} from '@/utils/dashboardAnalyticsFormat';

interface AnalyticsTrendBadgeProps {
  change: string;
  trend: AnalyticsTrend;
}

export function AnalyticsTrendBadge({ change, trend }: AnalyticsTrendBadgeProps) {
  return (
    <span className={`flex items-center gap-1 text-sm ${getAnalyticsTrendClassName(trend)}`}>
      {trend === 'up' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      )}
      {formatAnalyticsChange(change)}
    </span>
  );
}

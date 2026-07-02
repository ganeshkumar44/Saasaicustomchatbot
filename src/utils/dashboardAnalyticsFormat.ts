import type { AnalyticsTrend } from '@/types/dashboardAnalytics.types';

export function formatResolutionRate(value: string): string {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '0%';
  }

  if (Number.isInteger(parsed)) {
    return `${parsed}%`;
  }

  return `${parsed.toFixed(2).replace(/\.?0+$/, '')}%`;
}

export function formatAverageResponseTime(value: string): string {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '0 sec';
  }

  return `${parsed.toFixed(2)} sec`;
}

export function formatAnalyticsChange(value: string): string {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return '0%';
  }

  if (Number.isInteger(parsed)) {
    return `${parsed}%`;
  }

  return `${parsed.toFixed(2).replace(/\.?0+$/, '')}%`;
}

export function getAnalyticsTrendClassName(trend: AnalyticsTrend): string {
  return trend === 'up'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';
}

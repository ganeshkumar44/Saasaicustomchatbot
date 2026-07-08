import { memo } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Skeleton } from '@/app/components/ui/skeleton';

export const SkeletonLoginHistoryList = memo(function SkeletonLoginHistoryList({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`login-history-skeleton-${index}`}
          className={`flex items-center justify-between py-3 ${index > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Skeleton className="w-9 h-9 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-full max-w-xs" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
});

export const SkeletonLoginHistoryTable = memo(function SkeletonLoginHistoryTable({
  rowCount = 8,
}: {
  rowCount?: number;
}) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={`login-history-table-skeleton-${index}`}>
          {Array.from({ length: 11 }).map((__, cellIndex) => (
            <td key={`login-history-cell-${index}-${cellIndex}`} className="px-6 py-4 whitespace-nowrap">
              <Skeleton className="h-4 w-24" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
});

export function LoginHistoryDeviceIcon({ deviceType }: { deviceType: string | null }) {
  const normalized = deviceType?.toLowerCase() ?? '';

  if (normalized === 'mobile' || normalized === 'tablet') {
    return <Smartphone className="w-4 h-4 text-gray-500" />;
  }

  return <Monitor className="w-4 h-4 text-gray-500" />;
}

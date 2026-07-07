import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

interface SkeletonStatisticProps {
  count?: number;
}

export const SkeletonStatistic = memo(function SkeletonStatistic({
  count = 4,
}: SkeletonStatisticProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`statistic-skeleton-${index}`}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <Skeleton className="w-12 h-12 rounded-lg mb-4" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </>
  );
});

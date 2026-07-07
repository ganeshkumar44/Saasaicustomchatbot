import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

export const SkeletonPagination = memo(function SkeletonPagination() {
  return (
    <div className="flex justify-center pt-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
});

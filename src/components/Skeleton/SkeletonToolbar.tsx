import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

export const SkeletonToolbar = memo(function SkeletonToolbar() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <Skeleton className="h-12 w-full flex-1 rounded-lg" />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Skeleton className="h-12 w-full sm:w-36 rounded-lg" />
        <Skeleton className="h-12 w-full sm:w-36 rounded-lg" />
      </div>
    </div>
  );
});

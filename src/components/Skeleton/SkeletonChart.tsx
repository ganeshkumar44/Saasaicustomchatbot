import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

interface SkeletonChartProps {
  height?: number;
  className?: string;
}

export const SkeletonChart = memo(function SkeletonChart({
  height = 300,
  className = '',
}: SkeletonChartProps) {
  return (
    <Skeleton
      className={`w-full rounded-lg ${className}`}
      style={{ height: `${height}px` }}
    />
  );
});

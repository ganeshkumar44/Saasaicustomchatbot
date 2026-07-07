import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

interface SkeletonConversationProps {
  rowCount?: number;
}

export const SkeletonConversation = memo(function SkeletonConversation({
  rowCount = 4,
}: SkeletonConversationProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={`conversation-skeleton-${index}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-full max-w-md" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <Skeleton className="h-5 w-5 ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
});

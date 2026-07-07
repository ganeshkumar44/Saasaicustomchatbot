import { memo } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';

interface SkeletonSessionListProps {
  count?: number;
}

export const SkeletonSessionList = memo(function SkeletonSessionList({
  count = 10,
}: SkeletonSessionListProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`session-skeleton-${index}`}
          className="w-full p-4 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="w-5 h-5" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
});

export const SkeletonConversationHeader = memo(function SkeletonConversationHeader() {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 ml-auto" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
});

interface SkeletonConversationMessagesProps {
  count?: number;
}

export const SkeletonConversationMessages = memo(function SkeletonConversationMessages({
  count = 4,
}: SkeletonConversationMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`message-skeleton-${index}`}
          className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
        >
          <Skeleton className={`h-16 rounded-2xl ${index % 2 === 0 ? 'w-1/2' : 'w-2/3'}`} />
        </div>
      ))}
    </div>
  );
});

export const SkeletonConversationPanel = memo(function SkeletonConversationPanel() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[calc(100vh-180px)] flex flex-col">
      <SkeletonConversationHeader />
      <SkeletonConversationMessages />
    </div>
  );
});

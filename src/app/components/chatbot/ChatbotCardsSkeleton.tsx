import { Skeleton } from '@/app/components/ui/skeleton';

interface ChatbotCardsSkeletonProps {
  count?: number;
}

export function ChatbotCardsSkeleton({ count = 3 }: ChatbotCardsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`chatbot-card-skeleton-${index}`}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <Skeleton className="w-12 h-12 rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-4 w-full pt-4" />
          <Skeleton className="h-10 w-full mt-4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

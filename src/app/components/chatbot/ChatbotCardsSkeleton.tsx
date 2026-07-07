import { SkeletonCard } from '@/components/Skeleton/SkeletonCard';

interface ChatbotCardsSkeletonProps {
  count?: number;
}

export function ChatbotCardsSkeleton({ count = 3 }: ChatbotCardsSkeletonProps) {
  return <SkeletonCard count={count} />;
}

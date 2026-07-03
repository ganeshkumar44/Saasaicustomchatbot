import type { ReviewData } from '@/types/chatbot.types';

export function getResumeStepFromReview(review: ReviewData): number {
  if (!review.chatbot_name?.trim()) {
    return 1;
  }

  if (!review.personality || !review.ai_model || !review.language) {
    return 2;
  }

  if (review.knowledgebase.total_knowledge_sources < 1) {
    return 3;
  }

  return 4;
}

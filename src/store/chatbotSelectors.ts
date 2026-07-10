import type { RootState } from '@/store/index';
import { filterListableChatbots } from '@/utils/chatbotList';

export const selectChatbotId = (state: RootState): number | null =>
  state.chatbot.chatbotId;

export const selectChatbotStatus = (state: RootState): string | null =>
  state.chatbot.chatbotStatus;

export const selectChatbotBasicInfo = (state: RootState) =>
  state.chatbot.chatbotBasicInfo;

export const selectChatbotBehaviour = (state: RootState) =>
  state.chatbot.chatbotBehaviour;

export const selectChatbotKnowledgeBase = (state: RootState) =>
  state.chatbot.chatbotKnowledgeBase;

export const selectChatbotReview = (state: RootState) =>
  state.chatbot.chatbotReview;

export const selectChatbotPublishResponse = (state: RootState) =>
  state.chatbot.publishResponse;

export const selectChatbotCurrentStep = (state: RootState): number =>
  state.chatbot.currentStep;

export const selectCreateDraftLoading = (state: RootState): boolean =>
  state.chatbot.createDraftLoading;

export const selectCreateDraftSuccess = (state: RootState): boolean =>
  state.chatbot.createDraftSuccess;

export const selectCreateDraftError = (state: RootState): string | null =>
  state.chatbot.createDraftError;

export const selectBasicInfoLoading = (state: RootState): boolean =>
  state.chatbot.basicInfoLoading;

export const selectBasicInfoSuccess = (state: RootState): boolean =>
  state.chatbot.basicInfoSuccess;

export const selectBasicInfoError = (state: RootState): string | null =>
  state.chatbot.basicInfoError;

export const selectBehaviourLoading = (state: RootState): boolean =>
  state.chatbot.behaviourLoading;

export const selectBehaviourSuccess = (state: RootState): boolean =>
  state.chatbot.behaviourSuccess;

export const selectBehaviourError = (state: RootState): string | null =>
  state.chatbot.behaviourError;

export const selectKnowledgeBaseLoading = (state: RootState): boolean =>
  state.chatbot.knowledgeBaseLoading;

export const selectKnowledgeBaseSuccess = (state: RootState): boolean =>
  state.chatbot.knowledgeBaseSuccess;

export const selectKnowledgeBaseError = (state: RootState): string | null =>
  state.chatbot.knowledgeBaseError;

export const selectReviewLoading = (state: RootState): boolean =>
  state.chatbot.reviewLoading;

export const selectReviewSuccess = (state: RootState): boolean =>
  state.chatbot.reviewSuccess;

export const selectReviewError = (state: RootState): string | null =>
  state.chatbot.reviewError;

export const selectPublishLoading = (state: RootState): boolean =>
  state.chatbot.publishLoading;

export const selectPublishSuccess = (state: RootState): boolean =>
  state.chatbot.publishSuccess;

export const selectPublishError = (state: RootState): string | null =>
  state.chatbot.publishError;

export const selectChatbotList = (state: RootState) => state.chatbot.chatbotList;

export const selectListableChatbotList = (state: RootState) =>
  filterListableChatbots(state.chatbot.chatbotList);

export const selectChatbotListLoading = (state: RootState): boolean =>
  state.chatbot.chatbotListLoading;

export const selectChatbotListSuccess = (state: RootState): boolean =>
  state.chatbot.chatbotListSuccess;

export const selectChatbotListError = (state: RootState): string | null =>
  state.chatbot.chatbotListError;

export const selectDeleteChatbotLoading = (state: RootState): boolean =>
  state.chatbot.deleteLoading;

export const selectDeleteChatbotSuccess = (state: RootState): boolean =>
  state.chatbot.deleteSuccess;

export const selectDeleteChatbotError = (state: RootState): string | null =>
  state.chatbot.deleteError;

export const selectActivateChatbotLoading = (state: RootState): boolean =>
  state.chatbot.activateLoading;

export const selectActivateChatbotSuccess = (state: RootState): boolean =>
  state.chatbot.activateSuccess;

export const selectActivateChatbotError = (state: RootState): string | null =>
  state.chatbot.activateError;

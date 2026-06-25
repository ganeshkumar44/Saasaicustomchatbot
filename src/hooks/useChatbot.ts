import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearChatbotErrors,
  resetChatbotWizard,
  setChatbotStep,
} from '@/store/chatbotSlice';
import {
  selectBasicInfoError,
  selectBasicInfoLoading,
  selectBasicInfoSuccess,
  selectBehaviourError,
  selectBehaviourLoading,
  selectBehaviourSuccess,
  selectChatbotBasicInfo,
  selectChatbotBehaviour,
  selectChatbotCurrentStep,
  selectChatbotId,
  selectChatbotKnowledgeBase,
  selectChatbotPublishResponse,
  selectChatbotReview,
  selectChatbotStatus,
  selectCreateDraftError,
  selectCreateDraftLoading,
  selectCreateDraftSuccess,
  selectKnowledgeBaseError,
  selectKnowledgeBaseLoading,
  selectKnowledgeBaseSuccess,
  selectKnowledgeBaseUploadProgress,
  selectPublishError,
  selectPublishLoading,
  selectPublishSuccess,
  selectReviewError,
  selectReviewLoading,
  selectReviewSuccess,
} from '@/store/chatbotSelectors';
import {
  createChatbotDraft,
  fetchChatbotReview,
  publishChatbotDraft,
  saveChatbotBasicInfo,
  saveChatbotBehaviour,
  uploadChatbotKnowledgeBase,
} from '@/store/chatbotThunk';
import type {
  BasicInfoRequest,
  BehaviourRequest,
  KnowledgeBaseUploadPayload,
} from '@/types/chatbot.types';

export function useChatbot() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chatbotId = useAppSelector(selectChatbotId);
  const chatbotStatus = useAppSelector(selectChatbotStatus);
  const chatbotBasicInfo = useAppSelector(selectChatbotBasicInfo);
  const chatbotBehaviour = useAppSelector(selectChatbotBehaviour);
  const chatbotKnowledgeBase = useAppSelector(selectChatbotKnowledgeBase);
  const chatbotReview = useAppSelector(selectChatbotReview);
  const publishResponse = useAppSelector(selectChatbotPublishResponse);
  const currentStep = useAppSelector(selectChatbotCurrentStep);

  const createDraftLoading = useAppSelector(selectCreateDraftLoading);
  const createDraftSuccess = useAppSelector(selectCreateDraftSuccess);
  const createDraftError = useAppSelector(selectCreateDraftError);

  const basicInfoLoading = useAppSelector(selectBasicInfoLoading);
  const basicInfoSuccess = useAppSelector(selectBasicInfoSuccess);
  const basicInfoError = useAppSelector(selectBasicInfoError);

  const behaviourLoading = useAppSelector(selectBehaviourLoading);
  const behaviourSuccess = useAppSelector(selectBehaviourSuccess);
  const behaviourError = useAppSelector(selectBehaviourError);

  const knowledgeBaseLoading = useAppSelector(selectKnowledgeBaseLoading);
  const knowledgeBaseSuccess = useAppSelector(selectKnowledgeBaseSuccess);
  const knowledgeBaseError = useAppSelector(selectKnowledgeBaseError);
  const knowledgeBaseUploadProgress = useAppSelector(selectKnowledgeBaseUploadProgress);

  const reviewLoading = useAppSelector(selectReviewLoading);
  const reviewSuccess = useAppSelector(selectReviewSuccess);
  const reviewError = useAppSelector(selectReviewError);

  const publishLoading = useAppSelector(selectPublishLoading);
  const publishSuccess = useAppSelector(selectPublishSuccess);
  const publishError = useAppSelector(selectPublishError);

  const createDraft = useCallback(
    async (options?: { navigateToWizard?: boolean }) => {
      dispatch(resetChatbotWizard());
      dispatch(clearChatbotErrors());
      const result = await dispatch(createChatbotDraft());

      if (createChatbotDraft.fulfilled.match(result)) {
        toast.success(result.payload.message);

        if (options?.navigateToWizard !== false) {
          navigate('/dashboard/create');
        }
      }

      return result;
    },
    [dispatch, navigate],
  );

  const ensureChatbotDraft = useCallback(async () => {
    if (chatbotId) {
      return null;
    }

    dispatch(clearChatbotErrors());
    return dispatch(createChatbotDraft());
  }, [chatbotId, dispatch]);

  const updateBasicInfo = useCallback(
    (payload: BasicInfoRequest) => dispatch(saveChatbotBasicInfo(payload)),
    [dispatch],
  );

  const updateBehaviour = useCallback(
    (payload: BehaviourRequest) => dispatch(saveChatbotBehaviour(payload)),
    [dispatch],
  );

  const uploadKnowledgeBase = useCallback(
    (payload: KnowledgeBaseUploadPayload) =>
      dispatch(uploadChatbotKnowledgeBase(payload)),
    [dispatch],
  );

  const getReview = useCallback(
    () => dispatch(fetchChatbotReview()),
    [dispatch],
  );

  const publishChatbot = useCallback(
    () => dispatch(publishChatbotDraft()),
    [dispatch],
  );

  const goToStep = useCallback(
    (step: number) => dispatch(setChatbotStep(step)),
    [dispatch],
  );

  const clearErrors = useCallback(
    () => dispatch(clearChatbotErrors()),
    [dispatch],
  );

  const resetWizard = useCallback(
    () => dispatch(resetChatbotWizard()),
    [dispatch],
  );

  return {
    chatbotId,
    chatbotStatus,
    chatbotBasicInfo,
    chatbotBehaviour,
    chatbotKnowledgeBase,
    chatbotReview,
    publishResponse,
    currentStep,
    createDraftLoading,
    createDraftSuccess,
    createDraftError,
    basicInfoLoading,
    basicInfoSuccess,
    basicInfoError,
    behaviourLoading,
    behaviourSuccess,
    behaviourError,
    knowledgeBaseLoading,
    knowledgeBaseSuccess,
    knowledgeBaseError,
    knowledgeBaseUploadProgress,
    reviewLoading,
    reviewSuccess,
    reviewError,
    publishLoading,
    publishSuccess,
    publishError,
    createDraft,
    ensureChatbotDraft,
    updateBasicInfo,
    updateBehaviour,
    uploadKnowledgeBase,
    getReview,
    publishChatbot,
    goToStep,
    clearErrors,
    resetWizard,
  };
}

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
  selectListableChatbotList,
  selectChatbotListError,
  selectChatbotListLoading,
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
  selectCanCreateChatbot,
  selectUser,
  selectUserPlan,
} from '@/store/authSelectors';
import { fetchCurrentUserProfile } from '@/store/authThunk';
import { canCreateChatbot } from '@/utils/userPlan';
import {
  createChatbotDraft,
  fetchChatbotList,
  fetchChatbotReview,
  publishChatbotDraft,
  restoreChatbotDraft,
  saveChatbotBasicInfo,
  saveChatbotBehaviour,
  uploadChatbotKnowledgeBase,
} from '@/store/chatbotThunk';
import { getCurrentDraftChatbotId } from '@/utils/chatbotDraftStorage';
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

  const chatbotList = useAppSelector(selectListableChatbotList);
  const loading = useAppSelector(selectChatbotListLoading);
  const error = useAppSelector(selectChatbotListError);
  const user = useAppSelector(selectUser);
  const userPlan = useAppSelector(selectUserPlan);
  const canCreate = useAppSelector(selectCanCreateChatbot);

  const refetch = useCallback(
    () => dispatch(fetchChatbotList()),
    [dispatch],
  );

  const createDraft = useCallback(
    async (options?: { navigateToWizard?: boolean }) => {
      if (!canCreateChatbot(userPlan, user?.role)) {
        return;
      }

      dispatch(resetChatbotWizard());
      dispatch(clearChatbotErrors());
      const result = await dispatch(createChatbotDraft());

      if (createChatbotDraft.fulfilled.match(result)) {
        if (result.payload.isExistingDraft) {
          toast.success('Resuming your existing draft chatbot.');
        } else {
          toast.success(result.payload.message);
        }

        void dispatch(fetchCurrentUserProfile());

        if (options?.navigateToWizard !== false) {
          navigate('/dashboard/create');
        }
      }

      return result;
    },
    [dispatch, navigate, user?.role, userPlan],
  );

  const ensureChatbotDraft = useCallback(async () => {
    if (!canCreateChatbot(userPlan, user?.role)) {
      return null;
    }

    if (chatbotId) {
      return null;
    }

    const storedChatbotId = getCurrentDraftChatbotId();
    if (storedChatbotId) {
      dispatch(clearChatbotErrors());
      return dispatch(restoreChatbotDraft(storedChatbotId));
    }

    dispatch(clearChatbotErrors());
    return dispatch(createChatbotDraft());
  }, [chatbotId, dispatch, user?.role, userPlan]);

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

  const publishChatbot = useCallback(async () => {
    const result = await dispatch(publishChatbotDraft());

    if (publishChatbotDraft.fulfilled.match(result)) {
      void dispatch(fetchCurrentUserProfile());
    }

    return result;
  }, [dispatch]);

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
    chatbotList,
    loading,
    error,
    canCreateChatbot: canCreate,
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
    refetch,
  };
}

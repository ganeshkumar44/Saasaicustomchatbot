import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDraft as createDraftService,
  deleteChatbot as deleteChatbotService,
  activateChatbot as activateChatbotService,
  getChatbotList as getChatbotListService,
  getReview as getReviewService,
  publishChatbot as publishChatbotService,
  updateBasicInfo as updateBasicInfoService,
  updateBehaviour as updateBehaviourService,
} from '@/services/chatbot.service';
import { permanentlyDeleteChatbot as permanentlyDeleteChatbotService } from '@/services/manageChatbot.service';
import { uploadKnowledgeBase as uploadKnowledgeBaseService } from '@/services/knowledgebase.service';
import {
  knowledgeBaseProcessingFailed,
  knowledgeBaseUploadAccepted,
  resetKnowledgeBaseUpload,
  setKnowledgeBaseUploadProgress,
  startKnowledgeBaseUpload,
} from '@/store/knowledgebaseUploadSlice';
import type { RootState } from '@/store/index';
import type {
  BasicInfoData,
  BasicInfoRequest,
  BehaviourData,
  BehaviourRequest,
  ChatbotListItem,
  KnowledgeBaseUploadData,
  KnowledgeBaseUploadPayload,
  PublishData,
  ReviewData,
  DeleteChatbotData,
  ActivateChatbotData,
} from '@/types/chatbot.types';
import { getApiErrorMessage } from '@/utils/apiError';
import { getResumeStepFromReview } from '@/utils/chatbotDraft';
import {
  clearCurrentDraftChatbotId,
  getCurrentDraftChatbotId,
  setCurrentDraftChatbotId,
} from '@/utils/chatbotDraftStorage';

interface ThunkMessagePayload {
  message: string;
}

interface CreateDraftPayload extends ThunkMessagePayload {
  chatbotId: number;
  status: string;
  action: 'resume_draft' | 'create_draft';
  isExistingDraft: boolean;
  resumeStep: number;
  reviewData: ReviewData | null;
}

async function buildDraftPayload(
  chatbotId: number,
  status: string,
  message: string,
  isExistingDraft: boolean,
  action: 'resume_draft' | 'create_draft',
): Promise<CreateDraftPayload> {
  if (!isExistingDraft) {
    return {
      chatbotId,
      status,
      message,
      action,
      isExistingDraft,
      resumeStep: 1,
      reviewData: null,
    };
  }

  try {
    const reviewResponse = await getReviewService(chatbotId);

    return {
      chatbotId,
      status: reviewResponse.data.status,
      message,
      action,
      isExistingDraft,
      resumeStep: getResumeStepFromReview(reviewResponse.data),
      reviewData: reviewResponse.data,
    };
  } catch {
    // Draft exists but review could not be loaded — open wizard at step 1.
    return {
      chatbotId,
      status: status || 'draft',
      message,
      action,
      isExistingDraft,
      resumeStep: 1,
      reviewData: null,
    };
  }
}

interface BasicInfoPayload extends ThunkMessagePayload {
  data: BasicInfoData;
}

interface BehaviourPayload extends ThunkMessagePayload {
  data: BehaviourData;
}

interface KnowledgeBasePayload extends ThunkMessagePayload {
  data: KnowledgeBaseUploadData;
  status: 'processing' | 'completed' | 'failed';
}

interface ReviewPayload extends ThunkMessagePayload {
  data: ReviewData;
}

interface PublishPayload extends ThunkMessagePayload {
  data: PublishData;
}

interface DeleteChatbotPayload extends ThunkMessagePayload {
  data: DeleteChatbotData;
}

interface ActivateChatbotPayload extends ThunkMessagePayload {
  data: ActivateChatbotData;
}

interface ChatbotListPayload extends ThunkMessagePayload {
  data: ChatbotListItem[];
}

export const fetchChatbotList = createAsyncThunk<
  ChatbotListPayload,
  void,
  { rejectValue: string }
>('chatbot/fetchList', async (_, { rejectWithValue }) => {
  try {
    const response = await getChatbotListService();
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const createChatbotDraft = createAsyncThunk<
  CreateDraftPayload,
  void,
  { rejectValue: string }
>('chatbot/createDraft', async (_, { rejectWithValue }) => {
  try {
    const response = await createDraftService();
    const chatbotId = response.data.chatbot_id;

    setCurrentDraftChatbotId(chatbotId);

    const action =
      response.action
      ?? (response.is_existing_draft ? 'resume_draft' : 'create_draft');

    return await buildDraftPayload(
      chatbotId,
      response.data.status,
      response.message,
      response.is_existing_draft,
      action,
    );
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const restoreChatbotDraft = createAsyncThunk<
  CreateDraftPayload,
  number,
  { rejectValue: string }
>('chatbot/restoreDraft', async (chatbotId, { rejectWithValue }) => {
  try {
    return await buildDraftPayload(
      chatbotId,
      'draft',
      'Existing draft chatbot found.',
      true,
      'resume_draft',
    );
  } catch (error) {
    clearCurrentDraftChatbotId();
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const saveChatbotBasicInfo = createAsyncThunk<
  BasicInfoPayload,
  BasicInfoRequest,
  { rejectValue: string; state: RootState }
>('chatbot/saveBasicInfo', async (payload, { rejectWithValue, getState }) => {
  const { chatbotId } = getState().chatbot;

  if (!chatbotId) {
    return rejectWithValue('Chatbot draft not found. Please try again.');
  }

  try {
    const response = await updateBasicInfoService(chatbotId, payload);
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const saveChatbotBehaviour = createAsyncThunk<
  BehaviourPayload,
  BehaviourRequest,
  { rejectValue: string; state: RootState }
>('chatbot/saveBehaviour', async (payload, { rejectWithValue, getState }) => {
  const { chatbotId } = getState().chatbot;

  if (!chatbotId) {
    return rejectWithValue('Chatbot draft not found. Please try again.');
  }

  try {
    const response = await updateBehaviourService(chatbotId, payload);
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const uploadChatbotKnowledgeBase = createAsyncThunk<
  KnowledgeBasePayload,
  KnowledgeBaseUploadPayload,
  { rejectValue: string; state: RootState }
>(
  'chatbot/uploadKnowledgeBase',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { chatbotId } = getState().chatbot;

    if (!chatbotId) {
      return rejectWithValue('Chatbot draft not found. Please try again.');
    }

    dispatch(startKnowledgeBaseUpload({ chatbotId, context: 'create' }));

    try {
      const response = await uploadKnowledgeBaseService(
        chatbotId,
        payload,
        (progress) => {
          dispatch(setKnowledgeBaseUploadProgress(progress));
        },
      );

      if (response.status === 'processing') {
        dispatch(knowledgeBaseUploadAccepted({ chatbotId, context: 'create' }));
      } else {
        dispatch(resetKnowledgeBaseUpload());
      }

      return {
        message: response.message,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      dispatch(knowledgeBaseProcessingFailed(message));
      return rejectWithValue(message);
    }
  },
);

export const fetchChatbotReview = createAsyncThunk<
  ReviewPayload,
  void,
  { rejectValue: string; state: RootState }
>('chatbot/fetchReview', async (_, { rejectWithValue, getState }) => {
  const { chatbotId } = getState().chatbot;

  if (!chatbotId) {
    return rejectWithValue('Chatbot draft not found. Please try again.');
  }

  try {
    const response = await getReviewService(chatbotId);
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const publishChatbotDraft = createAsyncThunk<
  PublishPayload,
  void,
  { rejectValue: string; state: RootState }
>('chatbot/publish', async (_, { rejectWithValue, getState }) => {
  const { chatbotId } = getState().chatbot;

  if (!chatbotId) {
    return rejectWithValue('Chatbot draft not found. Please try again.');
  }

  try {
    const response = await publishChatbotService(chatbotId);
    clearCurrentDraftChatbotId();
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const deleteChatbot = createAsyncThunk<
  DeleteChatbotPayload,
  number,
  { rejectValue: string }
>('chatbot/delete', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await deleteChatbotService(chatbotId);

    if (getCurrentDraftChatbotId() === chatbotId) {
      clearCurrentDraftChatbotId();
    }

    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const permanentlyDeleteChatbot = createAsyncThunk<
  { message: string; chatbotId: number },
  number,
  { rejectValue: string }
>('chatbot/permanentlyDelete', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await permanentlyDeleteChatbotService(chatbotId);

    if (getCurrentDraftChatbotId() === chatbotId) {
      clearCurrentDraftChatbotId();
    }

    return { message: response.message, chatbotId };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const activateChatbot = createAsyncThunk<
  ActivateChatbotPayload,
  number,
  { rejectValue: string }
>('chatbot/activate', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await activateChatbotService(chatbotId);
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

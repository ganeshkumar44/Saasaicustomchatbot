import { createSlice } from '@reduxjs/toolkit';
import { setKnowledgeBaseUploadProgress } from '@/store/chatbotActions';
import {
  createChatbotDraft,
  fetchChatbotList,
  fetchChatbotReview,
  publishChatbotDraft,
  restoreChatbotDraft,
  saveChatbotBasicInfo,
  saveChatbotBehaviour,
  uploadChatbotKnowledgeBase,
  deleteChatbot,
} from '@/store/chatbotThunk';
import type { ChatbotState } from '@/types/chatbot.types';

const initialState: ChatbotState = {
  chatbotId: null,
  chatbotStatus: null,
  chatbotBasicInfo: null,
  chatbotBehaviour: null,
  chatbotKnowledgeBase: null,
  chatbotReview: null,
  publishResponse: null,
  currentStep: 1,
  chatbotList: [],
  chatbotListLoading: false,
  chatbotListSuccess: false,
  chatbotListError: null,
  createDraftLoading: false,
  createDraftSuccess: false,
  createDraftError: null,
  basicInfoLoading: false,
  basicInfoSuccess: false,
  basicInfoError: null,
  behaviourLoading: false,
  behaviourSuccess: false,
  behaviourError: null,
  knowledgeBaseLoading: false,
  knowledgeBaseSuccess: false,
  knowledgeBaseError: null,
  knowledgeBaseUploadProgress: 0,
  reviewLoading: false,
  reviewSuccess: false,
  reviewError: null,
  publishLoading: false,
  publishSuccess: false,
  publishError: null,
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    clearChatbotErrors: (state) => {
      state.createDraftError = null;
      state.basicInfoError = null;
      state.behaviourError = null;
      state.knowledgeBaseError = null;
      state.reviewError = null;
      state.publishError = null;
    },
    clearDeleteChatbotError: (state) => {
      state.deleteError = null;
    },
    setChatbotStep: (state, action: { payload: number }) => {
      state.currentStep = action.payload;
    },
    resetChatbotWizard: (state) => ({
      ...initialState,
      chatbotList: state.chatbotList,
      chatbotListLoading: state.chatbotListLoading,
      chatbotListSuccess: state.chatbotListSuccess,
      chatbotListError: state.chatbotListError,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setKnowledgeBaseUploadProgress, (state, action) => {
        state.knowledgeBaseUploadProgress = action.payload;
      })
      .addCase(createChatbotDraft.pending, (state) => {
        state.createDraftLoading = true;
        state.createDraftSuccess = false;
        state.createDraftError = null;
      })
      .addCase(createChatbotDraft.fulfilled, (state, action) => {
        state.createDraftLoading = false;
        state.createDraftSuccess = true;
        state.createDraftError = null;
        state.chatbotId = action.payload.chatbotId;
        state.chatbotStatus = action.payload.status;
        state.currentStep = action.payload.resumeStep;
        state.chatbotReview = action.payload.reviewData;
      })
      .addCase(createChatbotDraft.rejected, (state, action) => {
        state.createDraftLoading = false;
        state.createDraftSuccess = false;
        state.createDraftError =
          action.payload ?? 'Failed to create chatbot draft. Please try again.';
      })
      .addCase(restoreChatbotDraft.pending, (state) => {
        state.createDraftLoading = true;
        state.createDraftSuccess = false;
        state.createDraftError = null;
      })
      .addCase(restoreChatbotDraft.fulfilled, (state, action) => {
        state.createDraftLoading = false;
        state.createDraftSuccess = true;
        state.createDraftError = null;
        state.chatbotId = action.payload.chatbotId;
        state.chatbotStatus = action.payload.status;
        state.currentStep = action.payload.resumeStep;
        state.chatbotReview = action.payload.reviewData;
      })
      .addCase(restoreChatbotDraft.rejected, (state, action) => {
        state.createDraftLoading = false;
        state.createDraftSuccess = false;
        state.createDraftError =
          action.payload ?? 'Failed to create chatbot draft. Please try again.';
      })
      .addCase(saveChatbotBasicInfo.pending, (state) => {
        state.basicInfoLoading = true;
        state.basicInfoSuccess = false;
        state.basicInfoError = null;
      })
      .addCase(saveChatbotBasicInfo.fulfilled, (state, action) => {
        state.basicInfoLoading = false;
        state.basicInfoSuccess = true;
        state.basicInfoError = null;
        state.chatbotBasicInfo = action.payload.data;
        state.chatbotStatus = action.payload.data.status;
        state.currentStep = 2;
      })
      .addCase(saveChatbotBasicInfo.rejected, (state, action) => {
        state.basicInfoLoading = false;
        state.basicInfoSuccess = false;
        state.basicInfoError =
          action.payload ?? 'Failed to save basic information. Please try again.';
      })
      .addCase(saveChatbotBehaviour.pending, (state) => {
        state.behaviourLoading = true;
        state.behaviourSuccess = false;
        state.behaviourError = null;
      })
      .addCase(saveChatbotBehaviour.fulfilled, (state, action) => {
        state.behaviourLoading = false;
        state.behaviourSuccess = true;
        state.behaviourError = null;
        state.chatbotBehaviour = action.payload.data;
        state.currentStep = 3;
      })
      .addCase(saveChatbotBehaviour.rejected, (state, action) => {
        state.behaviourLoading = false;
        state.behaviourSuccess = false;
        state.behaviourError =
          action.payload ?? 'Failed to save behaviour settings. Please try again.';
      })
      .addCase(uploadChatbotKnowledgeBase.pending, (state) => {
        state.knowledgeBaseLoading = true;
        state.knowledgeBaseSuccess = false;
        state.knowledgeBaseError = null;
        state.knowledgeBaseUploadProgress = 0;
      })
      .addCase(uploadChatbotKnowledgeBase.fulfilled, (state, action) => {
        state.knowledgeBaseLoading = false;
        state.knowledgeBaseSuccess = true;
        state.knowledgeBaseError = null;
        state.chatbotKnowledgeBase = action.payload.data;
        state.knowledgeBaseUploadProgress = 100;
        state.currentStep = 4;
      })
      .addCase(uploadChatbotKnowledgeBase.rejected, (state, action) => {
        state.knowledgeBaseLoading = false;
        state.knowledgeBaseSuccess = false;
        state.knowledgeBaseError =
          action.payload ?? 'Failed to upload knowledge base. Please try again.';
        state.knowledgeBaseUploadProgress = 0;
      })
      .addCase(fetchChatbotReview.pending, (state) => {
        state.reviewLoading = true;
        state.reviewSuccess = false;
        state.reviewError = null;
      })
      .addCase(fetchChatbotReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
        state.reviewError = null;
        state.chatbotReview = action.payload.data;
      })
      .addCase(fetchChatbotReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = false;
        state.reviewError =
          action.payload ?? 'Failed to load chatbot review. Please try again.';
      })
      .addCase(publishChatbotDraft.pending, (state) => {
        state.publishLoading = true;
        state.publishSuccess = false;
        state.publishError = null;
      })
      .addCase(publishChatbotDraft.fulfilled, (state, action) => {
        state.publishLoading = false;
        state.publishSuccess = true;
        state.publishError = null;
        state.publishResponse = action.payload.data;
        state.chatbotStatus = action.payload.data.status;
        state.chatbotId = action.payload.data.chatbot_id;
      })
      .addCase(publishChatbotDraft.rejected, (state, action) => {
        state.publishLoading = false;
        state.publishSuccess = false;
        state.publishError =
          action.payload ?? 'Failed to publish chatbot. Please try again.';
      })
      .addCase(fetchChatbotList.pending, (state) => {
        state.chatbotListLoading = true;
        state.chatbotListSuccess = false;
        state.chatbotListError = null;
      })
      .addCase(fetchChatbotList.fulfilled, (state, action) => {
        state.chatbotListLoading = false;
        state.chatbotListSuccess = true;
        state.chatbotListError = null;
        state.chatbotList = action.payload.data;
      })
      .addCase(fetchChatbotList.rejected, (state, action) => {
        state.chatbotListLoading = false;
        state.chatbotListSuccess = false;
        state.chatbotListError =
          action.payload ?? 'Failed to load chatbots. Please try again.';
      })
      .addCase(deleteChatbot.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.deleteError = null;
      })
      .addCase(deleteChatbot.fulfilled, (state, action) => {
        const deletedChatbotId = action.payload.data.chatbot_id;

        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.deleteError = null;
        state.chatbotList = state.chatbotList.filter(
          (chatbot) => chatbot.chatbot_id !== deletedChatbotId,
        );

        if (state.chatbotId === deletedChatbotId) {
          state.chatbotId = null;
          state.chatbotStatus = null;
        }
      })
      .addCase(deleteChatbot.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteSuccess = false;
        state.deleteError =
          action.payload ?? 'Failed to delete chatbot. Please try again.';
      });
  },
});

export const { clearChatbotErrors, clearDeleteChatbotError, setChatbotStep, resetChatbotWizard } =
  chatbotSlice.actions;

export default chatbotSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { setKnowledgeBaseUploadProgress } from '@/store/chatbotActions';
import {
  createChatbotDraft,
  fetchChatbotReview,
  publishChatbotDraft,
  saveChatbotBasicInfo,
  saveChatbotBehaviour,
  uploadChatbotKnowledgeBase,
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
    setChatbotStep: (state, action: { payload: number }) => {
      state.currentStep = action.payload;
    },
    resetChatbotWizard: () => initialState,
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
        state.currentStep = 1;
      })
      .addCase(createChatbotDraft.rejected, (state, action) => {
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
      });
  },
});

export const { clearChatbotErrors, setChatbotStep, resetChatbotWizard } =
  chatbotSlice.actions;

export default chatbotSlice.reducer;

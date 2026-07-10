import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  KnowledgeBaseUploadContext,
  KnowledgeBaseUploadState,
} from '@/types/knowledgebase.types';

const initialState: KnowledgeBaseUploadState = {
  activeChatbotId: null,
  context: null,
  status: 'idle',
  error: null,
  uploadProgress: 0,
};

const knowledgebaseUploadSlice = createSlice({
  name: 'knowledgebaseUpload',
  initialState,
  reducers: {
    startKnowledgeBaseUpload: (
      state,
      action: PayloadAction<{
        chatbotId: number;
        context: KnowledgeBaseUploadContext;
      }>,
    ) => {
      state.activeChatbotId = action.payload.chatbotId;
      state.context = action.payload.context;
      state.status = 'uploading';
      state.error = null;
      state.uploadProgress = 0;
    },
    setKnowledgeBaseUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    knowledgeBaseUploadAccepted: (
      state,
      action: PayloadAction<{
        chatbotId: number;
        context: KnowledgeBaseUploadContext;
      }>,
    ) => {
      state.activeChatbotId = action.payload.chatbotId;
      state.context = action.payload.context;
      state.status = 'processing';
      state.error = null;
      state.uploadProgress = 100;
    },
    knowledgeBaseProcessingCompleted: (state) => {
      state.status = 'completed';
      state.error = null;
      state.uploadProgress = 100;
    },
    knowledgeBaseProcessingFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetKnowledgeBaseUpload: () => initialState,
  },
});

export const {
  startKnowledgeBaseUpload,
  setKnowledgeBaseUploadProgress,
  knowledgeBaseUploadAccepted,
  knowledgeBaseProcessingCompleted,
  knowledgeBaseProcessingFailed,
  resetKnowledgeBaseUpload,
} = knowledgebaseUploadSlice.actions;

export default knowledgebaseUploadSlice.reducer;

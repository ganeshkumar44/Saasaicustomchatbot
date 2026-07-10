import type { RootState } from '@/store/index';

export const selectKnowledgeBaseUploadState = (state: RootState) =>
  state.knowledgebaseUpload;

export const selectKnowledgeBaseUploadStatus = (state: RootState) =>
  state.knowledgebaseUpload.status;

export const selectKnowledgeBaseUploadError = (state: RootState) =>
  state.knowledgebaseUpload.error;

export const selectKnowledgeBaseUploadProgress = (state: RootState) =>
  state.knowledgebaseUpload.uploadProgress;

export const selectKnowledgeBaseUploadContext = (state: RootState) =>
  state.knowledgebaseUpload.context;

export const selectActiveKnowledgeBaseChatbotId = (state: RootState) =>
  state.knowledgebaseUpload.activeChatbotId;

export const selectIsKnowledgeBaseProcessing = (state: RootState) =>
  state.knowledgebaseUpload.status === 'processing'
  || state.knowledgebaseUpload.status === 'uploading';

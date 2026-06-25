import { createAction } from '@reduxjs/toolkit';

export const setKnowledgeBaseUploadProgress = createAction<number>(
  'chatbot/setKnowledgeBaseUploadProgress',
);

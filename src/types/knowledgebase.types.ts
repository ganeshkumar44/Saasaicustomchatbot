export type KnowledgeBaseProcessingStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'completed'
  | 'failed';

export type KnowledgeBaseApiProcessingStatus = 'processing' | 'completed' | 'failed';

export type KnowledgeBaseUploadContext = 'create' | 'settings';

export interface KnowledgeBaseUploadState {
  activeChatbotId: number | null;
  context: KnowledgeBaseUploadContext | null;
  status: KnowledgeBaseProcessingStatus;
  error: string | null;
  uploadProgress: number;
}

export interface KnowledgeBaseUploadResponse {
  success: true;
  message: string;
  status: KnowledgeBaseApiProcessingStatus;
  data: {
    chatbot_id: number;
    total_sources: number;
    processed_sources: number;
    total_chunks: number;
  };
}

export interface KnowledgeBaseStatusResponse {
  success: true;
  status: KnowledgeBaseApiProcessingStatus;
  error?: string | null;
}

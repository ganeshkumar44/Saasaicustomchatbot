import { useAppSelector } from '@/store/hooks';
import {
  selectActiveKnowledgeBaseChatbotId,
  selectIsKnowledgeBaseProcessing,
  selectKnowledgeBaseUploadContext,
  selectKnowledgeBaseUploadError,
  selectKnowledgeBaseUploadProgress,
  selectKnowledgeBaseUploadStatus,
} from '@/store/knowledgebaseUploadSelectors';

export function useKnowledgeBaseUpload() {
  const activeChatbotId = useAppSelector(selectActiveKnowledgeBaseChatbotId);
  const context = useAppSelector(selectKnowledgeBaseUploadContext);
  const status = useAppSelector(selectKnowledgeBaseUploadStatus);
  const error = useAppSelector(selectKnowledgeBaseUploadError);
  const uploadProgress = useAppSelector(selectKnowledgeBaseUploadProgress);
  const isProcessing = useAppSelector(selectIsKnowledgeBaseProcessing);

  return {
    activeChatbotId,
    context,
    status,
    error,
    uploadProgress,
    isProcessing,
    isUploading: status === 'uploading',
    isBackgroundProcessing: status === 'processing',
    isCompleted: status === 'completed',
    isFailed: status === 'failed',
  };
}

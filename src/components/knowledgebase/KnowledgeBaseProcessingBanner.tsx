import { Loader2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import {
  selectIsKnowledgeBaseProcessing,
  selectKnowledgeBaseUploadContext,
  selectKnowledgeBaseUploadProgress,
  selectKnowledgeBaseUploadStatus,
} from '@/store/knowledgebaseUploadSelectors';

interface KnowledgeBaseProcessingBannerProps {
  context?: 'create' | 'settings';
}

export function KnowledgeBaseProcessingBanner({
  context,
}: KnowledgeBaseProcessingBannerProps) {
  const status = useAppSelector(selectKnowledgeBaseUploadStatus);
  const uploadProgress = useAppSelector(selectKnowledgeBaseUploadProgress);
  const uploadContext = useAppSelector(selectKnowledgeBaseUploadContext);
  const isProcessing = useAppSelector(selectIsKnowledgeBaseProcessing);

  if (!isProcessing) {
    return null;
  }

  if (context && uploadContext !== context) {
    return null;
  }

  const showUploadProgress =
    status === 'uploading' && uploadProgress > 0 && uploadProgress < 100;

  const title =
    context === 'settings' || uploadContext === 'settings'
      ? 'Updating Knowledge Base...'
      : 'Knowledge Base upload is in progress.';

  const description =
    status === 'uploading'
      ? showUploadProgress
        ? `Uploading files... ${uploadProgress}%`
        : 'Uploading files...'
      : context === 'settings' || uploadContext === 'settings'
        ? 'Processing files... Please wait...'
        : 'You can continue working while we process your files.';

  return (
    <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 space-y-3">
      <div className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-medium">{title}</p>
          <p>{description}</p>
        </div>
      </div>
      {showUploadProgress ? (
        <div className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      ) : (
        <div className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-blue-600 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}

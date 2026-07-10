import { useEffect } from 'react';
import { toast } from 'sonner';
import { KNOWLEDGE_BASE_STATUS_POLL_INTERVAL_MS } from '@/constants/knowledgebase';
import { getKnowledgeBaseStatus } from '@/services/knowledgebase.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchChatbotDetails } from '@/store/chatbotSettingsThunk';
import { fetchChatbotReview } from '@/store/chatbotThunk';
import {
  knowledgeBaseProcessingCompleted,
  knowledgeBaseProcessingFailed,
  resetKnowledgeBaseUpload,
} from '@/store/knowledgebaseUploadSlice';
import {
  selectActiveKnowledgeBaseChatbotId,
  selectKnowledgeBaseUploadContext,
  selectKnowledgeBaseUploadStatus,
} from '@/store/knowledgebaseUploadSelectors';

export function useKnowledgeBaseStatusPolling() {
  const dispatch = useAppDispatch();
  const chatbotId = useAppSelector(selectActiveKnowledgeBaseChatbotId);
  const status = useAppSelector(selectKnowledgeBaseUploadStatus);
  const context = useAppSelector(selectKnowledgeBaseUploadContext);

  useEffect(() => {
    if (!chatbotId || status !== 'processing') {
      return;
    }

    let isCancelled = false;

    const pollStatus = async () => {
      try {
        const response = await getKnowledgeBaseStatus(chatbotId);

        if (isCancelled) {
          return;
        }

        if (response.status === 'completed') {
          dispatch(knowledgeBaseProcessingCompleted());
          toast.success('Knowledge base uploaded successfully.');

          if (context === 'settings') {
            void dispatch(fetchChatbotDetails(chatbotId));
          } else if (context === 'create') {
            void dispatch(fetchChatbotReview());
          }

          window.setTimeout(() => {
            if (!isCancelled) {
              dispatch(resetKnowledgeBaseUpload());
            }
          }, 1500);
          return;
        }

        if (response.status === 'failed') {
          dispatch(
            knowledgeBaseProcessingFailed(
              response.error ?? 'Knowledge base processing failed. Please try again.',
            ),
          );
          toast.error('Knowledge base processing failed. Please try again.');

          if (context === 'settings') {
            void dispatch(fetchChatbotDetails(chatbotId));
          }

          window.setTimeout(() => {
            if (!isCancelled) {
              dispatch(resetKnowledgeBaseUpload());
            }
          }, 3000);
        }
      } catch {
        // Keep polling on transient network errors.
      }
    };

    void pollStatus();

    const intervalId = window.setInterval(() => {
      void pollStatus();
    }, KNOWLEDGE_BASE_STATUS_POLL_INTERVAL_MS);

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [chatbotId, context, dispatch, status]);
}

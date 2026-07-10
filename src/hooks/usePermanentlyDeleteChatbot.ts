import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearPermanentDeleteChatbotError } from '@/store/chatbotSlice';
import {
  selectPermanentDeleteChatbotError,
  selectPermanentDeleteChatbotLoading,
} from '@/store/chatbotSelectors';
import { permanentlyDeleteChatbot } from '@/store/chatbotThunk';

interface UsePermanentlyDeleteChatbotOptions {
  onSuccess?: (chatbotId: number) => void;
}

export function usePermanentlyDeleteChatbot(
  options?: UsePermanentlyDeleteChatbotOptions,
) {
  const dispatch = useAppDispatch();
  const permanentDeleteLoading = useAppSelector(selectPermanentDeleteChatbotLoading);
  const permanentDeleteError = useAppSelector(selectPermanentDeleteChatbotError);
  const [pendingChatbotId, setPendingChatbotId] = useState<number | null>(null);

  const openPermanentDeleteDialog = useCallback(
    (chatbotId: number) => {
      dispatch(clearPermanentDeleteChatbotError());
      setPendingChatbotId(chatbotId);
    },
    [dispatch],
  );

  const closePermanentDeleteDialog = useCallback(() => {
    if (permanentDeleteLoading) {
      return;
    }

    setPendingChatbotId(null);
    dispatch(clearPermanentDeleteChatbotError());
  }, [permanentDeleteLoading, dispatch]);

  const confirmPermanentDelete = useCallback(async () => {
    if (!pendingChatbotId) {
      return;
    }

    const result = await dispatch(permanentlyDeleteChatbot(pendingChatbotId));

    if (permanentlyDeleteChatbot.fulfilled.match(result)) {
      toast.success(result.payload.message);
      const deletedChatbotId = result.payload.chatbotId;
      setPendingChatbotId(null);
      options?.onSuccess?.(deletedChatbotId);
      return;
    }

    if (permanentlyDeleteChatbot.rejected.match(result)) {
      toast.error(result.payload ?? 'Failed to permanently delete chatbot.');
    }
  }, [pendingChatbotId, dispatch, options]);

  return {
    pendingPermanentDeleteChatbotId: pendingChatbotId,
    permanentDeleteLoading,
    permanentDeleteError,
    isPermanentDeleteDialogOpen: pendingChatbotId !== null,
    openPermanentDeleteDialog,
    closePermanentDeleteDialog,
    confirmPermanentDelete,
  };
}

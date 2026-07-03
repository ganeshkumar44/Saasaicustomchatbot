import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearDeleteChatbotError } from '@/store/chatbotSlice';
import {
  selectDeleteChatbotError,
  selectDeleteChatbotLoading,
} from '@/store/chatbotSelectors';
import { deleteChatbot } from '@/store/chatbotThunk';

interface UseDeleteChatbotOptions {
  onSuccess?: (chatbotId: number) => void;
}

export function useDeleteChatbot(options?: UseDeleteChatbotOptions) {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteChatbotLoading);
  const deleteError = useAppSelector(selectDeleteChatbotError);
  const [pendingChatbotId, setPendingChatbotId] = useState<number | null>(null);

  const openDeleteDialog = useCallback(
    (chatbotId: number) => {
      dispatch(clearDeleteChatbotError());
      setPendingChatbotId(chatbotId);
    },
    [dispatch],
  );

  const closeDeleteDialog = useCallback(() => {
    if (deleteLoading) {
      return;
    }

    setPendingChatbotId(null);
    dispatch(clearDeleteChatbotError());
  }, [deleteLoading, dispatch]);

  const confirmDelete = useCallback(async () => {
    if (!pendingChatbotId) {
      return;
    }

    const result = await dispatch(deleteChatbot(pendingChatbotId));

    if (deleteChatbot.fulfilled.match(result)) {
      toast.success(result.payload.message);
      const deletedChatbotId = result.payload.data.chatbot_id;
      setPendingChatbotId(null);
      options?.onSuccess?.(deletedChatbotId);
    }
  }, [pendingChatbotId, dispatch, options]);

  return {
    pendingChatbotId,
    deleteLoading,
    deleteError,
    isDialogOpen: pendingChatbotId !== null,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}

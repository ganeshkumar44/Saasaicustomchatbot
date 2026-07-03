import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearActivateChatbotError } from '@/store/chatbotSlice';
import {
  selectActivateChatbotError,
  selectActivateChatbotLoading,
} from '@/store/chatbotSelectors';
import { activateChatbot } from '@/store/chatbotThunk';

interface UseActivateChatbotOptions {
  onSuccess?: (chatbotId: number) => void;
}

export function useActivateChatbot(options?: UseActivateChatbotOptions) {
  const dispatch = useAppDispatch();
  const activateLoading = useAppSelector(selectActivateChatbotLoading);
  const activateError = useAppSelector(selectActivateChatbotError);

  const activate = useCallback(
    async (chatbotId: number) => {
      dispatch(clearActivateChatbotError());

      const result = await dispatch(activateChatbot(chatbotId));

      if (activateChatbot.fulfilled.match(result)) {
        toast.success(result.payload.message);
        options?.onSuccess?.(result.payload.data.chatbot_id);
      } else if (result.payload) {
        toast.error(result.payload);
      }

      return result;
    },
    [dispatch, options],
  );

  return {
    activateLoading,
    activateError,
    activateChatbot: activate,
  };
}

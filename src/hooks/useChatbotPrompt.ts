import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearChatbotPromptSaveState,
  resetChatbotPromptState,
} from '@/store/chatbotPromptSlice';
import {
  selectChatbotPromptConfig,
  selectChatbotPromptError,
  selectChatbotPromptLoading,
  selectChatbotPromptResetting,
  selectChatbotPromptSaveError,
  selectChatbotPromptSaveSuccess,
  selectChatbotPromptSaveSuccessMessage,
  selectChatbotPromptSaving,
} from '@/store/chatbotPromptSelectors';
import {
  fetchChatbotPrompt,
  resetChatbotPromptToDefault,
  saveChatbotPrompt,
} from '@/store/chatbotPromptThunk';
import type { ChatbotPromptConfig } from '@/types/chatbotPrompt.types';
import { EMPTY_CHATBOT_PROMPT } from '@/types/chatbotPrompt.types';
import { configsAreEqual, isCustomPromptEnabled } from '@/utils/chatbotPrompt';
import { parseChatbotIdParam } from '@/utils/chatbotRoute';

export function useChatbotPrompt(enabled = true) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const chatbotId = parseChatbotIdParam(id);

  const savedConfig = useAppSelector(selectChatbotPromptConfig);
  const loading = useAppSelector(selectChatbotPromptLoading);
  const saving = useAppSelector(selectChatbotPromptSaving);
  const resetting = useAppSelector(selectChatbotPromptResetting);
  const error = useAppSelector(selectChatbotPromptError);
  const saveSuccess = useAppSelector(selectChatbotPromptSaveSuccess);
  const saveError = useAppSelector(selectChatbotPromptSaveError);
  const saveSuccessMessage = useAppSelector(selectChatbotPromptSaveSuccessMessage);

  const [form, setForm] = useState<ChatbotPromptConfig>(EMPTY_CHATBOT_PROMPT);

  useEffect(() => {
    if (!enabled || !chatbotId) {
      return;
    }

    void dispatch(fetchChatbotPrompt(chatbotId));

    return () => {
      dispatch(resetChatbotPromptState());
    };
  }, [chatbotId, dispatch, enabled]);

  useEffect(() => {
    if (savedConfig) {
      setForm(savedConfig);
    }
  }, [savedConfig]);

  useEffect(() => {
    if (saveSuccess && saveSuccessMessage) {
      toast.success(saveSuccessMessage);
      dispatch(clearChatbotPromptSaveState());
    }
  }, [dispatch, saveSuccess, saveSuccessMessage]);

  useEffect(() => {
    if (saveError) {
      toast.error(saveError);
      dispatch(clearChatbotPromptSaveState());
    }
  }, [dispatch, saveError]);

  const isCustomEnabled = useMemo(
    () => isCustomPromptEnabled(savedConfig),
    [savedConfig],
  );

  const isDirty = useMemo(
    () => savedConfig !== null && !configsAreEqual(form, savedConfig),
    [form, savedConfig],
  );

  const updateField = useCallback(
    <K extends keyof ChatbotPromptConfig>(field: K, value: ChatbotPromptConfig[K]) => {
      setForm((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  const savePrompt = useCallback(async () => {
    if (!chatbotId) {
      return;
    }

    await dispatch(saveChatbotPrompt({ chatbotId, payload: form }));
  }, [chatbotId, dispatch, form]);

  const resetToDefault = useCallback(async () => {
    if (!chatbotId) {
      return;
    }

    await dispatch(resetChatbotPromptToDefault(chatbotId));
  }, [chatbotId, dispatch]);

  const cancelChanges = useCallback(() => {
    if (savedConfig) {
      setForm(savedConfig);
    }
  }, [savedConfig]);

  const refetch = useCallback(() => {
    if (!chatbotId) {
      return;
    }

    void dispatch(fetchChatbotPrompt(chatbotId));
  }, [chatbotId, dispatch]);

  return {
    chatbotId,
    form,
    loading,
    saving,
    resetting,
    error,
    isCustomEnabled,
    isDirty,
    updateField,
    savePrompt,
    resetToDefault,
    cancelChanges,
    refetch,
  };
}

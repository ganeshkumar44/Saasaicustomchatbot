import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearChatbotSettingsUpdateState,
  resetChatbotSettingsState,
} from '@/store/chatbotSettingsSlice';
import {
  selectAppearanceSettingsLoading,
  selectChatbotDetails,
  selectChatbotDetailsError,
  selectChatbotDetailsLoading,
  selectChatbotDetailsRefreshing,
  selectChatbotDetailsSuccess,
  selectChatbotSettingsUpdateError,
  selectChatbotSettingsUpdateSuccess,
  selectGeneralSettingsLoading,
  selectKnowledgeBaseSettingsLoading,
  selectMessageSettingsLoading,
  selectSecuritySettingsLoading,
} from '@/store/chatbotSettingsSelectors';
import {
  fetchChatbotDetails,
  updateAppearanceSettings,
  updateGeneralSettings,
  updateKnowledgeBase,
  updateMessageSettings,
  updateSecuritySettings,
} from '@/store/chatbotSettingsThunk';
import type {
  AppearanceSettingsRequest,
  GeneralSettingsRequest,
  KnowledgeBaseSettingsRequest,
  MessageSettingsRequest,
  SecuritySettingsRequest,
} from '@/types/chatbotSettings.types';
import { parseChatbotIdParam } from '@/utils/chatbotRoute';
import {
  normalizeAllowedDomains,
  parseAllowedDomainsInput,
  validateAppearanceSettings,
  validateGeneralSettings,
  validateKnowledgeBaseSettingsUpdate,
  validateMessageSettings,
  validateSecuritySettings,
} from '@/utils/chatbotSettingsValidation';

export function useChatbotSettings() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const chatbotId = parseChatbotIdParam(id);
  const chatbotDetails = useAppSelector(selectChatbotDetails);
  const loading = useAppSelector(selectChatbotDetailsLoading);
  const refreshing = useAppSelector(selectChatbotDetailsRefreshing);
  const success = useAppSelector(selectChatbotDetailsSuccess);
  const error = useAppSelector(selectChatbotDetailsError);
  const generalLoading = useAppSelector(selectGeneralSettingsLoading);
  const appearanceLoading = useAppSelector(selectAppearanceSettingsLoading);
  const messageLoading = useAppSelector(selectMessageSettingsLoading);
  const securityLoading = useAppSelector(selectSecuritySettingsLoading);
  const knowledgebaseLoading = useAppSelector(selectKnowledgeBaseSettingsLoading);
  const updateSuccess = useAppSelector(selectChatbotSettingsUpdateSuccess);
  const updateError = useAppSelector(selectChatbotSettingsUpdateError);

  const refetch = useCallback(() => {
    if (!chatbotId) {
      return;
    }

    void dispatch(fetchChatbotDetails(chatbotId));
  }, [chatbotId, dispatch]);

  useEffect(() => {
    if (!chatbotId) {
      return;
    }

    void dispatch(fetchChatbotDetails(chatbotId));
  }, [chatbotId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetChatbotSettingsState());
    };
  }, [dispatch]);

  const updateGeneralSettingsHandler = useCallback(
    async (payload: GeneralSettingsRequest) => {
      dispatch(clearChatbotSettingsUpdateState());

      const validation = validateGeneralSettings({
        chatbot_name: payload.chatbot_name,
        description: payload.description,
        typing_indicator: payload.typing_indicator,
      });

      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        return null;
      }

      const result = await dispatch(
        updateGeneralSettings({
          chatbot_id: payload.chatbot_id,
          chatbot_name: payload.chatbot_name.trim(),
          description: payload.description.trim(),
          typing_indicator: payload.typing_indicator,
        }),
      );

      if (updateGeneralSettings.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      toast.error(result.payload ?? 'Failed to update general settings. Please try again.');
      return result;
    },
    [dispatch],
  );

  const updateAppearanceSettingsHandler = useCallback(
    async (payload: AppearanceSettingsRequest) => {
      dispatch(clearChatbotSettingsUpdateState());

      const validation = validateAppearanceSettings({
        primary_color: payload.primary_color,
        widget_position: payload.widget_position,
        show_avatar: payload.show_avatar,
      });

      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        return null;
      }

      const result = await dispatch(
        updateAppearanceSettings({
          chatbot_id: payload.chatbot_id,
          primary_color: payload.primary_color.trim(),
          widget_position: payload.widget_position,
          show_avatar: payload.show_avatar,
        }),
      );

      if (updateAppearanceSettings.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      toast.error(
        result.payload ?? 'Failed to update appearance settings. Please try again.',
      );
      return result;
    },
    [dispatch],
  );

  const updateMessageSettingsHandler = useCallback(
    async (payload: MessageSettingsRequest) => {
      dispatch(clearChatbotSettingsUpdateState());

      const validation = validateMessageSettings({
        chat_title: payload.chat_title,
        welcome_message: payload.welcome_message,
        input_placeholder: payload.input_placeholder,
      });

      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        return null;
      }

      const result = await dispatch(
        updateMessageSettings({
          chatbot_id: payload.chatbot_id,
          chat_title: payload.chat_title.trim(),
          welcome_message: payload.welcome_message.trim(),
          input_placeholder: payload.input_placeholder.trim(),
        }),
      );

      if (updateMessageSettings.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      toast.error(result.payload ?? 'Failed to update message settings. Please try again.');
      return result;
    },
    [dispatch],
  );

  const updateSecuritySettingsHandler = useCallback(
    async (payload: SecuritySettingsRequest) => {
      dispatch(clearChatbotSettingsUpdateState());

      const validation = validateSecuritySettings({
        ai_model: payload.ai_model,
        allowed_domains: payload.allowed_domains.join(', '),
      });

      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        return null;
      }

      const result = await dispatch(
        updateSecuritySettings({
          chatbot_id: payload.chatbot_id,
          ai_model: payload.ai_model.trim(),
          allowed_domains: normalizeAllowedDomains(payload.allowed_domains),
        }),
      );

      if (updateSecuritySettings.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return result;
      }

      toast.error(result.payload ?? 'Failed to update security settings. Please try again.');
      return result;
    },
    [dispatch],
  );

  const updateKnowledgeBaseHandler = useCallback(
    async (payload: KnowledgeBaseSettingsRequest): Promise<boolean> => {
      dispatch(clearChatbotSettingsUpdateState());

      if (!chatbotDetails) {
        toast.error('Chatbot details are not available.');
        return false;
      }

      const validation = validateKnowledgeBaseSettingsUpdate(
        chatbotDetails.knowledgebase_documents,
        payload.delete_document_ids,
        payload.files,
        payload.urls,
      );

      if (!validation.isValid) {
        toast.error(validation.errors[0]);
        return false;
      }

      const hasChanges =
        payload.delete_document_ids.length > 0
        || payload.files.length > 0
        || payload.urls.length > 0;

      if (!hasChanges) {
        toast.info('No changes to save.');
        return false;
      }

      const result = await dispatch(
        updateKnowledgeBase({
          chatbot_id: payload.chatbot_id,
          delete_document_ids: payload.delete_document_ids,
          files: payload.files,
          urls: payload.urls,
        }),
      );

      if (updateKnowledgeBase.fulfilled.match(result)) {
        toast.success(result.payload.message);
        return true;
      }

      toast.error(result.payload ?? 'Failed to update knowledge base. Please try again.');
      return false;
    },
    [chatbotDetails, dispatch],
  );

  return {
    chatbotId,
    chatbotDetails,
    loading,
    refreshing,
    success,
    error,
    generalLoading,
    appearanceLoading,
    messageLoading,
    securityLoading,
    knowledgebaseLoading,
    updateSuccess,
    updateError,
    invalidChatbotId: chatbotId === null,
    refetch,
    updateGeneralSettings: updateGeneralSettingsHandler,
    updateAppearanceSettings: updateAppearanceSettingsHandler,
    updateMessageSettings: updateMessageSettingsHandler,
    updateSecuritySettings: updateSecuritySettingsHandler,
    updateKnowledgeBase: updateKnowledgeBaseHandler,
    parseAllowedDomainsInput,
  };
}

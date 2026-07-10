import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChatbotDetails as getChatbotDetailsService,
  updateAppearanceSettings as updateAppearanceSettingsService,
  updateGeneralSettings as updateGeneralSettingsService,
  updateMessageSettings as updateMessageSettingsService,
  updateSecuritySettings as updateSecuritySettingsService,
} from '@/services/chatbot.service';
import { updateKnowledgeBaseSettings as updateKnowledgeBaseSettingsService } from '@/services/knowledgebase.service';
import {
  knowledgeBaseProcessingFailed,
  knowledgeBaseUploadAccepted,
  resetKnowledgeBaseUpload,
  setKnowledgeBaseUploadProgress,
  startKnowledgeBaseUpload,
} from '@/store/knowledgebaseUploadSlice';
import type {
  AppearanceSettingsRequest,
  ChatbotDetails,
  GeneralSettingsRequest,
  KnowledgeBaseSettingsRequest,
  MessageSettingsRequest,
  SecuritySettingsRequest,
} from '@/types/chatbotSettings.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchChatbotDetailsPayload {
  message: string;
  data: ChatbotDetails;
}

interface SettingsUpdatePayload {
  message: string;
  chatbotId: number;
  status?: 'processing' | 'completed' | 'failed';
}

export const fetchChatbotDetails = createAsyncThunk<
  FetchChatbotDetailsPayload,
  number,
  { rejectValue: string }
>('chatbotSettings/fetchDetails', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await getChatbotDetailsService(chatbotId);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateGeneralSettings = createAsyncThunk<
  SettingsUpdatePayload,
  GeneralSettingsRequest,
  { rejectValue: string }
>(
  'chatbotSettings/updateGeneral',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateGeneralSettingsService(payload);
      await dispatch(fetchChatbotDetails(payload.chatbot_id)).unwrap();
      return {
        message: response.message,
        chatbotId: payload.chatbot_id,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateAppearanceSettings = createAsyncThunk<
  SettingsUpdatePayload,
  AppearanceSettingsRequest,
  { rejectValue: string }
>(
  'chatbotSettings/updateAppearance',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateAppearanceSettingsService(payload);
      await dispatch(fetchChatbotDetails(payload.chatbot_id)).unwrap();
      return {
        message: response.message,
        chatbotId: payload.chatbot_id,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateMessageSettings = createAsyncThunk<
  SettingsUpdatePayload,
  MessageSettingsRequest,
  { rejectValue: string }
>(
  'chatbotSettings/updateMessages',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateMessageSettingsService(payload);
      await dispatch(fetchChatbotDetails(payload.chatbot_id)).unwrap();
      return {
        message: response.message,
        chatbotId: payload.chatbot_id,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateSecuritySettings = createAsyncThunk<
  SettingsUpdatePayload,
  SecuritySettingsRequest,
  { rejectValue: string }
>(
  'chatbotSettings/updateSecurity',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateSecuritySettingsService(payload);
      await dispatch(fetchChatbotDetails(payload.chatbot_id)).unwrap();
      return {
        message: response.message,
        chatbotId: payload.chatbot_id,
      };
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateKnowledgeBase = createAsyncThunk<
  SettingsUpdatePayload,
  KnowledgeBaseSettingsRequest,
  { rejectValue: string }
>(
  'chatbotSettings/updateKnowledgeBase',
  async (payload, { dispatch, rejectWithValue }) => {
    const hasNewSources = payload.files.length > 0 || payload.urls.length > 0;

    if (hasNewSources) {
      dispatch(
        startKnowledgeBaseUpload({
          chatbotId: payload.chatbot_id,
          context: 'settings',
        }),
      );
    }

    try {
      const response = await updateKnowledgeBaseSettingsService(
        payload,
        (progress) => {
          if (hasNewSources) {
            dispatch(setKnowledgeBaseUploadProgress(progress));
          }
        },
      );

      if (response.status === 'processing') {
        dispatch(
          knowledgeBaseUploadAccepted({
            chatbotId: payload.chatbot_id,
            context: 'settings',
          }),
        );
      } else if (hasNewSources) {
        dispatch(resetKnowledgeBaseUpload());
      }

      await dispatch(fetchChatbotDetails(payload.chatbot_id)).unwrap();

      return {
        message: response.message,
        chatbotId: payload.chatbot_id,
        status: response.status,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      if (hasNewSources) {
        dispatch(knowledgeBaseProcessingFailed(message));
      }
      return rejectWithValue(message);
    }
  },
);

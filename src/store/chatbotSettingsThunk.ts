import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChatbotDetails as getChatbotDetailsService,
  updateAppearanceSettings as updateAppearanceSettingsService,
  updateGeneralSettings as updateGeneralSettingsService,
  updateKnowledgeBaseSettings as updateKnowledgeBaseSettingsService,
  updateMessageSettings as updateMessageSettingsService,
  updateSecuritySettings as updateSecuritySettingsService,
} from '@/services/chatbot.service';
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
    try {
      const response = await updateKnowledgeBaseSettingsService(payload);
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

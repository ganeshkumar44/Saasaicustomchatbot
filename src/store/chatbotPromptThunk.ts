import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChatbotPrompt as getChatbotPromptService,
  resetChatbotPrompt as resetChatbotPromptService,
  updateChatbotPrompt as updateChatbotPromptService,
} from '@/services/chatbotPrompt.service';
import type {
  ChatbotPromptConfig,
  UpdateChatbotPromptRequest,
} from '@/types/chatbotPrompt.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface PromptPayload {
  message: string;
  data: ChatbotPromptConfig;
}

export const fetchChatbotPrompt = createAsyncThunk<
  PromptPayload,
  number,
  { rejectValue: string }
>('chatbotPrompt/fetch', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await getChatbotPromptService(chatbotId);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const saveChatbotPrompt = createAsyncThunk<
  PromptPayload,
  { chatbotId: number; payload: UpdateChatbotPromptRequest },
  { rejectValue: string }
>('chatbotPrompt/save', async ({ chatbotId, payload }, { rejectWithValue }) => {
  try {
    const response = await updateChatbotPromptService(chatbotId, payload);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const resetChatbotPromptToDefault = createAsyncThunk<
  PromptPayload,
  number,
  { rejectValue: string }
>('chatbotPrompt/reset', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await resetChatbotPromptService(chatbotId);
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

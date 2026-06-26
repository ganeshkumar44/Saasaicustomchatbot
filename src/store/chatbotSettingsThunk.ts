import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChatbotDetails as getChatbotDetailsService } from '@/services/chatbot.service';
import type { ChatbotDetails } from '@/types/chatbotSettings.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchChatbotDetailsPayload {
  message: string;
  data: ChatbotDetails;
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

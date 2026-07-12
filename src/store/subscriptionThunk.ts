import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChatbotSubscriptionUsage } from '@/services/subscription.service';
import type { ChatbotUsage } from '@/types/subscription.types';
import { getApiErrorMessage } from '@/utils/apiError';

export const fetchChatbotSubscriptionUsage = createAsyncThunk<
  ChatbotUsage,
  number,
  { rejectValue: string }
>('subscription/fetchUsage', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await getChatbotSubscriptionUsage(chatbotId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

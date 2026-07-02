import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecentConversations } from '@/services/dashboard.service';
import type { RecentConversation } from '@/types/dashboard.types';
import { getApiErrorMessage } from '@/utils/apiError';

interface FetchRecentConversationsPayload {
  message: string;
  data: RecentConversation[];
}

export const fetchRecentConversations = createAsyncThunk<
  FetchRecentConversationsPayload,
  void,
  { rejectValue: string }
>('dashboard/fetchRecentConversations', async (_, { rejectWithValue }) => {
  try {
    const response = await getRecentConversations();
    return {
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

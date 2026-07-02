import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getChatSessionDetails,
  getChatSessions,
} from '@/services/chatHistory.service';
import type {
  ChatSession,
  ChatSessionDetails,
  FetchChatSessionsParams,
} from '@/types/chatHistory.types';
import { getApiErrorMessage } from '@/utils/apiError';

function normalizeSessionStatus(status: string): ChatSession['status'] {
  return status === 'active' ? 'active' : 'resolved';
}

function normalizeChatSession(session: ChatSession): ChatSession {
  return {
    ...session,
    status: normalizeSessionStatus(session.status),
  };
}

function normalizeChatSessionDetails(details: ChatSessionDetails): ChatSessionDetails {
  return {
    ...details,
    status: normalizeSessionStatus(details.status),
  };
}

interface FetchChatSessionsPayload {
  message: string;
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
  data: ChatSession[];
}

interface FetchChatSessionDetailsPayload {
  message: string;
  data: ChatSessionDetails;
}

export const fetchChatSessions = createAsyncThunk<
  FetchChatSessionsPayload,
  FetchChatSessionsParams,
  { rejectValue: string }
>('chatHistory/fetchSessions', async ({ page, perPage }, { rejectWithValue }) => {
  try {
    const response = await getChatSessions(page, perPage);
    return {
      message: response.message,
      page: response.page,
      perPage: response.per_page,
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      data: response.data.map(normalizeChatSession),
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchChatSessionDetails = createAsyncThunk<
  FetchChatSessionDetailsPayload,
  number,
  { rejectValue: string }
>('chatHistory/fetchSessionDetails', async (chatSessionId, { rejectWithValue }) => {
  try {
    const response = await getChatSessionDetails(chatSessionId);
    return {
      message: response.message,
      data: normalizeChatSessionDetails(response.data),
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

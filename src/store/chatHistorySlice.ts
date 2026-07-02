import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchChatSessionDetails,
  fetchChatSessions,
} from '@/store/chatHistoryThunk';
import type { ChatHistoryState, ChatSession } from '@/types/chatHistory.types';

export const CHAT_HISTORY_PER_PAGE = 10;

const initialState: ChatHistoryState = {
  sessions: [],
  selectedSession: null,
  sessionDetails: null,
  currentPage: 1,
  totalPages: 0,
  totalRecords: 0,
  perPage: CHAT_HISTORY_PER_PAGE,
  loadingSessions: false,
  loadingMessages: false,
  error: null,
};

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    clearChatHistoryError: (state) => {
      state.error = null;
    },
    selectChatSession: (state, action: PayloadAction<ChatSession>) => {
      state.selectedSession = action.payload;
    },
    resetChatHistoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatSessions.pending, (state) => {
        state.loadingSessions = true;
        state.error = null;
      })
      .addCase(fetchChatSessions.fulfilled, (state, action) => {
        state.loadingSessions = false;
        state.error = null;
        state.sessions = action.payload.data;
        state.currentPage = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalRecords = action.payload.totalRecords;
        state.totalPages = action.payload.totalPages;

        if (action.payload.data.length > 0) {
          state.selectedSession = action.payload.data[0];
        } else {
          state.selectedSession = null;
          state.sessionDetails = null;
        }
      })
      .addCase(fetchChatSessions.rejected, (state, action) => {
        state.loadingSessions = false;
        state.sessions = [];
        state.selectedSession = null;
        state.sessionDetails = null;
        state.error =
          action.payload ?? 'Failed to load chat sessions. Please try again.';
      })
      .addCase(fetchChatSessionDetails.pending, (state) => {
        state.loadingMessages = true;
        state.error = null;
      })
      .addCase(fetchChatSessionDetails.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.error = null;
        state.sessionDetails = action.payload.data;
      })
      .addCase(fetchChatSessionDetails.rejected, (state, action) => {
        state.loadingMessages = false;
        state.sessionDetails = null;
        state.error =
          action.payload ?? 'Failed to load conversation history. Please try again.';
      });
  },
});

export const {
  clearChatHistoryError,
  selectChatSession,
  resetChatHistoryState,
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;

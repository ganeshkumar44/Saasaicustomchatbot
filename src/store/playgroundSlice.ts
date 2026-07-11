import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createNewPlaygroundSession,
  deriveSessionTitle,
  fetchPlaygroundMessages,
  fetchPlaygroundSessions,
  initializePlayground,
  removePlaygroundSession,
  sendPlaygroundMessage,
} from '@/store/playgroundThunk';
import type {
  PlaygroundMessage,
  PlaygroundSession,
  PlaygroundState,
} from '@/types/playground.types';

const initialState: PlaygroundState = {
  chatbotId: null,
  sessions: [],
  currentSessionId: null,
  messages: [],
  loadingSessions: false,
  loadingMessages: false,
  creatingSession: false,
  deletingSession: false,
  sending: false,
  initializing: false,
  error: null,
  sendError: null,
};

let tempMessageId = -1;

function nextTempMessageId(): number {
  tempMessageId -= 1;
  return tempMessageId;
}

function sortSessionsByUpdatedAt(sessions: PlaygroundSession[]): PlaygroundSession[] {
  return [...sessions].sort(
    (left, right) =>
      new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime(),
  );
}

const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    clearPlaygroundError: (state) => {
      state.error = null;
      state.sendError = null;
    },
    selectPlaygroundSession: (state, action: PayloadAction<number>) => {
      state.currentSessionId = action.payload;
      state.messages = [];
      state.error = null;
      state.sendError = null;
    },
    resetPlaygroundState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePlayground.pending, (state, action) => {
        state.initializing = true;
        state.loadingSessions = true;
        state.loadingMessages = true;
        state.error = null;
        state.chatbotId = action.meta.arg;
      })
      .addCase(initializePlayground.fulfilled, (state, action) => {
        state.initializing = false;
        state.loadingSessions = false;
        state.loadingMessages = false;
        state.error = null;
        state.sessions = sortSessionsByUpdatedAt(action.payload.sessions);
        state.currentSessionId = action.payload.currentSession.id;
        state.messages = action.payload.messages;
      })
      .addCase(initializePlayground.rejected, (state, action) => {
        state.initializing = false;
        state.loadingSessions = false;
        state.loadingMessages = false;
        state.sessions = [];
        state.currentSessionId = null;
        state.messages = [];
        state.error =
          action.payload ?? 'Failed to load Playground. Please try again.';
      })
      .addCase(fetchPlaygroundSessions.pending, (state) => {
        state.loadingSessions = true;
        state.error = null;
      })
      .addCase(fetchPlaygroundSessions.fulfilled, (state, action) => {
        state.loadingSessions = false;
        state.sessions = sortSessionsByUpdatedAt(action.payload);
      })
      .addCase(fetchPlaygroundSessions.rejected, (state, action) => {
        state.loadingSessions = false;
        state.error =
          action.payload ?? 'Failed to load Playground sessions. Please try again.';
      })
      .addCase(fetchPlaygroundMessages.pending, (state) => {
        state.loadingMessages = true;
        state.error = null;
      })
      .addCase(fetchPlaygroundMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.messages = action.payload;
      })
      .addCase(fetchPlaygroundMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.messages = [];
        state.error =
          action.payload ?? 'Failed to load conversation. Please try again.';
      })
      .addCase(createNewPlaygroundSession.pending, (state) => {
        state.creatingSession = true;
        state.error = null;
      })
      .addCase(createNewPlaygroundSession.fulfilled, (state, action) => {
        state.creatingSession = false;
        state.sessions = sortSessionsByUpdatedAt([
          action.payload.session,
          ...state.sessions,
        ]);
        state.currentSessionId = action.payload.session.id;
        state.messages = [];
        state.sendError = null;
      })
      .addCase(createNewPlaygroundSession.rejected, (state, action) => {
        state.creatingSession = false;
        state.error =
          action.payload ?? 'Failed to create a new chat. Please try again.';
      })
      .addCase(removePlaygroundSession.pending, (state) => {
        state.deletingSession = true;
        state.error = null;
      })
      .addCase(removePlaygroundSession.fulfilled, (state, action) => {
        state.deletingSession = false;
        state.sessions = sortSessionsByUpdatedAt(action.payload.sessions);
        state.currentSessionId = action.payload.currentSession?.id ?? null;
        state.messages = action.payload.messages;
        state.sendError = null;
      })
      .addCase(removePlaygroundSession.rejected, (state, action) => {
        state.deletingSession = false;
        state.error =
          action.payload ?? 'Failed to delete session. Please try again.';
      })
      .addCase(sendPlaygroundMessage.pending, (state, action) => {
        state.sending = true;
        state.sendError = null;

        const optimisticUserMessage: PlaygroundMessage = {
          id: nextTempMessageId(),
          sender: 'user',
          message: action.meta.arg.question,
          response_time: null,
          tokens_used: null,
          created_at: new Date().toISOString(),
        };
        state.messages.push(optimisticUserMessage);
      })
      .addCase(sendPlaygroundMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.sendError = null;

        const assistantMessage: PlaygroundMessage = {
          id: nextTempMessageId(),
          sender: 'assistant',
          message: action.payload.answer,
          response_time: null,
          tokens_used: null,
          created_at: new Date().toISOString(),
        };
        state.messages.push(assistantMessage);

        const sessionIndex = state.sessions.findIndex(
          (session) => session.id === action.payload.sessionId,
        );
        if (sessionIndex >= 0) {
          const session = state.sessions[sessionIndex];
          const nextTitle =
            session.title === 'New Chat'
              ? deriveSessionTitle(action.payload.question)
              : session.title;
          const updatedSession: PlaygroundSession = {
            ...session,
            title: nextTitle,
            updated_at: new Date().toISOString(),
          };
          state.sessions.splice(sessionIndex, 1);
          state.sessions = sortSessionsByUpdatedAt([
            updatedSession,
            ...state.sessions,
          ]);
        }
      })
      .addCase(sendPlaygroundMessage.rejected, (state, action) => {
        state.sending = false;
        state.sendError =
          action.payload ?? 'Failed to get a response. Please try again.';

        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage && lastMessage.sender === 'user' && lastMessage.id < 0) {
          state.messages.pop();
        }
      });
  },
});

export const {
  clearPlaygroundError,
  selectPlaygroundSession,
  resetPlaygroundState,
} = playgroundSlice.actions;

export default playgroundSlice.reducer;

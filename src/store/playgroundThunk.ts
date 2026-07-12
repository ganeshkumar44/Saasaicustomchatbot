import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPlaygroundSession,
  deletePlaygroundSession,
  getPlaygroundMessages,
  getPlaygroundSessions,
  sendPlaygroundTestAnswer,
} from '@/services/playground.service';
import type {
  PlaygroundMessage,
  PlaygroundSession,
  PlaygroundTestAnswerRequest,
} from '@/types/playground.types';
import { getApiErrorCode, getApiErrorMessage } from '@/utils/apiError';

interface InitializePlaygroundPayload {
  sessions: PlaygroundSession[];
  currentSession: PlaygroundSession;
  messages: PlaygroundMessage[];
}

interface CreateSessionPayload {
  session: PlaygroundSession;
}

interface DeleteSessionArgs {
  sessionId: number;
  chatbotId: number;
}

interface DeleteSessionPayload {
  deletedSessionId: number;
  sessions: PlaygroundSession[];
  currentSession: PlaygroundSession | null;
  messages: PlaygroundMessage[];
}

interface SendMessagePayload {
  question: string;
  answer: string;
  sessionId: number;
}

function deriveSessionTitle(question: string): string {
  const trimmed = question.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= 60) {
    return trimmed;
  }
  return `${trimmed.slice(0, 57)}...`;
}

export const initializePlayground = createAsyncThunk<
  InitializePlaygroundPayload,
  number,
  { rejectValue: string }
>('playground/initialize', async (chatbotId, { rejectWithValue }) => {
  try {
    const listResponse = await getPlaygroundSessions(chatbotId);
    let sessions = listResponse.data;
    let currentSession = sessions[0] ?? null;

    if (!currentSession) {
      const created = await createPlaygroundSession({ chatbot_id: chatbotId });
      currentSession = created.data;
      sessions = [currentSession];
    }

    const messagesResponse = await getPlaygroundMessages(currentSession.id);

    return {
      sessions,
      currentSession,
      messages: messagesResponse.data,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchPlaygroundSessions = createAsyncThunk<
  PlaygroundSession[],
  number,
  { rejectValue: string }
>('playground/fetchSessions', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await getPlaygroundSessions(chatbotId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchPlaygroundMessages = createAsyncThunk<
  PlaygroundMessage[],
  number,
  { rejectValue: string }
>('playground/fetchMessages', async (sessionId, { rejectWithValue }) => {
  try {
    const response = await getPlaygroundMessages(sessionId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const createNewPlaygroundSession = createAsyncThunk<
  CreateSessionPayload,
  number,
  { rejectValue: string }
>('playground/createSession', async (chatbotId, { rejectWithValue }) => {
  try {
    const response = await createPlaygroundSession({ chatbot_id: chatbotId });
    return { session: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const removePlaygroundSession = createAsyncThunk<
  DeleteSessionPayload,
  DeleteSessionArgs,
  { rejectValue: string }
>('playground/deleteSession', async ({ sessionId, chatbotId }, { rejectWithValue }) => {
  try {
    await deletePlaygroundSession(sessionId);

    let sessions = (await getPlaygroundSessions(chatbotId)).data;
    let currentSession = sessions[0] ?? null;
    let messages: PlaygroundMessage[] = [];

    if (!currentSession) {
      const created = await createPlaygroundSession({ chatbot_id: chatbotId });
      currentSession = created.data;
      sessions = [currentSession];
    } else {
      messages = (await getPlaygroundMessages(currentSession.id)).data;
    }

    return {
      deletedSessionId: sessionId,
      sessions,
      currentSession,
      messages,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const sendPlaygroundMessage = createAsyncThunk<
  SendMessagePayload,
  PlaygroundTestAnswerRequest,
  { rejectValue: { message: string; errorCode: string | null } }
>('playground/sendMessage', async (payload, { rejectWithValue }) => {
  try {
    const response = await sendPlaygroundTestAnswer(payload);
    return {
      question: response.question,
      answer: response.answer,
      sessionId: payload.session_id,
    };
  } catch (error) {
    return rejectWithValue({
      message: getApiErrorMessage(error),
      errorCode: getApiErrorCode(error),
    });
  }
});

export { deriveSessionTitle };

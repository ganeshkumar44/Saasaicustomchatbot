import type { RootState } from '@/store/index';
import type { PlaygroundSession } from '@/types/playground.types';

export const selectPlaygroundSessions = (state: RootState) =>
  state.playground.sessions;

export const selectPlaygroundCurrentSessionId = (state: RootState) =>
  state.playground.currentSessionId;

export const selectPlaygroundCurrentSession = (
  state: RootState,
): PlaygroundSession | null => {
  const currentId = state.playground.currentSessionId;
  if (currentId === null) {
    return null;
  }
  return (
    state.playground.sessions.find((session) => session.id === currentId) ?? null
  );
};

export const selectPlaygroundMessages = (state: RootState) =>
  state.playground.messages;

export const selectPlaygroundLoadingSessions = (state: RootState): boolean =>
  state.playground.loadingSessions;

export const selectPlaygroundLoadingMessages = (state: RootState): boolean =>
  state.playground.loadingMessages;

export const selectPlaygroundCreatingSession = (state: RootState): boolean =>
  state.playground.creatingSession;

export const selectPlaygroundDeletingSession = (state: RootState): boolean =>
  state.playground.deletingSession;

export const selectPlaygroundSending = (state: RootState): boolean =>
  state.playground.sending;

export const selectPlaygroundInitializing = (state: RootState): boolean =>
  state.playground.initializing;

export const selectPlaygroundError = (state: RootState): string | null =>
  state.playground.error;

export const selectPlaygroundSendError = (state: RootState): string | null =>
  state.playground.sendError;

export const selectPlaygroundChatbotId = (state: RootState): number | null =>
  state.playground.chatbotId;

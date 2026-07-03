export const CURRENT_DRAFT_CHATBOT_ID_KEY = 'currentDraftChatbotId';

export function setCurrentDraftChatbotId(chatbotId: number): void {
  localStorage.setItem(CURRENT_DRAFT_CHATBOT_ID_KEY, String(chatbotId));
}

export function getCurrentDraftChatbotId(): number | null {
  const storedId = localStorage.getItem(CURRENT_DRAFT_CHATBOT_ID_KEY);

  if (!storedId) {
    return null;
  }

  const chatbotId = Number(storedId);
  return Number.isFinite(chatbotId) && chatbotId > 0 ? chatbotId : null;
}

export function clearCurrentDraftChatbotId(): void {
  localStorage.removeItem(CURRENT_DRAFT_CHATBOT_ID_KEY);
}

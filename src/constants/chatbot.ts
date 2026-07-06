export const CHATBOT_PERSONALITY_OPTIONS = [
  { id: 'professional', label: 'Professional', apiValue: 'Professional' },
  { id: 'friendly', label: 'Friendly', apiValue: 'Friendly' },
  { id: 'casual', label: 'Casual', apiValue: 'Casual' },
] as const;

export const CHATBOT_AI_MODELS = [
  {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    provider: 'Google',
    desc: 'Fast & cost-effective',
    apiValue: 'Gemini 2.5 Flash',
  },
  {
    id: 'llama-3.1',
    label: 'Llama 3.1 (Ollama)',
    provider: 'Ollama',
    desc: 'Self-hosted local inference',
    apiValue: 'Llama 3.1',
  },
] as const;

export const CHATBOT_AI_MODEL = CHATBOT_AI_MODELS[0];

export const CHATBOT_AI_MODEL_API_VALUES = CHATBOT_AI_MODELS.map(
  (model) => model.apiValue,
);

export function getChatbotAiModelById(id: string) {
  return CHATBOT_AI_MODELS.find((model) => model.id === id) ?? CHATBOT_AI_MODELS[0];
}

export function getChatbotAiModelByApiValue(apiValue: string) {
  return (
    CHATBOT_AI_MODELS.find((model) => model.apiValue === apiValue)
    ?? CHATBOT_AI_MODELS[0]
  );
}

export const CHATBOT_LANGUAGE = {
  id: 'en',
  label: 'English',
  apiValue: 'English',
} as const;

export const KNOWLEDGE_BASE_ALLOWED_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
  '.txt',
  '.csv',
  '.md',
] as const;

export const KNOWLEDGE_BASE_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const CHATBOT_NAME_MAX_LENGTH = 255;
export const CHATBOT_DESCRIPTION_MAX_LENGTH = 1000;

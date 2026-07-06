import { CHATBOT_AI_MODEL_API_VALUES } from '@/constants/chatbot';
import {
  validateKnowledgeBaseFiles,
  validateKnowledgeBaseUrl,
} from '@/utils/chatbotValidation';
import type { ValidationResult } from '@/utils/validation';
import type {
  AppearanceSettingsForm,
  GeneralSettingsForm,
  KnowledgebaseDocument,
  MessageSettingsForm,
  SecuritySettingsForm,
} from '@/types/chatbotSettings.types';

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const ALLOWED_WIDGET_POSITIONS = ['bottom-right', 'bottom-left'] as const;

const CHATBOT_NAME_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 1000;
const CHAT_TITLE_MAX_LENGTH = 100;
const WELCOME_MESSAGE_MAX_LENGTH = 1000;
const INPUT_PLACEHOLDER_MAX_LENGTH = 150;

export function parseAllowedDomainsInput(value: string): string[] {
  return value
    .split(',')
    .map((domain) => domain.trim())
    .filter(Boolean);
}

export function normalizeAllowedDomains(domains: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  domains.forEach((domain) => {
    const trimmed = domain.trim();
    if (!trimmed) {
      return;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    normalized.push(trimmed);
  });

  return normalized;
}

function isValidDomainUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.host) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return true;
    }

    return /^https?:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}(?:\/.*)?$/i.test(
      value,
    );
  } catch {
    return false;
  }
}

export function validateGeneralSettings(form: GeneralSettingsForm): ValidationResult {
  const errors: string[] = [];
  const chatbotName = form.chatbot_name.trim();
  const description = form.description.trim();

  if (!chatbotName) {
    errors.push('Chatbot name is required.');
  } else if (chatbotName.length > CHATBOT_NAME_MAX_LENGTH) {
    errors.push(`Chatbot name must be at most ${CHATBOT_NAME_MAX_LENGTH} characters.`);
  }

  if (!description) {
    errors.push('Description is required.');
  } else if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.push(`Description must be at most ${DESCRIPTION_MAX_LENGTH} characters.`);
  }

  if (typeof form.typing_indicator !== 'boolean') {
    errors.push('Typing indicator is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateAppearanceSettings(form: AppearanceSettingsForm): ValidationResult {
  const errors: string[] = [];
  const primaryColor = form.primary_color.trim();

  if (!primaryColor) {
    errors.push('Primary color is required.');
  } else if (!HEX_COLOR_PATTERN.test(primaryColor)) {
    errors.push('Please enter a valid hex color (e.g. #000000).');
  }

  if (!form.widget_position.trim()) {
    errors.push('Widget position is required.');
  } else if (
    !ALLOWED_WIDGET_POSITIONS.includes(
      form.widget_position as (typeof ALLOWED_WIDGET_POSITIONS)[number],
    )
  ) {
    errors.push('Please select a valid widget position.');
  }

  if (typeof form.show_avatar !== 'boolean') {
    errors.push('Show avatar is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateMessageSettings(form: MessageSettingsForm): ValidationResult {
  const errors: string[] = [];
  const chatTitle = form.chat_title.trim();
  const welcomeMessage = form.welcome_message.trim();
  const inputPlaceholder = form.input_placeholder.trim();

  if (!chatTitle) {
    errors.push('Chat title is required.');
  } else if (chatTitle.length > CHAT_TITLE_MAX_LENGTH) {
    errors.push(`Chat title must be at most ${CHAT_TITLE_MAX_LENGTH} characters.`);
  }

  if (!welcomeMessage) {
    errors.push('Welcome message is required.');
  } else if (welcomeMessage.length > WELCOME_MESSAGE_MAX_LENGTH) {
    errors.push(`Welcome message must be at most ${WELCOME_MESSAGE_MAX_LENGTH} characters.`);
  }

  if (!inputPlaceholder) {
    errors.push('Input placeholder is required.');
  } else if (inputPlaceholder.length > INPUT_PLACEHOLDER_MAX_LENGTH) {
    errors.push(
      `Input placeholder must be at most ${INPUT_PLACEHOLDER_MAX_LENGTH} characters.`,
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSecuritySettings(form: SecuritySettingsForm): ValidationResult {
  const errors: string[] = [];
  const aiModel = form.ai_model.trim();

  if (!aiModel) {
    errors.push('AI model is required.');
  } else if (!CHATBOT_AI_MODEL_API_VALUES.includes(aiModel as (typeof CHATBOT_AI_MODEL_API_VALUES)[number])) {
    errors.push('Please select a valid AI model.');
  }

  const domains = normalizeAllowedDomains(parseAllowedDomainsInput(form.allowed_domains));
  if (domains.length === 0) {
    errors.push('At least one allowed domain is required.');
  } else {
    domains.forEach((domain) => {
      if (!isValidDomainUrl(domain)) {
        errors.push(`Invalid domain URL: ${domain}`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateKnowledgeBaseSettingsUpdate(
  existingDocuments: KnowledgebaseDocument[],
  deleteDocumentIds: number[],
  newFiles: File[],
  newUrls: string[],
): ValidationResult {
  const deleteIds = new Set(deleteDocumentIds);
  const remainingExisting = existingDocuments.filter(
    (document) => !deleteIds.has(document.id),
  ).length;
  const trimmedUrls = newUrls.map((url) => url.trim()).filter(Boolean);
  const remainingAfterUpdate = remainingExisting + newFiles.length + trimmedUrls.length;

  if (remainingAfterUpdate < 1) {
    return {
      isValid: false,
      errors: ['Please upload at least one document or URL before saving changes.'],
    };
  }

  const fileValidation = validateKnowledgeBaseFiles(newFiles);
  if (!fileValidation.isValid) {
    return fileValidation;
  }

  const urlErrors: string[] = [];
  const seenUrls = new Set<string>();

  trimmedUrls.forEach((url) => {
    const normalizedUrl = url.toLowerCase();
    if (seenUrls.has(normalizedUrl)) {
      return;
    }

    seenUrls.add(normalizedUrl);
    const urlValidation = validateKnowledgeBaseUrl(url);
    if (!urlValidation.isValid) {
      urlErrors.push(...urlValidation.errors);
    }
  });

  return {
    isValid: urlErrors.length === 0,
    errors: urlErrors,
  };
}

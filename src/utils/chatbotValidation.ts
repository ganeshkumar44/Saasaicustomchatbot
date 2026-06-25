import {
  CHATBOT_DESCRIPTION_MAX_LENGTH,
  CHATBOT_NAME_MAX_LENGTH,
  KNOWLEDGE_BASE_ALLOWED_EXTENSIONS,
  KNOWLEDGE_BASE_MAX_FILE_SIZE_BYTES,
} from '@/constants/chatbot';
import type { ValidationResult } from '@/utils/validation';

const URL_REGEX = /^https?:\/\/.+/i;

export function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    return '';
  }

  return filename.slice(dotIndex).toLowerCase();
}

export function isAllowedKnowledgeFile(file: File): boolean {
  const extension = getFileExtension(file.name);
  return KNOWLEDGE_BASE_ALLOWED_EXTENSIONS.includes(
    extension as (typeof KNOWLEDGE_BASE_ALLOWED_EXTENSIONS)[number],
  );
}

export function validateChatbotBasicInfo(
  chatbotName: string,
  description: string,
): ValidationResult {
  const errors: string[] = [];
  const trimmedName = chatbotName.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName) {
    errors.push('Chatbot name is required.');
  } else if (trimmedName.length > CHATBOT_NAME_MAX_LENGTH) {
    errors.push(`Chatbot name must be at most ${CHATBOT_NAME_MAX_LENGTH} characters.`);
  }

  if (!trimmedDescription) {
    errors.push('Description is required.');
  } else if (trimmedDescription.length > CHATBOT_DESCRIPTION_MAX_LENGTH) {
    errors.push(
      `Description must be at most ${CHATBOT_DESCRIPTION_MAX_LENGTH} characters.`,
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateChatbotBehaviour(
  personality: string,
  aiModel: string,
  language: string,
): ValidationResult {
  const errors: string[] = [];

  if (!personality) {
    errors.push('Personality is required.');
  }

  if (!aiModel) {
    errors.push('AI model is required.');
  }

  if (!language) {
    errors.push('Language is required.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateKnowledgeBaseFiles(files: File[]): ValidationResult {
  const errors: string[] = [];
  const seen = new Set<string>();

  files.forEach((file) => {
    const fileKey = `${file.name}-${file.size}`;

    if (seen.has(fileKey)) {
      errors.push(`Duplicate file: ${file.name}`);
      return;
    }

    seen.add(fileKey);

    if (!isAllowedKnowledgeFile(file)) {
      errors.push(`Unsupported file type: ${file.name}`);
    }

    if (file.size > KNOWLEDGE_BASE_MAX_FILE_SIZE_BYTES) {
      errors.push(`File exceeds maximum size (10MB): ${file.name}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateKnowledgeBaseUrl(url: string): ValidationResult {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return {
      isValid: false,
      errors: ['URL is required.'],
    };
  }

  if (!URL_REGEX.test(trimmedUrl)) {
    return {
      isValid: false,
      errors: ['Please enter a valid URL.'],
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}

export function validateKnowledgeBaseUpload(
  files: File[],
  urls: string[],
): ValidationResult {
  if (files.length === 0 && urls.length === 0) {
    return {
      isValid: false,
      errors: ['At least one file or URL is required.'],
    };
  }

  const fileValidation = validateKnowledgeBaseFiles(files);
  if (!fileValidation.isValid) {
    return fileValidation;
  }

  const urlErrors: string[] = [];
  const seenUrls = new Set<string>();

  urls.forEach((url) => {
    const normalizedUrl = url.trim().toLowerCase();
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

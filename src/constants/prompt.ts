export const PROMPT_TONE_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Formal', label: 'Formal' },
  { value: 'Casual', label: 'Casual' },
] as const;

export const PROMPT_RESPONSE_STYLE_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'Detailed', label: 'Detailed' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Simple', label: 'Simple' },
  { value: 'Creative', label: 'Creative' },
] as const;

export const PROMPT_RESPONSE_LENGTH_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Long', label: 'Long' },
] as const;

export const PROMPT_LANGUAGE_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Japanese', label: 'Japanese' },
] as const;

export const SYSTEM_PROMPT_MAX_LENGTH = 10_000;
export const EXTRA_INSTRUCTION_MAX_LENGTH = 5_000;

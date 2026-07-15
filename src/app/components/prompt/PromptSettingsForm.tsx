import { Loader2, RotateCcw, Save, X } from 'lucide-react';
import { PromptDropdown } from '@/app/components/prompt/PromptDropdown';
import { PromptStatusCard } from '@/app/components/prompt/PromptStatusCard';
import { PromptTextarea } from '@/app/components/prompt/PromptTextarea';
import {
  EXTRA_INSTRUCTION_MAX_LENGTH,
  PROMPT_LANGUAGE_OPTIONS,
  PROMPT_RESPONSE_LENGTH_OPTIONS,
  PROMPT_RESPONSE_STYLE_OPTIONS,
  PROMPT_TONE_OPTIONS,
  SYSTEM_PROMPT_MAX_LENGTH,
} from '@/constants/prompt';
import type { ChatbotPromptConfig } from '@/types/chatbotPrompt.types';

interface PromptSettingsFormProps {
  form: ChatbotPromptConfig;
  loading: boolean;
  saving: boolean;
  resetting: boolean;
  isCustomEnabled: boolean;
  isDirty: boolean;
  disabled?: boolean;
  onFieldChange: <K extends keyof ChatbotPromptConfig>(
    field: K,
    value: ChatbotPromptConfig[K],
  ) => void;
  onSave: () => void;
  onReset: () => void;
  onCancel: () => void;
}

export function PromptSettingsForm({
  form,
  loading,
  saving,
  resetting,
  isCustomEnabled,
  isDirty,
  disabled = false,
  onFieldChange,
  onSave,
  onReset,
  onCancel,
}: PromptSettingsFormProps) {
  const isBusy = loading || saving || resetting || disabled;
  const actionDisabled = isBusy;

  return (
    <div className="space-y-6">
      <PromptStatusCard isCustomEnabled={isCustomEnabled} />

      <PromptTextarea
        id="system-prompt"
        label="System Prompt"
        value={form.system_prompt}
        onChange={(value) => onFieldChange('system_prompt', value)}
        placeholder="Add custom system-level instructions for this chatbot..."
        maxLength={SYSTEM_PROMPT_MAX_LENGTH}
        rows={6}
        disabled={isBusy}
        helperText="Merged with the global default prompt. Leave empty to use only the default."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PromptDropdown
          id="prompt-tone"
          label="Tone"
          value={form.tone}
          options={PROMPT_TONE_OPTIONS}
          onChange={(value) => onFieldChange('tone', value)}
          disabled={isBusy}
        />
        <PromptDropdown
          id="prompt-response-style"
          label="Response Style"
          value={form.response_style}
          options={PROMPT_RESPONSE_STYLE_OPTIONS}
          onChange={(value) => onFieldChange('response_style', value)}
          disabled={isBusy}
        />
        <PromptDropdown
          id="prompt-response-length"
          label="Response Length"
          value={form.response_length}
          options={PROMPT_RESPONSE_LENGTH_OPTIONS}
          onChange={(value) => onFieldChange('response_length', value)}
          disabled={isBusy}
        />
        <PromptDropdown
          id="prompt-language"
          label="Language"
          value={form.language}
          options={PROMPT_LANGUAGE_OPTIONS}
          onChange={(value) => onFieldChange('language', value)}
          disabled={isBusy}
        />
      </div>

      <PromptTextarea
        id="extra-instruction"
        label="Extra Instructions"
        value={form.extra_instruction}
        onChange={(value) => onFieldChange('extra_instruction', value)}
        placeholder="Example: Always greet politely and keep answers concise."
        maxLength={EXTRA_INSTRUCTION_MAX_LENGTH}
        rows={4}
        disabled={isBusy}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={onReset}
          disabled={actionDisabled}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
        >
          {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
          <span>Reset to Default</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={actionDisabled || !isDirty}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={actionDisabled || !isDirty}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-40"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Prompt</span>
        </button>
      </div>
    </div>
  );
}

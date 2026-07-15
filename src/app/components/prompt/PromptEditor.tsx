import { Loader2 } from 'lucide-react';
import { PromptSettingsForm } from '@/app/components/prompt/PromptSettingsForm';
import { useChatbotPrompt } from '@/hooks/useChatbotPrompt';

interface PromptEditorProps {
  enabled?: boolean;
  disabled?: boolean;
}

export function PromptEditor({ enabled = true, disabled = false }: PromptEditorProps) {
  const {
    form,
    loading,
    saving,
    resetting,
    error,
    isCustomEnabled,
    isDirty,
    updateField,
    savePrompt,
    resetToDefault,
    cancelChanges,
    refetch,
  } = useChatbotPrompt(enabled);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <PromptSettingsForm
      form={form}
      loading={loading}
      saving={saving}
      resetting={resetting}
      isCustomEnabled={isCustomEnabled}
      isDirty={isDirty}
      disabled={disabled}
      onFieldChange={updateField}
      onSave={() => void savePrompt()}
      onReset={() => void resetToDefault()}
      onCancel={cancelChanges}
    />
  );
}

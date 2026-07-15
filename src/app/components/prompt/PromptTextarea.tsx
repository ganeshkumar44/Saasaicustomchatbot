interface PromptTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
  helperText?: string;
}

export function PromptTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 5,
  disabled = false,
  helperText,
}: PromptTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-y min-h-[120px]"
      />
      <div className="mt-1 flex items-center justify-between gap-3">
        {helperText ? (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        ) : (
          <span />
        )}
        {maxLength ? (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {value.length} / {maxLength}
          </p>
        ) : null}
      </div>
    </div>
  );
}

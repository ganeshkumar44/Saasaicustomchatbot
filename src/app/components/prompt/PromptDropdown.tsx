interface PromptDropdownOption {
  value: string;
  label: string;
}

interface PromptDropdownProps {
  id: string;
  label: string;
  value: string;
  options: readonly PromptDropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PromptDropdown({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: PromptDropdownProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value || 'default'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

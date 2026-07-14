interface AutoRenewToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function AutoRenewToggle({
  checked,
  onChange,
  disabled = false,
}: AutoRenewToggleProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#003A96] focus:ring-[#003A96]"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm font-semibold dark:text-white">
          Enable Auto Renewal
        </span>
        <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Optional. When on, Razorpay charges automatically each billing cycle.
          Prefer UPI for Auto Renew — cards often fail if card recurring is not
          enabled on the Razorpay account.
        </span>
      </span>
    </label>
  );
}

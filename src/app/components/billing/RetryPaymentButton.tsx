interface RetryPaymentButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function RetryPaymentButton({
  loading = false,
  disabled = false,
  onClick,
}: RetryPaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#003A96] text-white hover:bg-[#002d75] disabled:opacity-50"
    >
      {loading ? 'Retrying…' : 'Retry Payment'}
    </button>
  );
}

import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
}

export function CheckoutButton({
  onClick,
  disabled = false,
  loading = false,
  label = 'Continue to Payment',
  loadingLabel = 'Creating Payment...',
}: CheckoutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[#003A96] text-white hover:bg-[#002d75] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

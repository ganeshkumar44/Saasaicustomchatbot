interface DownloadInvoiceButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}

export function DownloadInvoiceButton({
  loading = false,
  disabled = false,
  onClick,
  label = 'Download PDF',
}: DownloadInvoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? 'Downloading…' : label}
    </button>
  );
}

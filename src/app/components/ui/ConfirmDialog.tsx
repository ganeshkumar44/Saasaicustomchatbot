import { Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  error?: string | null;
  confirmVariant?: 'danger' | 'warning' | 'primary';
  onCancel: () => void;
  onConfirm: () => void;
}

function getConfirmButtonClassName(variant: ConfirmDialogProps['confirmVariant']): string {
  if (variant === 'danger') {
    return 'bg-red-600 hover:bg-red-700';
  }

  if (variant === 'warning') {
    return 'bg-orange-600 hover:bg-orange-700';
  }

  return 'bg-blue-600 hover:bg-blue-700';
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  loading = false,
  error = null,
  confirmVariant = 'primary',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full space-y-4">
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-40 flex items-center gap-2 ${getConfirmButtonClassName(confirmVariant)}`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CancelSubscriptionModalProps {
  open: boolean;
  loading?: boolean;
  subscriptionEndLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CancelSubscriptionModal({
  open,
  loading = false,
  subscriptionEndLabel,
  onConfirm,
  onCancel,
}: CancelSubscriptionModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-subscription-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2
            id="cancel-subscription-title"
            className="text-lg font-semibold dark:text-white"
          >
            Cancel Subscription
          </h2>
        </div>

        <div className="px-5 py-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>Are you sure you want to disable Auto Renewal?</p>
          <p>
            Your current subscription will remain active until{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {subscriptionEndLabel}
            </span>
            .
          </p>
          <p>
            After that your account will automatically move to the Free plan.
          </p>
        </div>

        <div className="flex gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Disabling…' : 'Yes, Disable Auto Renewal'}
          </button>
        </div>
      </div>
    </div>
  );
}

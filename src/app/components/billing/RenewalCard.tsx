import { ConfirmationDialog } from '@/app/components/billing/ConfirmationDialog';

interface RenewalCardProps {
  isAutoRenew: boolean;
  subscriptionId: string | null;
  loading?: boolean;
  onDisable: () => void;
  onEnable: () => void;
  confirmOpen: boolean;
  onConfirmDisable: () => void;
  onCancelConfirm: () => void;
}

export function RenewalCard({
  isAutoRenew,
  subscriptionId,
  loading = false,
  onDisable,
  onEnable,
  confirmOpen,
  onConfirmDisable,
  onCancelConfirm,
}: RenewalCardProps) {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold dark:text-white">Auto Renew</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {isAutoRenew
                ? 'Your plan renews automatically via Razorpay.'
                : 'Auto renew is off. You can enable it anytime.'}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md ${
              isAutoRenew
                ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoRenew ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            {isAutoRenew ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {subscriptionId ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
            Subscription ID: {subscriptionId}
          </p>
        ) : null}

        {isAutoRenew ? (
          <button
            type="button"
            onClick={onDisable}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-semibold border border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30 disabled:opacity-50"
          >
            Disable Auto Renew
          </button>
        ) : (
          <button
            type="button"
            onClick={onEnable}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-semibold bg-[#003A96] text-white hover:bg-[#002d75] disabled:opacity-50"
          >
            Enable Auto Renew
          </button>
        )}
      </div>

      <ConfirmationDialog
        open={confirmOpen}
        title="Disable Auto Renew?"
        description="Your subscription will remain active until the current billing period ends. Future automatic charges will stop."
        confirmLabel="Disable"
        loading={loading}
        onConfirm={onConfirmDisable}
        onCancel={onCancelConfirm}
      />
    </>
  );
}

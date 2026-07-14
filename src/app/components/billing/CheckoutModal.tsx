import { X } from 'lucide-react';
import { AutoRenewToggle } from '@/app/components/billing/AutoRenewToggle';
import { CheckoutButton } from '@/app/components/billing/CheckoutButton';
import { PaymentLoader } from '@/app/components/billing/PaymentLoader';
import { PriceSummary } from '@/app/components/billing/PriceSummary';
import type { CheckoutPreview } from '@/types/pricing.types';

interface CheckoutModalProps {
  open: boolean;
  checkout: CheckoutPreview | null;
  loading: boolean;
  error: string | null;
  orderLoading?: boolean;
  orderError?: string | null;
  autoRenewEnabled: boolean;
  onAutoRenewChange: (enabled: boolean) => void;
  onClose: () => void;
  onContinue: () => void;
}

export function CheckoutModal({
  open,
  checkout,
  loading,
  error,
  orderLoading = false,
  orderError = null,
  autoRenewEnabled,
  onAutoRenewChange,
  onClose,
  onContinue,
}: CheckoutModalProps) {
  if (!open) {
    return null;
  }

  const busy = loading || orderLoading;
  const displayError = orderError ?? error;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2
            id="checkout-modal-title"
            className="text-lg font-semibold dark:text-white"
          >
            Checkout preview
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={orderLoading}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {loading && !orderLoading ? (
            <PaymentLoader label="Preparing checkout…" />
          ) : null}

          {orderLoading ? (
            <PaymentLoader
              label={
                autoRenewEnabled
                  ? 'Creating Subscription...'
                  : 'Creating Payment...'
              }
            />
          ) : null}

          {!busy && displayError ? (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {displayError}
            </div>
          ) : null}

          {!busy && !displayError && checkout ? (
            <>
              <PriceSummary checkout={checkout} autoRenewEnabled={autoRenewEnabled} />
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <AutoRenewToggle
                  checked={autoRenewEnabled}
                  onChange={onAutoRenewChange}
                  disabled={orderLoading}
                />
                {autoRenewEnabled ? (
                  <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
                    Auto Renew opens Razorpay Subscriptions. In test mode, choose{' '}
                    <strong>UPI</strong> and approve (e.g. any VPA like{' '}
                    <code className="font-mono">success@razorpay</code>). Card Autopay
                    needs card-recurring enabled on the merchant — leave Auto Renew off
                    to pay once with a card.
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    One-time payment. Test card:{' '}
                    <code className="font-mono">4111 1111 1111 1111</code>, any future
                    expiry, any CVV.
                  </p>
                )}
              </div>
            </>
          ) : null}

          {!busy && !displayError && !checkout ? (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-6">
              No checkout details available.
            </p>
          ) : null}
        </div>

        <div className="flex gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={orderLoading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <CheckoutButton
            onClick={onContinue}
            loading={orderLoading}
            disabled={busy || !checkout || Boolean(displayError)}
            label={autoRenewEnabled ? 'Continue with Auto Renew' : 'Continue to Payment'}
            loadingLabel={
              autoRenewEnabled ? 'Creating Subscription...' : 'Creating Payment...'
            }
          />
        </div>
      </div>
    </div>
  );
}

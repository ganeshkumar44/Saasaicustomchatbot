import { Loader2, X } from 'lucide-react';
import type { PaymentHistoryItem } from '@/types/pricing.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface PaymentDetailsModalProps {
  open: boolean;
  payment: PaymentHistoryItem | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
}

function formatDateTime(value: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function PaymentDetailsModal({
  open,
  payment,
  loading = false,
  error = null,
  onClose,
}: PaymentDetailsModalProps) {
  if (!open) {
    return null;
  }

  const amount = payment ? Number.parseFloat(payment.amount) : NaN;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-details-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2
            id="payment-details-title"
            className="text-lg font-semibold dark:text-white"
          >
            Payment details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close payment details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#003A96]" />
              <p className="text-sm">Loading payment…</p>
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          ) : null}

          {!loading && !error && payment ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Plan</dt>
                <dd className="font-medium dark:text-white">
                  {payment.plan_name ?? `Plan #${payment.plan_id}`}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Billing cycle</dt>
                <dd className="font-medium dark:text-white">
                  {billingCycleShortLabel(payment.billing_cycle as BillingCycle)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Payment type</dt>
                <dd className="font-medium dark:text-white">
                  {payment.payment_type === 'recurring'
                    ? 'Recurring'
                    : payment.payment_type === 'retry'
                      ? 'Retry'
                      : 'One-Time'}
                </dd>
              </div>
              {payment.retry_of_payment_id ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 dark:text-gray-400">Retry of</dt>
                  <dd className="font-medium dark:text-white">
                    #{payment.retry_of_payment_id}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Amount</dt>
                <dd className="font-medium dark:text-white">
                  {Number.isFinite(amount)
                    ? formatPricingAmount(amount, payment.currency)
                    : payment.amount}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="font-medium capitalize dark:text-white">
                  {payment.status}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Payment method</dt>
                <dd className="font-medium capitalize dark:text-white">
                  {payment.payment_method ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Order ID</dt>
                <dd className="font-medium text-right break-all dark:text-white">
                  {payment.gateway_order_id ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Subscription ID</dt>
                <dd className="font-medium text-right break-all dark:text-white">
                  {payment.gateway_subscription_id ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Payment ID</dt>
                <dd className="font-medium text-right break-all dark:text-white">
                  {payment.gateway_payment_id ?? '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Transaction date</dt>
                <dd className="font-medium dark:text-white">
                  {formatDateTime(payment.transaction_date)}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

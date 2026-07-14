import { Eye } from 'lucide-react';
import { RetryPaymentButton } from '@/app/components/billing/RetryPaymentButton';
import type { PaymentHistoryItem } from '@/types/pricing.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface PaymentHistoryTableProps {
  items: PaymentHistoryItem[];
  loading?: boolean;
  error?: string | null;
  retryingPaymentId?: number | null;
  onViewDetails: (paymentId: number) => void;
  onRetryPayment?: (paymentId: number) => void;
}

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function statusClass(status: string): string {
  const value = status.toLowerCase();
  if (value === 'success') {
    return 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300';
  }
  if (value === 'pending') {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300';
  }
  if (value === 'failed' || value === 'cancelled') {
    return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300';
  }
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

function paymentTypeLabel(paymentType: string | null | undefined): string {
  const value = (paymentType ?? '').toLowerCase();
  if (value === 'recurring') {
    return 'Recurring';
  }
  if (value === 'retry') {
    return 'Retry';
  }
  return 'One-Time';
}

export function PaymentHistoryTable({
  items,
  loading = false,
  error = null,
  retryingPaymentId = null,
  onViewDetails,
  onRetryPayment,
}: PaymentHistoryTableProps) {
  if (loading && items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 animate-pulse h-48" />
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
        No payments yet. Successful plan purchases will appear here.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-950/50 text-left text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Billing cycle</th>
              <th className="px-4 py-3 font-medium">Payment type</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Payment method</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const amount = Number.parseFloat(item.amount);
              const canRetry =
                item.status.toLowerCase() === 'failed' && Boolean(onRetryPayment);
              return (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="px-4 py-3 font-medium dark:text-white">
                    {item.plan_name ?? `Plan #${item.plan_id}`}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {billingCycleShortLabel(item.billing_cycle as BillingCycle)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${
                        item.payment_type === 'recurring'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                          : item.payment_type === 'retry'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {paymentTypeLabel(item.payment_type)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {Number.isFinite(amount)
                      ? formatPricingAmount(amount, item.currency)
                      : item.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${statusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 capitalize">
                    {item.payment_method ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {formatDate(item.transaction_date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      {canRetry ? (
                        <RetryPaymentButton
                          loading={retryingPaymentId === item.id}
                          onClick={() => onRetryPayment?.(item.id)}
                        />
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onViewDetails(item.id)}
                        className="inline-flex items-center gap-1.5 text-[#003A96] dark:text-blue-300 font-semibold hover:underline"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

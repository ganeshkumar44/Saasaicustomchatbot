import type { SubscriptionStatusData } from '@/types/pricing.types';
import { billingCycleShortLabel } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface SubscriptionStatusCardProps {
  status: SubscriptionStatusData | null;
  loading?: boolean;
}

function formatDate(value: string | null): string {
  if (!value) {
    return '—';
  }
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

export function SubscriptionStatusCard({
  status,
  loading = false,
}: SubscriptionStatusCardProps) {
  if (loading && !status) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 animate-pulse h-48" />
    );
  }

  if (!status) {
    return null;
  }

  const cycle = status.billing_cycle
    ? billingCycleShortLabel(status.billing_cycle as BillingCycle)
    : '—';

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Plan</p>
          <h3 className="text-xl font-bold dark:text-white mt-0.5">
            {status.display_name}
          </h3>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-md capitalize ${
            status.is_expired
              ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
              : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'
          }`}
        >
          {status.subscription_status}
        </span>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Auto Renew</dt>
          <dd
            className={`font-medium mt-0.5 ${
              status.is_auto_renew
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {status.is_auto_renew ? 'Enabled' : 'Disabled'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Billing cycle</dt>
          <dd className="font-medium dark:text-white mt-0.5">{cycle}</dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Next billing</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatDate(status.next_billing_date ?? status.subscription_end)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Days remaining</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {status.remaining_days != null
              ? `${status.remaining_days} day${status.remaining_days === 1 ? '' : 's'}`
              : '—'}
          </dd>
        </div>
      </dl>
    </div>
  );
}

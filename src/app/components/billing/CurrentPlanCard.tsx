import { CurrentPlanBadge } from '@/app/components/billing/CurrentPlanBadge';
import type { CurrentPricingPlan } from '@/types/pricing.types';
import {
  billingCycleShortLabel,
  formatPricingAmount,
} from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface CurrentPlanCardProps {
  plan: CurrentPricingPlan | null;
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

function formatLimit(limit: number | null, unlimited: boolean): string {
  if (unlimited || limit === null) {
    return 'Unlimited';
  }
  return limit.toLocaleString('en-IN');
}

export function CurrentPlanCard({ plan, loading = false }: CurrentPlanCardProps) {
  if (loading && !plan) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 animate-pulse h-64" />
    );
  }

  if (!plan) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current plan details are not available.
        </p>
      </div>
    );
  }

  const cycle = (plan.billing_cycle ?? 'monthly') as BillingCycle;
  const billingAmount = plan.current_billing ?? plan.current_price ?? plan.monthly_price;

  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current plan</p>
          <h2 className="text-2xl font-bold dark:text-white mt-1">{plan.display_name}</h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CurrentPlanBadge />
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md capitalize ${
              plan.is_expired
                ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300'
            }`}
          >
            {plan.subscription_status}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Billing cycle</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {billingCycleShortLabel(cycle)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Current billing</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {billingAmount != null
              ? formatPricingAmount(billingAmount, plan.currency ?? 'INR')
              : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Subscription start</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatDate(plan.subscription_start)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Subscription end</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatDate(plan.subscription_end)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Next billing date</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatDate(plan.next_billing_date)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Remaining days</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {plan.remaining_days ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Auto renew</dt>
          <dd
            className={`font-medium mt-0.5 ${
              plan.is_auto_renew
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {plan.is_auto_renew ? 'Enabled' : 'Disabled'}
          </dd>
        </div>
        {plan.razorpay_subscription_id ? (
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Subscription ID</dt>
            <dd className="font-medium dark:text-white mt-0.5 break-all">
              {plan.razorpay_subscription_id}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Chatbots</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {plan.created_chatbots_count} / {plan.chatbot_limit}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Website messages</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatLimit(plan.website_message_limit, plan.website_message_unlimited)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Playground messages</dt>
          <dd className="font-medium dark:text-white mt-0.5">
            {formatLimit(
              plan.playground_message_limit,
              plan.playground_message_unlimited,
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

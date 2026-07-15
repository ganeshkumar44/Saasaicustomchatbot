import { Check, Loader2 } from 'lucide-react';
import type { BillingCycle, PricingPlan } from '@/types/pricing.types';
import { CurrentPlanBadge } from '@/app/components/billing/CurrentPlanBadge';
import {
  billingCycleLabel,
  formatPricingAmount,
  getPlanDiscountPercentageForCycle,
  getPlanPriceForCycle,
  getPlanSavingForCycle,
  planCtaLabel,
} from '@/utils/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  cycle: BillingCycle;
  onSelect: (plan: PricingPlan) => void;
  disabled?: boolean;
}

export function PricingCard({
  plan,
  cycle,
  onSelect,
  disabled = false,
}: PricingCardProps) {
  const price = getPlanPriceForCycle(plan, cycle);
  const saving = getPlanSavingForCycle(plan, cycle);
  const discountPct = getPlanDiscountPercentageForCycle(plan, cycle);
  const isCurrent = plan.current_plan;
  const cta = planCtaLabel(plan);
  const showYearlyBestValue = cycle === 'yearly' && discountPct > 0;

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-6 bg-white dark:bg-gray-900 transition-shadow ${
        plan.recommended
          ? 'border-[#003A96] shadow-xl ring-1 ring-[#003A96]/30'
          : isCurrent
            ? 'border-blue-400 shadow-lg'
            : 'border-gray-200 dark:border-gray-800 hover:shadow-md'
      }`}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-[#003A96] text-white">
          Recommended
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-xl font-bold dark:text-white">{plan.display_name}</h3>
          {plan.description ? (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {plan.description}
            </p>
          ) : null}
        </div>
        {isCurrent ? (
          <div className="shrink-0">
            <CurrentPlanBadge />
          </div>
        ) : null}
      </div>

      <div className="mb-5 space-y-2">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-3xl font-bold dark:text-white">
            {formatPricingAmount(price, plan.currency)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {cycle === 'monthly' ? '/ Month' : `/ ${billingCycleLabel(cycle)}`}
          </span>
        </div>

        {saving > 0 ? (
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
            Save {formatPricingAmount(saving, plan.currency)}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2 min-h-[1.5rem]">
          {showYearlyBestValue ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              🔥 Best Value
            </span>
          ) : null}
          {discountPct > 0 ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300">
              Save {discountPct}%
            </span>
          ) : null}
        </div>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((feature) => (
          <li
            key={`${plan.plan_id}-${feature}`}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-600 dark:text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={disabled || isCurrent}
        onClick={() => onSelect(plan)}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          plan.recommended && !isCurrent
            ? 'bg-[#003A96] text-white hover:bg-[#002d75]'
            : isCurrent
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90'
        }`}
      >
        {disabled && !isCurrent ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing…
          </span>
        ) : (
          cta
        )}
      </button>
    </article>
  );
}

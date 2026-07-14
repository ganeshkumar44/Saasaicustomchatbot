import type { BillingCycle } from '@/types/pricing.types';
import { billingCycleShortLabel } from '@/utils/pricing';

interface BillingToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  sixMonthDiscountPercentage?: number;
  yearlyDiscountPercentage?: number;
}

const CYCLES: BillingCycle[] = ['monthly', 'six_month', 'yearly'];

export function BillingToggle({
  value,
  onChange,
  sixMonthDiscountPercentage = 0,
  yearlyDiscountPercentage = 0,
}: BillingToggleProps) {
  return (
    <div
      className="inline-flex flex-wrap p-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80"
      role="tablist"
      aria-label="Billing cycle"
    >
      {CYCLES.map((cycle) => {
        const active = value === cycle;
        const discount =
          cycle === 'six_month'
            ? sixMonthDiscountPercentage
            : cycle === 'yearly'
              ? yearlyDiscountPercentage
              : 0;

        return (
          <button
            key={cycle}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(cycle)}
            className={`px-3 sm:px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              active
                ? 'bg-white dark:bg-gray-900 text-[#003A96] dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {billingCycleShortLabel(cycle)}
              {cycle === 'yearly' && discount > 0 ? (
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Best Value
                </span>
              ) : null}
              {discount > 0 ? (
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400">
                  -{discount}%
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

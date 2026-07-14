import type { CheckoutPreview } from '@/types/pricing.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface PriceSummaryProps {
  checkout: CheckoutPreview;
  autoRenewEnabled?: boolean;
}

export function PriceSummary({
  checkout,
  autoRenewEnabled = false,
}: PriceSummaryProps) {
  const cycle = checkout.billing_cycle as BillingCycle;
  const discountPct = checkout.discount_percentage ?? 0;
  const saving = checkout.saving ?? checkout.discount ?? 0;
  const listPrice = checkout.list_price ?? 0;

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Plan</span>
        <span className="font-medium dark:text-white">{checkout.display_name}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Billing cycle</span>
        <span className="font-medium dark:text-white">
          {billingCycleShortLabel(cycle)}
        </span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Auto Renew</span>
        <span
          className={`font-medium ${
            autoRenewEnabled
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {autoRenewEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
      {listPrice > checkout.subtotal ? (
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">List price</span>
          <span className="font-medium text-gray-500 line-through dark:text-gray-400">
            {formatPricingAmount(listPrice, checkout.currency)}
          </span>
        </div>
      ) : null}
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Price</span>
        <span className="font-medium dark:text-white">
          {formatPricingAmount(checkout.price, checkout.currency)}
        </span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
        <span className="font-medium dark:text-white">
          {formatPricingAmount(checkout.subtotal, checkout.currency)}
        </span>
      </div>
      {saving > 0 ? (
        <div className="flex justify-between gap-4">
          <span className="text-gray-600 dark:text-gray-400">
            Discount
            {discountPct > 0 ? ` (${discountPct}%)` : ''}
          </span>
          <span className="font-medium text-green-600 dark:text-green-400">
            -{formatPricingAmount(saving, checkout.currency)}
          </span>
        </div>
      ) : null}
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">
          GST ({checkout.gst_percentage}%)
        </span>
        <span className="font-medium dark:text-white">
          {formatPricingAmount(checkout.gst_amount, checkout.currency)}
        </span>
      </div>
      <div className="flex justify-between gap-4">
        <span className="text-gray-600 dark:text-gray-400">Currency</span>
        <span className="font-medium dark:text-white">{checkout.currency}</span>
      </div>
      <div className="flex justify-between gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="font-semibold dark:text-white">Grand Total</span>
        <span className="font-bold text-[#003A96] dark:text-blue-300 text-base">
          {formatPricingAmount(checkout.total_amount, checkout.currency)}
        </span>
      </div>
    </div>
  );
}

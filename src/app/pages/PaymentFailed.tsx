import { useMemo } from 'react';
import { PaymentStatusCard } from '@/app/components/billing/PaymentStatusCard';

const STORAGE_KEY = 'billing_payment_failed';

interface PaymentFailedPayload {
  reason?: string;
  code?: string | null;
  order_id?: string;
  subscription_id?: string;
  plan_name?: string;
}

function readPayload(): PaymentFailedPayload | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as PaymentFailedPayload;
  } catch {
    return null;
  }
}

function isRecurringUnsupported(reason: string | undefined): boolean {
  if (!reason) {
    return false;
  }
  const normalized = reason.toLowerCase();
  return (
    normalized.includes('does not support recurring') ||
    normalized.includes('recurring payments')
  );
}

export function PaymentFailed() {
  const payload = useMemo(() => readPayload(), []);
  const recurringBlocked = isRecurringUnsupported(payload?.reason);

  const details = [
    payload?.plan_name ? { label: 'Plan', value: payload.plan_name } : null,
    payload?.order_id ? { label: 'Order ID', value: payload.order_id } : null,
    payload?.subscription_id
      ? { label: 'Subscription ID', value: payload.subscription_id }
      : null,
    payload?.code ? { label: 'Error code', value: payload.code } : null,
    payload?.reason ? { label: 'Reason', value: payload.reason } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  const description = recurringBlocked
    ? 'Auto Renew failed because card recurring is not available on this Razorpay account. Retry with UPI while Auto Renew is on, or turn Auto Renew off and pay once with a card.'
    : payload?.reason
      ? payload.reason
      : 'Your payment was cancelled or could not be completed. No charges were applied to your plan.';

  return (
    <div className="p-6 min-h-[60vh] flex items-center justify-center">
      <PaymentStatusCard
        variant="failed"
        title="Payment Failed"
        description={description}
        details={details}
        primaryHref="/dashboard/billing"
        primaryLabel="Try Again"
        secondaryHref="/dashboard"
        secondaryLabel="Go to Dashboard"
      />
    </div>
  );
}

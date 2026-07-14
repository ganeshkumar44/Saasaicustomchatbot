import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PaymentLoader } from '@/app/components/billing/PaymentLoader';
import { PaymentStatusCard } from '@/app/components/billing/PaymentStatusCard';
import { usePricing } from '@/hooks/usePricing';
import { useUserPlan } from '@/hooks/useUserPlan';
import { fetchCurrentUserProfile } from '@/store/authThunk';
import { fetchUserBillingPlans } from '@/store/billingThunk';
import { useAppDispatch } from '@/store/hooks';
import type { BillingCycle, VerifyPaymentData } from '@/types/pricing.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';

const STORAGE_KEY = 'billing_payment_success';
const FAILED_STORAGE_KEY = 'billing_payment_failed';

interface StoredRazorpayPayload {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature?: string;
  auto_renew?: boolean;
}

function readStoredPayload(): StoredRazorpayPayload | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as StoredRazorpayPayload;
  } catch {
    return null;
  }
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

export function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { verifyPayment, verifyLoading, verifiedPayment, verifyError, refresh } =
    usePricing();
  const { refreshUserPlan } = useUserPlan();
  const [localError, setLocalError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyPaymentData | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;

    const run = async () => {
      const stored = readStoredPayload();
      if (!stored?.razorpay_payment_id || !stored.razorpay_signature) {
        setLocalError(
          'Missing payment details. Please return to billing and try again.',
        );
        return;
      }

      const hasOrder = Boolean(stored.razorpay_order_id);
      const hasSubscription = Boolean(stored.razorpay_subscription_id);
      if (!hasOrder && !hasSubscription) {
        setLocalError(
          'Missing order or subscription details. Please return to billing and try again.',
        );
        return;
      }

      const data = await verifyPayment({
        razorpay_payment_id: stored.razorpay_payment_id,
        razorpay_signature: stored.razorpay_signature,
        ...(hasSubscription
          ? { razorpay_subscription_id: stored.razorpay_subscription_id }
          : { razorpay_order_id: stored.razorpay_order_id }),
      });

      if (!data) {
        sessionStorage.setItem(
          FAILED_STORAGE_KEY,
          JSON.stringify({
            reason: 'Payment verification failed.',
            order_id: stored.razorpay_order_id ?? null,
            subscription_id: stored.razorpay_subscription_id ?? null,
          }),
        );
        sessionStorage.removeItem(STORAGE_KEY);
        navigate('/dashboard/billing/payment-failed', { replace: true });
        return;
      }

      setResult(data);
      sessionStorage.removeItem(STORAGE_KEY);
      refresh();
      void refreshUserPlan();
      void dispatch(fetchCurrentUserProfile());
      void dispatch(fetchUserBillingPlans());
    };

    void run();
  }, [dispatch, navigate, refresh, refreshUserPlan, verifyPayment]);

  if (verifyLoading || (!result && !localError && !verifyError)) {
    return (
      <div className="p-6 min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <PaymentLoader label="Verifying payment…" />
        </div>
      </div>
    );
  }

  if (localError || verifyError) {
    return (
      <div className="p-6 min-h-[60vh] flex items-center justify-center">
        <PaymentStatusCard
          variant="failed"
          title="Verification Failed"
          description={localError ?? verifyError ?? 'Payment verification failed.'}
          primaryHref="/dashboard/billing"
          primaryLabel="Back to Billing"
        />
      </div>
    );
  }

  const payment = result ?? verifiedPayment;
  if (!payment) {
    return null;
  }

  const details = [
    { label: 'Current plan', value: payment.display_name },
    {
      label: 'Billing cycle',
      value: billingCycleShortLabel(payment.billing_cycle as BillingCycle),
    },
    {
      label: 'Payment type',
      value:
        payment.payment_type === 'recurring' || payment.is_auto_renew
          ? 'Recurring'
          : 'One-Time',
    },
    {
      label: 'Auto Renew',
      value: payment.is_auto_renew ? 'Enabled' : 'Disabled',
    },
    {
      label: 'Amount paid',
      value: formatPricingAmount(payment.amount, payment.currency),
    },
    {
      label: 'Transaction ID',
      value: payment.gateway_payment_id ?? String(payment.payment_id),
    },
    {
      label: 'Next billing date',
      value: formatDate(payment.next_billing_date),
    },
  ];

  return (
    <div className="p-6 min-h-[60vh] flex items-center justify-center">
      <PaymentStatusCard
        variant="success"
        title="Payment Successful"
        description={
          payment.already_verified
            ? 'This payment was already verified. Your subscription is active.'
            : payment.is_auto_renew
              ? 'Your AutoPay subscription is active. Recurring charges will renew automatically.'
              : 'Your payment was verified and your plan is now active.'
        }
        details={details}
        primaryHref="/dashboard"
        primaryLabel="Go To Dashboard"
        secondaryHref="/dashboard/billing"
        secondaryLabel="View Billing"
      />
    </div>
  );
}

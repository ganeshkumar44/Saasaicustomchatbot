import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { BillingToggle } from '@/app/components/billing/BillingToggle';
import { CheckoutModal } from '@/app/components/billing/CheckoutModal';
import { PlanComparisonTable } from '@/app/components/billing/PlanComparisonTable';
import { PricingCard } from '@/app/components/billing/PricingCard';
import { usePricing } from '@/hooks/usePricing';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { selectUserDetails } from '@/store/accountSettingsSelectors';
import type { CreateOrderData, CreateSubscriptionData, PricingPlan } from '@/types/pricing.types';
import { billingCycleShortLabel, catalogDiscountPercentages } from '@/utils/pricing';
import { openRazorpayCheckout } from '@/utils/openRazorpayCheckout';

const PAYMENT_SUCCESS_STORAGE_KEY = 'billing_payment_success';
const PAYMENT_FAILED_STORAGE_KEY = 'billing_payment_failed';

export function BillingPricingSection() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userDetails = useAppSelector(selectUserDetails);
  const {
    plans,
    comparison,
    checkout,
    selectedCycle,
    autoRenewEnabled,
    loading,
    loadingPlans,
    checkoutLoading,
    orderLoading,
    subscriptionLoading,
    error,
    checkoutError,
    orderError,
    subscriptionError,
    changeCycle,
    setAutoRenew,
    openCheckout,
    createOrder,
    createSubscription,
    closeCheckout,
    refresh,
  } = usePricing();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectingPlanId, setSelectingPlanId] = useState<number | null>(null);
  const [paying, setPaying] = useState(false);
  const catalogDiscounts = catalogDiscountPercentages(plans);
  const checkoutBusy = orderLoading || subscriptionLoading || paying;
  const checkoutFlowError = autoRenewEnabled ? subscriptionError : orderError;

  const prefillName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (plan.current_plan) {
      return;
    }

    setSelectingPlanId(plan.plan_id);
    setModalOpen(true);
    await openCheckout(plan.plan_id, selectedCycle);
    setSelectingPlanId(null);
  };

  const handleCloseModal = () => {
    if (checkoutBusy) {
      return;
    }
    setModalOpen(false);
    closeCheckout();
    setAutoRenew(false);
  };

  const storeSuccessAndNavigate = (
    payload: {
      razorpay_payment_id: string;
      razorpay_order_id?: string;
      razorpay_subscription_id?: string;
      razorpay_signature: string;
    },
    meta: {
      plan_name: string;
      billing_cycle: string;
      amount: number;
      currency: string;
      auto_renew: boolean;
    },
  ) => {
    sessionStorage.setItem(
      PAYMENT_SUCCESS_STORAGE_KEY,
      JSON.stringify({
        ...payload,
        ...meta,
      }),
    );
    setModalOpen(false);
    closeCheckout();
    setAutoRenew(false);
    navigate('/dashboard/billing/payment-success');
  };

  const storeFailureAndNavigate = (meta: {
    reason: string;
    code?: string | null;
    order_id?: string;
    subscription_id?: string;
    plan_name: string;
  }) => {
    sessionStorage.setItem(PAYMENT_FAILED_STORAGE_KEY, JSON.stringify(meta));
    setModalOpen(false);
    closeCheckout();
    setAutoRenew(false);
    navigate('/dashboard/billing/payment-failed');
  };

  const openCheckoutForOrder = async (order: CreateOrderData) => {
    await openRazorpayCheckout({
      order,
      prefill: {
        name: prefillName || undefined,
        email: user?.email ?? userDetails?.email,
        contact: userDetails?.mobile ?? undefined,
      },
      onSuccess: (payload) => {
        storeSuccessAndNavigate(payload, {
          plan_name: order.display_name,
          billing_cycle: String(order.billing_cycle),
          amount: order.total_amount,
          currency: order.currency,
          auto_renew: false,
        });
      },
      onFailure: (errorPayload) => {
        storeFailureAndNavigate({
          reason: errorPayload.description || errorPayload.reason || 'Payment failed',
          code: errorPayload.code ?? null,
          order_id: order.order_id,
          plan_name: order.display_name,
        });
      },
      onDismiss: () => {
        toast.info('Payment cancelled. You can try again anytime.');
      },
    });
  };

  const openCheckoutForSubscription = async (subscription: CreateSubscriptionData) => {
    await openRazorpayCheckout({
      subscription,
      prefill: {
        name: prefillName || undefined,
        email: user?.email ?? userDetails?.email,
        contact: userDetails?.mobile ?? undefined,
      },
      onSuccess: (payload) => {
        storeSuccessAndNavigate(payload, {
          plan_name: subscription.display_name,
          billing_cycle: String(subscription.billing_cycle),
          amount: subscription.total_amount,
          currency: subscription.currency,
          auto_renew: true,
        });
      },
      onFailure: (errorPayload) => {
        storeFailureAndNavigate({
          reason: errorPayload.description || errorPayload.reason || 'Payment failed',
          code: errorPayload.code ?? null,
          subscription_id: subscription.subscription_id,
          plan_name: subscription.display_name,
        });
      },
      onDismiss: () => {
        toast.info('Subscription checkout cancelled. You can try again anytime.');
      },
    });
  };

  const handleContinuePayment = async () => {
    if (!checkout || checkoutBusy) {
      return;
    }

    setPaying(true);
    try {
      if (autoRenewEnabled) {
        const subscription = await createSubscription(checkout.plan_id, selectedCycle);
        if (!subscription) {
          toast.error(subscriptionError ?? 'Unable to create subscription.');
          return;
        }
        await openCheckoutForSubscription(subscription);
        return;
      }

      const order = await createOrder(checkout.plan_id, selectedCycle);
      if (!order) {
        toast.error(orderError ?? 'Unable to create payment order.');
        return;
      }
      await openCheckoutForOrder(order);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to open Razorpay Checkout.';
      toast.error(message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Plans & Pricing</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Choose a plan and billing cycle. Optionally enable Auto Renew at checkout.
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <BillingToggle
            value={selectedCycle}
            onChange={changeCycle}
            sixMonthDiscountPercentage={catalogDiscounts.sixMonth}
            yearlyDiscountPercentage={catalogDiscounts.yearly}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {billingCycleShortLabel(selectedCycle).toLowerCase()} prices
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            type="button"
            onClick={refresh}
            className="text-sm font-semibold text-red-800 dark:text-red-200 underline"
          >
            Try again
          </button>
        </div>
      ) : null}

      {loadingPlans && plans.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((key) => (
            <div
              key={key}
              className="h-80 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse"
            />
          ))}
        </div>
      ) : null}

      {!loadingPlans && plans.length === 0 && !error ? (
        <div className="p-12 flex flex-col items-center text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <CreditCard className="w-10 h-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold dark:text-white mb-1">
            No plans available
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Subscription plans are not available right now.
          </p>
        </div>
      ) : null}

      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <PricingCard
              key={plan.plan_id}
              plan={plan}
              cycle={selectedCycle}
              onSelect={(selected) => void handleSelectPlan(selected)}
              disabled={checkoutLoading && selectingPlanId === plan.plan_id}
            />
          ))}
        </div>
      ) : null}

      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold dark:text-white">Compare plans</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Side-by-side limits and features for Free, Starter, Pro, and Enterprise.
          </p>
        </div>
        <PlanComparisonTable
          comparison={comparison}
          loading={loading && !comparison}
        />
      </section>

      <CheckoutModal
        open={modalOpen}
        checkout={checkout}
        loading={checkoutLoading}
        error={checkoutError}
        orderLoading={checkoutBusy}
        orderError={checkoutFlowError}
        autoRenewEnabled={autoRenewEnabled}
        onAutoRenewChange={setAutoRenew}
        onClose={handleCloseModal}
        onContinue={() => void handleContinuePayment()}
      />
    </div>
  );
}

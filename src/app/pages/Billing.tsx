import { useState } from 'react';
import {
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { BillingAlert } from '@/app/components/billing/BillingAlert';
import { InvoiceCard } from '@/app/components/billing/InvoiceCard';
import { BillingPricingSection } from '@/app/components/billing/BillingPricingSection';
import { CancelSubscriptionModal } from '@/app/components/billing/CancelSubscriptionModal';
import { CurrentPlanCard } from '@/app/components/billing/CurrentPlanCard';
import { PaymentDetailsModal } from '@/app/components/billing/PaymentDetailsModal';
import { PaymentHistoryTable } from '@/app/components/billing/PaymentHistoryTable';
import { RenewalCard } from '@/app/components/billing/RenewalCard';
import { SubscriptionStatusCard } from '@/app/components/billing/SubscriptionStatusCard';
import { SkeletonChart } from '@/components/Skeleton/SkeletonChart';
import { SkeletonStatistic } from '@/components/Skeleton/SkeletonStatistic';
import { useBillingPlans } from '@/hooks/useBillingPlans';
import { useInvoices } from '@/hooks/useInvoices';
import { usePricing } from '@/hooks/usePricing';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/authSelectors';
import { selectUserDetails } from '@/store/accountSettingsSelectors';
import type { CreateSubscriptionData } from '@/types/pricing.types';
import {
  formatBillingAmount,
  formatBillingCycleLabel,
  formatNextBillingDate,
  formatPlanStatusLabel,
} from '@/utils/billing';
import { openRazorpayCheckout } from '@/utils/openRazorpayCheckout';

const SHOW_CONVERSATIONS_USED = false;
const SHOW_USAGE_OVER_TIME = false;
const PAYMENT_SUCCESS_STORAGE_KEY = 'billing_payment_success';
const PAYMENT_FAILED_STORAGE_KEY = 'billing_payment_failed';

const usageData = [
  { id: 'jul', month: 'Jul', cost: 45 },
  { id: 'aug', month: 'Aug', cost: 52 },
  { id: 'sep', month: 'Sep', cost: 48 },
  { id: 'oct', month: 'Oct', cost: 65 },
  { id: 'nov', month: 'Nov', cost: 78 },
  { id: 'dec', month: 'Dec', cost: 85 },
];

function formatEndDate(value: string | null | undefined): string {
  if (!value) {
    return 'the end of your billing period';
  }
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function Billing() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userDetails = useAppSelector(selectUserDetails);
  const { billingData, loading, error } = useBillingPlans();
  const {
    currentPlan,
    loading: pricingLoading,
    paymentHistory,
    paymentHistoryLoading,
    paymentHistoryError,
    paymentDetail,
    paymentDetailLoading,
    paymentDetailError,
    subscriptionStatus,
    subscriptionStatusLoading,
    cancelResult,
    autoRenewLoading,
    autoRenewError,
    cancelLoading,
    cancelError,
    retryLoading,
    retryError,
    loadPaymentDetail,
    clearDetail,
    disableAutoRenew,
    enableAutoRenew,
    cancelSubscription,
    retryFailedPayment,
    refresh,
  } = usePricing();
  const {
    latestInvoice,
    downloadLoading: invoiceDownloadLoading,
    download: downloadInvoicePdf,
  } = useInvoices();


  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [enableCheckoutBusy, setEnableCheckoutBusy] = useState(false);
  const [retryingPaymentId, setRetryingPaymentId] = useState<number | null>(null);

  const isPaidPlan =
    Boolean(currentPlan) &&
    (currentPlan?.plan_name ?? '').trim().toLowerCase() !== 'free';

  const canCancel =
    Boolean(subscriptionStatus?.can_cancel) ||
    Boolean(currentPlan?.is_auto_renew && currentPlan.razorpay_subscription_id);

  const planStatusLabel = formatPlanStatusLabel(billingData?.status);
  const currentBillingLabel = billingData
    ? formatBillingAmount(billingData.current_billing)
    : null;
  const nextBillingLabel = formatNextBillingDate(billingData?.next_billing_date);
  const billingCycleLabel = formatBillingCycleLabel(billingData?.billing_cycle);

  const subscriptionEndLabel = formatEndDate(
    cancelResult?.subscription_end ??
      subscriptionStatus?.subscription_end ??
      currentPlan?.subscription_end,
  );

  const prefillName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();

  const handleViewDetails = async (paymentId: number) => {
    setDetailsOpen(true);
    await loadPaymentDetail(paymentId);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    clearDetail();
  };

  const handleConfirmDisable = async () => {
    const result = await disableAutoRenew(currentPlan?.razorpay_subscription_id);
    if (!result) {
      toast.error(autoRenewError ?? 'Unable to disable Auto Renew.');
      return;
    }
    setConfirmDisableOpen(false);
    toast.success(
      'Auto Renew disabled. Your subscription will remain active until the current billing period ends.',
    );
    refresh();
  };

  const handleConfirmCancel = async () => {
    const result = await cancelSubscription(
      currentPlan?.razorpay_subscription_id ??
        subscriptionStatus?.razorpay_subscription_id,
    );
    if (!result) {
      toast.error(cancelError ?? 'Unable to cancel subscription.');
      return;
    }
    setCancelModalOpen(false);
    toast.success(
      'Auto Renew Disabled. Your current plan remains active until the billing period ends.',
    );
    refresh();
  };

  const handleRetryPayment = async (paymentId: number) => {
    if (retryLoading) {
      return;
    }
    setRetryingPaymentId(paymentId);
    try {
      const order = await retryFailedPayment(paymentId);
      if (!order) {
        toast.error(retryError ?? 'Unable to retry payment.');
        return;
      }

      await openRazorpayCheckout({
        order,
        prefill: {
          name: prefillName || undefined,
          email: user?.email ?? userDetails?.email,
          contact: userDetails?.mobile ?? undefined,
        },
        onSuccess: (payload) => {
          sessionStorage.setItem(
            PAYMENT_SUCCESS_STORAGE_KEY,
            JSON.stringify({
              ...payload,
              plan_name: order.display_name,
              billing_cycle: order.billing_cycle,
              amount: order.total_amount,
              currency: order.currency,
              auto_renew: false,
            }),
          );
          navigate('/dashboard/billing/payment-success');
        },
        onFailure: (errorPayload) => {
          sessionStorage.setItem(
            PAYMENT_FAILED_STORAGE_KEY,
            JSON.stringify({
              reason:
                errorPayload.description || errorPayload.reason || 'Payment failed',
              code: errorPayload.code ?? null,
              order_id: order.order_id,
              plan_name: order.display_name,
            }),
          );
          navigate('/dashboard/billing/payment-failed');
        },
        onDismiss: () => {
          toast.info('Retry payment cancelled.');
          refresh();
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to open Razorpay Checkout.';
      toast.error(message);
    } finally {
      setRetryingPaymentId(null);
    }
  };

  const handleEnableAutoRenew = async () => {
    if (enableCheckoutBusy || autoRenewLoading) {
      return;
    }

    setEnableCheckoutBusy(true);
    try {
      const result = await enableAutoRenew();
      if (!result) {
        toast.error(autoRenewError ?? 'Unable to enable Auto Renew.');
        return;
      }

      if (!result.requires_checkout) {
        toast.success('Auto Renew enabled successfully.');
        refresh();
        return;
      }

      if (!result.subscription_id || !result.key || result.plan_id == null) {
        toast.error('Subscription checkout details are incomplete.');
        return;
      }

      const subscription: CreateSubscriptionData = {
        subscription_id: result.subscription_id,
        key: result.key,
        customer_id: result.customer_id,
        plan_id: result.plan_id,
        plan_name: result.plan_name ?? currentPlan?.plan_name ?? '',
        display_name: result.display_name ?? currentPlan?.display_name ?? '',
        billing_cycle: result.billing_cycle ?? currentPlan?.billing_cycle ?? 'monthly',
        action: 'switch',
        currency: result.currency ?? currentPlan?.currency ?? 'INR',
        amount: result.amount ?? 0,
        total_amount: result.total_amount ?? 0,
        subtotal: result.total_amount ?? 0,
        discount: 0,
        gst_percentage: 0,
        gst_amount: 0,
        auto_renew: true,
      };

      await openRazorpayCheckout({
        subscription,
        prefill: {
          name: prefillName || undefined,
          email: user?.email ?? userDetails?.email,
          contact: userDetails?.mobile ?? undefined,
        },
        onSuccess: (payload) => {
          sessionStorage.setItem(
            PAYMENT_SUCCESS_STORAGE_KEY,
            JSON.stringify({
              ...payload,
              plan_name: subscription.display_name,
              billing_cycle: subscription.billing_cycle,
              amount: subscription.total_amount,
              currency: subscription.currency,
              auto_renew: true,
            }),
          );
          navigate('/dashboard/billing/payment-success');
        },
        onFailure: (errorPayload) => {
          sessionStorage.setItem(
            PAYMENT_FAILED_STORAGE_KEY,
            JSON.stringify({
              reason:
                errorPayload.description || errorPayload.reason || 'Payment failed',
              code: errorPayload.code ?? null,
              subscription_id: subscription.subscription_id,
              plan_name: subscription.display_name,
            }),
          );
          navigate('/dashboard/billing/payment-failed');
        },
        onDismiss: () => {
          toast.info('Auto Renew checkout cancelled.');
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to open Auto Renew checkout.';
      toast.error(message);
    } finally {
      setEnableCheckoutBusy(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Billing & Plans</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your subscription, compare plans, and view payment history
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {cancelResult ? (
        <BillingAlert
          variant="success"
          title="Auto Renew Disabled"
          description={`Your current plan remains active until ${formatEndDate(cancelResult.subscription_end)}.`}
        />
      ) : null}

      <CurrentPlanCard plan={currentPlan} loading={pricingLoading && !currentPlan} />

      <InvoiceCard
        invoice={latestInvoice}
        onDownload={() => {
          if (!latestInvoice) {
            return;
          }
          void downloadInvoicePdf(latestInvoice).then((ok) => {
            if (ok) {
              toast.success('Invoice downloaded.');
            } else {
              toast.error('Unable to download invoice.');
            }
          });
        }}
        downloadLoading={invoiceDownloadLoading}
      />

      <div className="flex justify-end">
        <Link
          to="/dashboard/billing/invoices"
          className="text-sm font-semibold text-[#003A96] dark:text-blue-300 hover:underline"
        >
          View all invoices
        </Link>
      </div>

      <SubscriptionStatusCard
        status={subscriptionStatus}
        loading={subscriptionStatusLoading && !subscriptionStatus}
      />

      {isPaidPlan && canCancel ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div>
            <h3 className="text-base font-semibold dark:text-white">
              Cancel Subscription
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Turns off Auto Renew only. You keep your current plan until{' '}
              {subscriptionEndLabel}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCancelModalOpen(true)}
            disabled={cancelLoading}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-semibold border border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30 disabled:opacity-50"
          >
            Cancel Subscription
          </button>
        </div>
      ) : null}

      {isPaidPlan ? (
        <RenewalCard
          isAutoRenew={Boolean(currentPlan?.is_auto_renew)}
          subscriptionId={currentPlan?.razorpay_subscription_id ?? null}
          loading={autoRenewLoading || enableCheckoutBusy || cancelLoading}
          onDisable={() => setConfirmDisableOpen(true)}
          onEnable={() => void handleEnableAutoRenew()}
          confirmOpen={confirmDisableOpen}
          onConfirmDisable={() => void handleConfirmDisable()}
          onCancelConfirm={() => setConfirmDisableOpen(false)}
        />
      ) : null}

      {loading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonStatistic count={SHOW_CONVERSATIONS_USED ? 3 : 2} />
          </div>
          {SHOW_USAGE_OVER_TIME && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <SkeletonChart height={250} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Bill</p>
                  {currentBillingLabel && (
                    <p className="text-2xl font-bold dark:text-white">{currentBillingLabel}</p>
                  )}
                </div>
              </div>
              {planStatusLabel && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Plan Status: {planStatusLabel}
                </p>
              )}
              {nextBillingLabel && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Next billing: {nextBillingLabel}
                </p>
              )}
            </div>

            {SHOW_CONVERSATIONS_USED && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversations Used</p>
                    <p className="text-2xl font-bold dark:text-white">6,543</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">65% of 10,000 limit</p>
              </div>
            )}

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Billing Cycle</p>
                  {billingCycleLabel && (
                    <p className="text-2xl font-bold dark:text-white">{billingCycleLabel}</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Auto renew: {currentPlan?.is_auto_renew ? 'On' : 'Off'}
              </p>
            </div>
          </div>

          {SHOW_USAGE_OVER_TIME && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <h2 className="text-lg font-semibold dark:text-white">Usage Over Time</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your monthly spending trend</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={usageData}>
                  <CartesianGrid key="usage-grid" strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis key="usage-x" dataKey="month" stroke="#9ca3af" />
                  <YAxis key="usage-y" stroke="#9ca3af" />
                  <Tooltip
                    key="usage-tooltip"
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value) => [`$${value}`, 'Cost']}
                  />
                  <Line
                    key="cost-line"
                    type="monotone"
                    dataKey="cost"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      <BillingPricingSection />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white">Payment History</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Newest transactions first. Failed payments can be retried.
          </p>
        </div>
        <PaymentHistoryTable
          items={paymentHistory}
          loading={paymentHistoryLoading}
          error={paymentHistoryError}
          retryingPaymentId={retryingPaymentId}
          onViewDetails={(paymentId) => void handleViewDetails(paymentId)}
          onRetryPayment={(paymentId) => void handleRetryPayment(paymentId)}
        />
      </section>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Payment Method</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium dark:text-white">Paid via Razorpay Checkout</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                UPI, cards, net banking, wallets, and EMI
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentDetailsModal
        open={detailsOpen}
        payment={paymentDetail}
        loading={paymentDetailLoading}
        error={paymentDetailError}
        onClose={handleCloseDetails}
      />

      <CancelSubscriptionModal
        open={cancelModalOpen}
        loading={cancelLoading}
        subscriptionEndLabel={subscriptionEndLabel}
        onConfirm={() => void handleConfirmCancel()}
        onCancel={() => setCancelModalOpen(false)}
      />
    </div>
  );
}

/** Old pricing URL redirects to the merged billing page. */
export function BillingPricingRedirect() {
  return <Navigate to="/dashboard/billing" replace />;
}

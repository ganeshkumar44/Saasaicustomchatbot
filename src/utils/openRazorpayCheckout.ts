import { loadRazorpay } from '@/utils/loadRazorpay';
import type {
  CreateOrderData,
  CreateSubscriptionData,
  RazorpayPaymentSuccessPayload,
} from '@/types/pricing.types';
import type { RazorpayFailureError, RazorpayOptions } from '@/types/razorpay.types';

export interface RazorpayPrefillInput {
  name?: string;
  email?: string;
  contact?: string;
}

export interface OpenRazorpayCheckoutParams {
  order?: CreateOrderData;
  subscription?: CreateSubscriptionData;
  prefill?: RazorpayPrefillInput;
  companyName?: string;
  themeColor?: string;
  onSuccess: (payload: RazorpayPaymentSuccessPayload) => void;
  onFailure: (error: RazorpayFailureError) => void;
  onDismiss: () => void;
}

/**
 * Open Razorpay Checkout for one-time order OR subscription AutoPay.
 */
export async function openRazorpayCheckout(
  params: OpenRazorpayCheckoutParams,
): Promise<void> {
  const Razorpay = await loadRazorpay();
  const { order, subscription, prefill, onSuccess, onFailure, onDismiss } = params;

  if (!order && !subscription) {
    throw new Error('Razorpay checkout requires an order or subscription payload.');
  }

  let dismissedByUser = true;

  const options: RazorpayOptions = {
    key: subscription?.key ?? order!.key,
    name: params.companyName ?? 'SaaS AI Chatbot',
    description: subscription
      ? `${subscription.display_name} · Auto Renew`
      : `${order!.display_name} · ${order!.billing_cycle}`,
    prefill: {
      name: prefill?.name,
      email: prefill?.email,
      contact: prefill?.contact,
    },
    theme: {
      color: params.themeColor ?? '#003A96',
    },
    notes: {
      plan_id: String(subscription?.plan_id ?? order!.plan_id),
      plan_name: subscription?.plan_name ?? order!.plan_name,
      billing_cycle: String(subscription?.billing_cycle ?? order!.billing_cycle),
      auto_renew: subscription ? 'true' : 'false',
    },
    handler: (response) => {
      dismissedByUser = false;
      onSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_subscription_id: response.razorpay_subscription_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    modal: {
      ondismiss: () => {
        if (dismissedByUser) {
          onDismiss();
        }
      },
    },
  };

  if (subscription) {
    options.subscription_id = subscription.subscription_id;
  } else if (order) {
    options.order_id = order.order_id;
    options.amount = order.amount;
    options.currency = order.currency;
  }

  const instance = new Razorpay(options);

  instance.on('payment.failed', (response) => {
    dismissedByUser = false;
    onFailure(response.error);
  });

  instance.open();
}

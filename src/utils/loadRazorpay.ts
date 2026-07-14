import type { RazorpayConstructor } from '@/types/razorpay.types';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const SCRIPT_ID = 'razorpay-checkout-script';

let loadPromise: Promise<RazorpayConstructor> | null = null;

/**
 * Dynamically load Razorpay Checkout.js once per session.
 * Does not include the script statically in index.html.
 */
export async function loadRazorpay(): Promise<RazorpayConstructor> {
  if (typeof window !== 'undefined' && window.Razorpay) {
    return window.Razorpay;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise<RazorpayConstructor>((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Razorpay Checkout can only be loaded in the browser.'));
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing && window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = existing instanceof HTMLScriptElement
      ? existing
      : document.createElement('script');

    script.id = SCRIPT_ID;
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      if (!window.Razorpay) {
        loadPromise = null;
        reject(new Error('Razorpay SDK loaded but window.Razorpay is missing.'));
        return;
      }
      resolve(window.Razorpay);
    };

    script.onerror = () => {
      loadPromise = null;
      script.remove();
      reject(new Error('Failed to load Razorpay Checkout. Check your network connection.'));
    };

    if (!existing) {
      document.body.appendChild(script);
    }
  });

  return loadPromise;
}

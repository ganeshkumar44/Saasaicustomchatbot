import { Link } from 'react-router';
import { ArrowLeft, Clock, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';

export function BillingWorkInProgress() {
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-r from-[#003A96] to-blue-600 px-6 py-10 sm:px-10 text-white text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <CreditCard className="w-8 h-8" />
            </div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5" />
              Work in Progress
            </p>
            <h1 className="mt-4 text-3xl font-bold">Billing &amp; Plans</h1>
            <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
              We are preparing a secure payment gateway integration. This page will be enabled
              soon so you can manage subscriptions, plans, and invoices directly from your
              dashboard.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10 space-y-6">
            <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    Payment gateway coming soon
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Real-time checkout, subscription upgrades, renewals, and invoice history
                    will be available once payment processing is live.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  What&apos;s coming
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Plan comparison and upgrades</li>
                  <li>Secure checkout and payments</li>
                  <li>Subscription management</li>
                  <li>Invoice and payment history</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Your account is safe
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Existing chatbots, analytics, and account settings continue to work as usual
                  while billing is being finalized.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#003A96] text-white hover:bg-blue-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <Link
                to="/dashboard/chatbots"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Go to Chatbots
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

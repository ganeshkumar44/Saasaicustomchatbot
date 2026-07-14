import { Eye } from 'lucide-react';
import { DownloadInvoiceButton } from '@/app/components/billing/DownloadInvoiceButton';
import { ResendInvoiceButton } from '@/app/components/billing/ResendInvoiceButton';
import type { InvoiceItem } from '@/types/invoice.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface InvoiceTableProps {
  items: InvoiceItem[];
  loading?: boolean;
  error?: string | null;
  downloadLoadingId?: number | null;
  resendLoadingId?: number | null;
  onView: (invoiceId: number) => void;
  onDownload: (invoice: InvoiceItem) => void;
  onResend: (invoiceId: number) => void;
}

function formatDate(value: string | null): string {
  if (!value) return '—';
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

export function InvoiceTable({
  items,
  loading = false,
  error = null,
  downloadLoadingId = null,
  resendLoadingId = null,
  onView,
  onDownload,
  onResend,
}: InvoiceTableProps) {
  if (loading && items.length === 0) {
    return <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 animate-pulse h-48" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
        No invoices yet. Successful payments will generate invoices automatically.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-950/50 text-left text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Invoice Number</th>
              <th className="px-4 py-3 font-medium">Invoice Date</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Billing Cycle</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">GST</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Payment Method</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium dark:text-white">{item.invoice_number}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {formatDate(item.invoice_date)}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {item.display_name ?? item.plan_name ?? `Plan #${item.plan_id}`}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {item.billing_cycle
                    ? billingCycleShortLabel(item.billing_cycle as BillingCycle)
                    : '—'}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {formatPricingAmount(Number(item.total_amount), item.currency)}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {formatPricingAmount(Number(item.gst_amount), item.currency)}
                </td>
                <td className="px-4 py-3 capitalize text-gray-700 dark:text-gray-300">
                  {item.invoice_status}
                </td>
                <td className="px-4 py-3 capitalize text-gray-700 dark:text-gray-300">
                  {item.payment_method ?? '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(item.id)}
                      className="inline-flex items-center gap-1 text-[#003A96] dark:text-blue-300 font-semibold hover:underline"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <DownloadInvoiceButton
                      loading={downloadLoadingId === item.id}
                      onClick={() => onDownload(item)}
                    />
                    <ResendInvoiceButton
                      loading={resendLoadingId === item.id}
                      onClick={() => onResend(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

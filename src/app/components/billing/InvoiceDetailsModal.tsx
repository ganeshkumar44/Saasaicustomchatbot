import { X } from 'lucide-react';
import type { InvoiceItem } from '@/types/invoice.types';
import { billingCycleShortLabel, formatPricingAmount } from '@/utils/pricing';
import type { BillingCycle } from '@/types/pricing.types';

interface InvoiceDetailsModalProps {
  open: boolean;
  invoice: InvoiceItem | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
}

function formatDate(value: string | null): string {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="font-medium text-right dark:text-white break-all">{value}</dd>
    </div>
  );
}

export function InvoiceDetailsModal({
  open,
  invoice,
  loading = false,
  error = null,
  onClose,
}: InvoiceDetailsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold dark:text-white">Invoice details</h2>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-5">
          {loading ? <p className="text-sm text-gray-500 text-center py-8">Loading…</p> : null}
          {!loading && error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          ) : null}
          {!loading && !error && invoice ? (
            <dl className="space-y-3">
              <Row label="Invoice Number" value={invoice.invoice_number} />
              <Row label="Customer Name" value={invoice.billing_name ?? '—'} />
              <Row label="Customer Email" value={invoice.billing_email ?? '—'} />
              <Row label="Plan" value={invoice.display_name ?? invoice.plan_name ?? `Plan #${invoice.plan_id}`} />
              <Row
                label="Billing Cycle"
                value={
                  invoice.billing_cycle
                    ? billingCycleShortLabel(invoice.billing_cycle as BillingCycle)
                    : '—'
                }
              />
              <Row
                label="Subtotal"
                value={formatPricingAmount(Number(invoice.subtotal), invoice.currency)}
              />
              <Row
                label="Discount"
                value={formatPricingAmount(Number(invoice.discount), invoice.currency)}
              />
              <Row
                label={`GST (${invoice.gst_percentage}%)`}
                value={formatPricingAmount(Number(invoice.gst_amount), invoice.currency)}
              />
              <Row
                label="Grand Total"
                value={formatPricingAmount(Number(invoice.total_amount), invoice.currency)}
              />
              <Row label="Payment Status" value={(invoice.payment_status ?? invoice.invoice_status).toUpperCase()} />
              <Row label="Payment Method" value={(invoice.payment_method ?? '—').toString()} />
              <Row label="Transaction Date" value={formatDate(invoice.invoice_date ?? invoice.created_at)} />
            </dl>
          ) : null}
        </div>
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <button type="button" onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

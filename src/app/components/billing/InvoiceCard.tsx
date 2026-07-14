import type { InvoiceItem } from '@/types/invoice.types';
import { formatPricingAmount } from '@/utils/pricing';

interface InvoiceCardProps {
  invoice: InvoiceItem | null;
  loading?: boolean;
  onDownload?: () => void;
  downloadLoading?: boolean;
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

export function InvoiceCard({
  invoice,
  loading = false,
  onDownload,
  downloadLoading = false,
}: InvoiceCardProps) {
  if (loading && !invoice) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 animate-pulse h-32" />
    );
  }

  if (!invoice) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <p className="text-sm text-gray-600 dark:text-gray-400">No invoices yet.</p>
      </div>
    );
  }

  const amount = Number.parseFloat(invoice.total_amount);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Latest Invoice</p>
          <h3 className="text-base font-semibold dark:text-white mt-0.5">
            {invoice.invoice_number}
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md capitalize bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300">
          {invoice.invoice_status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {invoice.display_name ?? invoice.plan_name ?? `Plan #${invoice.plan_id}`} ·{' '}
        {formatDate(invoice.invoice_date)} ·{' '}
        {Number.isFinite(amount)
          ? formatPricingAmount(amount, invoice.currency)
          : invoice.total_amount}
      </p>
      {onDownload ? (
        <button
          type="button"
          onClick={onDownload}
          disabled={downloadLoading}
          className="text-sm font-semibold text-[#003A96] dark:text-blue-300 hover:underline disabled:opacity-50"
        >
          {downloadLoading ? 'Downloading…' : 'Download Invoice'}
        </button>
      ) : null}
    </div>
  );
}

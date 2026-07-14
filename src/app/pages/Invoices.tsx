import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { InvoiceDetailsModal } from '@/app/components/billing/InvoiceDetailsModal';
import { InvoiceTable } from '@/app/components/billing/InvoiceTable';
import { useInvoices } from '@/hooks/useInvoices';
import type { InvoiceItem } from '@/types/invoice.types';

export function Invoices() {
  const {
    invoices,
    selectedInvoice,
    loading,
    detailLoading,
    downloadLoading,
    resendLoading,
    error,
    detailError,
    downloadError,
    resendError,
    resendSuccess,
    loadDetail,
    download,
    resend,
    clearDetail,
    clearFeedback,
  } = useInvoices();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [downloadLoadingId, setDownloadLoadingId] = useState<number | null>(null);
  const [resendLoadingId, setResendLoadingId] = useState<number | null>(null);

  const handleView = async (invoiceId: number) => {
    setDetailsOpen(true);
    await loadDetail(invoiceId);
  };

  const handleDownload = async (invoice: InvoiceItem) => {
    setDownloadLoadingId(invoice.id);
    const ok = await download(invoice);
    setDownloadLoadingId(null);
    if (!ok) {
      toast.error(downloadError ?? 'Unable to download invoice.');
      return;
    }
    toast.success('Invoice downloaded.');
  };

  const handleResend = async (invoiceId: number) => {
    clearFeedback();
    setResendLoadingId(invoiceId);
    const ok = await resend(invoiceId);
    setResendLoadingId(null);
    if (!ok) {
      toast.error(resendError ?? 'Unable to resend invoice.');
      return;
    }
    toast.success(resendSuccess ?? 'Invoice email sent successfully.');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View, download, and resend GST invoices for successful payments.
          </p>
        </div>
        <Link
          to="/dashboard/billing"
          className="text-sm font-semibold text-[#003A96] dark:text-blue-300 hover:underline"
        >
          Back to Billing
        </Link>
      </div>

      <InvoiceTable
        items={invoices}
        loading={loading || downloadLoading || resendLoading}
        error={error}
        downloadLoadingId={downloadLoadingId}
        resendLoadingId={resendLoadingId}
        onView={(id) => void handleView(id)}
        onDownload={(invoice) => void handleDownload(invoice)}
        onResend={(id) => void handleResend(id)}
      />

      <InvoiceDetailsModal
        open={detailsOpen}
        invoice={selectedInvoice}
        loading={detailLoading}
        error={detailError}
        onClose={() => {
          setDetailsOpen(false);
          clearDetail();
        }}
      />
    </div>
  );
}

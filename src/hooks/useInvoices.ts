import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearInvoiceDetail,
  clearInvoiceFeedback,
} from '@/store/invoiceSlice';
import {
  selectInvoiceDetailError,
  selectInvoiceDetailLoading,
  selectInvoiceDownloadError,
  selectInvoiceDownloadLoading,
  selectInvoiceError,
  selectInvoiceLoading,
  selectInvoiceResendError,
  selectInvoiceResendLoading,
  selectInvoiceResendSuccess,
  selectInvoices,
  selectLatestInvoice,
  selectSelectedInvoice,
} from '@/store/invoiceSelectors';
import {
  downloadInvoice,
  fetchInvoiceDetail,
  fetchInvoices,
  resendInvoice,
} from '@/store/invoiceThunk';
import type { InvoiceItem } from '@/types/invoice.types';

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}

export function useInvoices() {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const selectedInvoice = useAppSelector(selectSelectedInvoice);
  const latestInvoice = useAppSelector(selectLatestInvoice);
  const loading = useAppSelector(selectInvoiceLoading);
  const detailLoading = useAppSelector(selectInvoiceDetailLoading);
  const downloadLoading = useAppSelector(selectInvoiceDownloadLoading);
  const resendLoading = useAppSelector(selectInvoiceResendLoading);
  const error = useAppSelector(selectInvoiceError);
  const detailError = useAppSelector(selectInvoiceDetailError);
  const downloadError = useAppSelector(selectInvoiceDownloadError);
  const resendError = useAppSelector(selectInvoiceResendError);
  const resendSuccess = useAppSelector(selectInvoiceResendSuccess);

  useEffect(() => {
    void dispatch(fetchInvoices());
  }, [dispatch]);

  const refresh = useCallback(() => {
    void dispatch(fetchInvoices());
  }, [dispatch]);

  const loadDetail = useCallback(
    async (invoiceId: number): Promise<InvoiceItem | null> => {
      const result = await dispatch(fetchInvoiceDetail(invoiceId));
      if (fetchInvoiceDetail.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const download = useCallback(
    async (invoice: InvoiceItem): Promise<boolean> => {
      const result = await dispatch(
        downloadInvoice({
          invoiceId: invoice.id,
          invoiceNumber: invoice.invoice_number,
        }),
      );
      if (downloadInvoice.fulfilled.match(result)) {
        triggerBrowserDownload(
          result.payload.blob,
          `${invoice.invoice_number}.pdf`,
        );
        return true;
      }
      return false;
    },
    [dispatch],
  );

  const resend = useCallback(
    async (invoiceId: number): Promise<boolean> => {
      const result = await dispatch(resendInvoice({ invoice_id: invoiceId }));
      return resendInvoice.fulfilled.match(result);
    },
    [dispatch],
  );

  const clearDetail = useCallback(() => {
    dispatch(clearInvoiceDetail());
  }, [dispatch]);

  const clearFeedback = useCallback(() => {
    dispatch(clearInvoiceFeedback());
  }, [dispatch]);

  return {
    invoices,
    selectedInvoice,
    latestInvoice,
    loading,
    detailLoading,
    downloadLoading,
    resendLoading,
    error,
    detailError,
    downloadError,
    resendError,
    resendSuccess,
    refresh,
    loadDetail,
    download,
    resend,
    clearDetail,
    clearFeedback,
  };
}

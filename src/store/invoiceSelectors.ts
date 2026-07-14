import type { RootState } from '@/store';

export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectSelectedInvoice = (state: RootState) => state.invoice.selectedInvoice;
export const selectLatestInvoice = (state: RootState) => state.invoice.latestInvoice;
export const selectInvoiceLoading = (state: RootState) => state.invoice.loading;
export const selectInvoiceDetailLoading = (state: RootState) =>
  state.invoice.detailLoading;
export const selectInvoiceDownloadLoading = (state: RootState) =>
  state.invoice.downloadLoading;
export const selectInvoiceResendLoading = (state: RootState) =>
  state.invoice.resendLoading;
export const selectInvoiceError = (state: RootState) => state.invoice.error;
export const selectInvoiceDetailError = (state: RootState) => state.invoice.detailError;
export const selectInvoiceDownloadError = (state: RootState) =>
  state.invoice.downloadError;
export const selectInvoiceResendError = (state: RootState) => state.invoice.resendError;
export const selectInvoiceResendSuccess = (state: RootState) =>
  state.invoice.resendSuccess;

import { createSlice } from '@reduxjs/toolkit';
import {
  downloadInvoice,
  fetchInvoiceDetail,
  fetchInvoices,
  resendInvoice,
} from '@/store/invoiceThunk';
import type { InvoiceState } from '@/types/invoice.types';

const initialState: InvoiceState = {
  invoices: [],
  selectedInvoice: null,
  latestInvoice: null,
  loading: false,
  detailLoading: false,
  downloadLoading: false,
  resendLoading: false,
  error: null,
  detailError: null,
  downloadError: null,
  resendError: null,
  resendSuccess: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    clearInvoiceDetail: (state) => {
      state.selectedInvoice = null;
      state.detailError = null;
    },
    clearInvoiceFeedback: (state) => {
      state.resendError = null;
      state.resendSuccess = null;
      state.downloadError = null;
      state.error = null;
    },
    resetInvoiceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
        state.latestInvoice = action.payload[0] ?? null;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load invoices.';
      })
      .addCase(fetchInvoiceDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchInvoiceDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedInvoice = action.payload;
      })
      .addCase(fetchInvoiceDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.selectedInvoice = null;
        state.detailError = action.payload ?? 'Failed to load invoice.';
      })
      .addCase(resendInvoice.pending, (state) => {
        state.resendLoading = true;
        state.resendError = null;
        state.resendSuccess = null;
      })
      .addCase(resendInvoice.fulfilled, (state, action) => {
        state.resendLoading = false;
        state.resendSuccess =
          action.payload.message ?? 'Invoice email sent successfully.';
      })
      .addCase(resendInvoice.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendError = action.payload ?? 'Failed to resend invoice.';
      })
      .addCase(downloadInvoice.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadInvoice.fulfilled, (state) => {
        state.downloadLoading = false;
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload ?? 'Failed to download invoice.';
      });
  },
});

export const { clearInvoiceDetail, clearInvoiceFeedback, resetInvoiceState } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;

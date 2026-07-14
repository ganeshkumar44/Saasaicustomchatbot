import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  downloadInvoicePdf,
  getInvoiceById,
  getInvoices,
  resendInvoiceEmail,
} from '@/services/invoice.service';
import type { InvoiceItem, ResendInvoiceRequest } from '@/types/invoice.types';
import { getApiErrorMessage } from '@/utils/apiError';

export const fetchInvoices = createAsyncThunk<
  InvoiceItem[],
  void,
  { rejectValue: string }
>('invoice/fetchInvoices', async (_, { rejectWithValue }) => {
  try {
    const response = await getInvoices();
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const fetchInvoiceDetail = createAsyncThunk<
  InvoiceItem,
  number,
  { rejectValue: string }
>('invoice/fetchDetail', async (invoiceId, { rejectWithValue }) => {
  try {
    const response = await getInvoiceById(invoiceId);
    return response.data;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const resendInvoice = createAsyncThunk<
  { message: string | null; data: InvoiceItem | null },
  ResendInvoiceRequest,
  { rejectValue: string }
>('invoice/resend', async (payload, { rejectWithValue }) => {
  try {
    const response = await resendInvoiceEmail(payload);
    return { message: response.message, data: response.data };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const downloadInvoice = createAsyncThunk<
  { blob: Blob; invoiceId: number },
  { invoiceId: number; invoiceNumber: string },
  { rejectValue: string }
>('invoice/download', async ({ invoiceId }, { rejectWithValue }) => {
  try {
    const blob = await downloadInvoicePdf(invoiceId);
    return { blob, invoiceId };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

import { apiClient } from '@/api/axios';
import type {
  InvoiceDetailSuccessResponse,
  InvoicesSuccessResponse,
  ResendInvoiceRequest,
  ResendInvoiceSuccessResponse,
} from '@/types/invoice.types';

export async function getInvoices(): Promise<InvoicesSuccessResponse> {
  const response = await apiClient.get<InvoicesSuccessResponse>('/v1/billing/invoices');
  return response.data;
}

export async function getInvoiceById(
  invoiceId: number,
): Promise<InvoiceDetailSuccessResponse> {
  const response = await apiClient.get<InvoiceDetailSuccessResponse>(
    `/v1/billing/invoice/${invoiceId}`,
  );
  return response.data;
}

export async function resendInvoiceEmail(
  payload: ResendInvoiceRequest,
): Promise<ResendInvoiceSuccessResponse> {
  const response = await apiClient.post<ResendInvoiceSuccessResponse>(
    '/v1/billing/resend-invoice',
    payload,
  );
  return response.data;
}

export async function downloadInvoicePdf(invoiceId: number): Promise<Blob> {
  const response = await apiClient.get<Blob>(
    `/v1/billing/invoice/${invoiceId}/download`,
    { responseType: 'blob' },
  );
  return response.data;
}

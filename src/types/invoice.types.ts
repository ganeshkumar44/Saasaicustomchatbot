export interface InvoiceItem {
  id: number;
  invoice_number: string;
  invoice_date: string | null;
  payment_transaction_id: number | null;
  plan_id: number;
  plan_name: string | null;
  display_name: string | null;
  billing_cycle: string | null;
  subtotal: string;
  discount: string;
  gst_percentage: string;
  gst_amount: string;
  total_amount: string;
  currency: string;
  invoice_status: string;
  pdf_path: string | null;
  billing_name: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  billing_address: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_country: string | null;
  billing_pincode: string | null;
  gst_number: string | null;
  company_name: string | null;
  payment_method: string | null;
  payment_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoicesSuccessResponse {
  success: true;
  message: string | null;
  data: InvoiceItem[];
}

export interface InvoiceDetailSuccessResponse {
  success: true;
  message: string | null;
  data: InvoiceItem;
}

export interface ResendInvoiceRequest {
  invoice_id: number;
}

export interface ResendInvoiceSuccessResponse {
  success: true;
  message: string | null;
  data: InvoiceItem | null;
}

export interface InvoiceState {
  invoices: InvoiceItem[];
  selectedInvoice: InvoiceItem | null;
  latestInvoice: InvoiceItem | null;
  loading: boolean;
  detailLoading: boolean;
  downloadLoading: boolean;
  resendLoading: boolean;
  error: string | null;
  detailError: string | null;
  downloadError: string | null;
  resendError: string | null;
  resendSuccess: string | null;
}

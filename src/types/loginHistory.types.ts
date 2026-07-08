export type LoginStatus = 'success' | 'failed';

export type LoginHistoryRoleFilter = 'all' | 'admin' | 'user' | 'superadmin';

export type LoginHistoryStatusFilter = 'all' | 'success' | 'failed';

export interface UserLoginHistoryItem {
  id: number;
  login_at: string;
  logout_at: string | null;
  browser: string | null;
  operating_system: string | null;
  device_type: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  login_status: LoginStatus;
  is_current_session: boolean;
}

export interface UserLoginHistoryResponse {
  success: true;
  message: string;
  data: UserLoginHistoryItem[];
}

export interface ManageLoginHistoryItem {
  id: number;
  user_id: number | null;
  user_name: string | null;
  email: string | null;
  role: string | null;
  login_at: string;
  logout_at: string | null;
  browser: string | null;
  operating_system: string | null;
  device_type: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  login_status: LoginStatus;
  is_current_session: boolean;
}

export interface ManageLoginHistoryResponse {
  success: true;
  message: string;
  page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  data: ManageLoginHistoryItem[];
}

export interface FetchManageLoginHistoryParams {
  page: number;
  perPage: number;
  search?: string;
  role?: string;
  loginStatus?: LoginStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface LoginHistoryPagination {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface UserLoginHistoryState {
  items: UserLoginHistoryItem[];
  loading: boolean;
  error: string | null;
}

export interface ManageLoginHistoryState {
  items: ManageLoginHistoryItem[];
  loading: boolean;
  error: string | null;
  pagination: LoginHistoryPagination;
}

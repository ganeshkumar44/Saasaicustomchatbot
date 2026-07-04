export type ManageUserAccountStatus = 'active' | 'deactivated' | 'deleted';

export type ManageUserRoleFilter = 'all' | 'admin' | 'user';

export type ManageUserStatusFilter = 'all' | 'active' | 'deactivated';

export type ManageUserStatusAction = 'activate' | 'deactivate' | 'delete';

export interface ManageUserListItem {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  mobile: string | null;
  company: string | null;
  website: string | null;
  language: string | null;
  profile_image: string | null;
  role: string;
  account_status: ManageUserAccountStatus;
  email_verified: boolean;
  mobile_verified: boolean;
  total_chatbots: number;
  created_at: string;
  updated_at: string;
}

export interface ManageUserDetail {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  mobile: string | null;
  role: string;
  account_status: ManageUserAccountStatus;
  email_verified: boolean;
  mobile_verified: boolean;
  profile_image: string | null;
  company: string | null;
  website: string | null;
  language: string | null;
  bio: string | null;
  theme: string;
  total_chatbots: number;
  total_published_chatbots: number;
  total_draft_chatbots: number;
  total_deleted_chatbots: number;
  created_at: string;
  updated_at: string;
}

export interface ManageUsersListResponse {
  success: true;
  message: string;
  page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  data: ManageUserListItem[];
}

export interface ManageUserDetailResponse {
  success: true;
  message: string;
  data: ManageUserDetail;
}

export interface FetchManageUsersParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface UpdateManageUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  company: string | null;
  website: string | null;
  language: string;
  bio: string | null;
  role: string;
  profile_image?: File;
}

export interface UpdateManageUserResponse {
  success: true;
  message: string;
  data: ManageUserListItem;
}

export interface UpdateManageUserStatusRequest {
  action: ManageUserStatusAction;
}

export interface UpdateManageUserStatusResponse {
  success: true;
  message: string;
  user_id: number;
  account_status: ManageUserAccountStatus;
}

export interface ManageUsersPagination {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface ManageUsersState {
  users: ManageUserListItem[];
  selectedUser: ManageUserDetail | null;
  loading: boolean;
  detailsLoading: boolean;
  updating: boolean;
  statusUpdating: boolean;
  pagination: ManageUsersPagination;
  error: string | null;
}

export interface ManageUserFormState {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  website: string;
  language: string;
  bio: string;
  role: string;
}

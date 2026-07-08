import { apiClient } from '@/api/axios';
import type { FetchManageLoginHistoryParams, ManageLoginHistoryResponse } from '@/types/loginHistory.types';
import type {
  FetchManageUsersParams,
  ManageUserDetailResponse,
  ManageUsersListResponse,
  UpdateManageUserRequest,
  UpdateManageUserResponse,
  UpdateManageUserStatusRequest,
  UpdateManageUserStatusResponse,
} from '@/types/manageUsers.types';

function buildUpdateManageUserFormData(data: UpdateManageUserRequest): FormData {
  const formData = new FormData();
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('email', data.email);
  formData.append('mobile', data.mobile);
  formData.append('company', data.company ?? '');
  formData.append('website', data.website ?? '');
  formData.append('language', data.language);
  formData.append('bio', data.bio ?? '');
  formData.append('role', data.role);

  if (data.profile_image) {
    formData.append('profile_image', data.profile_image, data.profile_image.name);
  }

  return formData;
}

export async function getUsers(
  params: FetchManageUsersParams,
): Promise<ManageUsersListResponse> {
  const response = await apiClient.get<ManageUsersListResponse>('/v1/manage-users', {
    params: {
      page: params.page,
      per_page: params.perPage,
      ...(params.search?.trim() ? { search: params.search.trim() } : {}),
    },
  });
  return response.data;
}

export async function getUserDetails(userId: number): Promise<ManageUserDetailResponse> {
  const response = await apiClient.get<ManageUserDetailResponse>(
    `/v1/manage-users/${userId}`,
  );
  return response.data;
}

export async function updateUser(
  userId: number,
  data: UpdateManageUserRequest,
): Promise<UpdateManageUserResponse> {
  const formData = buildUpdateManageUserFormData(data);
  const response = await apiClient.put<UpdateManageUserResponse>(
    `/v1/manage-users/${userId}`,
    formData,
  );
  return response.data;
}

export async function updateUserStatus(
  userId: number,
  data: UpdateManageUserStatusRequest,
): Promise<UpdateManageUserStatusResponse> {
  const response = await apiClient.put<UpdateManageUserStatusResponse>(
    `/v1/manage-users/${userId}/status`,
    data,
  );
  return response.data;
}

export async function getManageUsersLoginHistory(
  params: FetchManageLoginHistoryParams,
): Promise<ManageLoginHistoryResponse> {
  const response = await apiClient.get<ManageLoginHistoryResponse>(
    '/v1/manage-users/login-history',
    {
      params: {
        page: params.page,
        per_page: params.perPage,
        ...(params.search?.trim() ? { search: params.search.trim() } : {}),
        ...(params.role?.trim() ? { role: params.role.trim() } : {}),
        ...(params.loginStatus ? { login_status: params.loginStatus } : {}),
        ...(params.dateFrom ? { date_from: params.dateFrom } : {}),
        ...(params.dateTo ? { date_to: params.dateTo } : {}),
      },
    },
  );
  return response.data;
}

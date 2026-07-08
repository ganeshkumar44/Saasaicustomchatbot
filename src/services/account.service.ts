import { apiClient } from '@/api/axios';
import type { NotificationSettingsResponse, UpdateNotificationSettingsRequest, UpdateNotificationSettingsResponse } from '@/types/notification.types';
import type { UserLoginHistoryResponse } from '@/types/loginHistory.types';
import type {
  ActivateAccountRequest,
  ActivateAccountResponse,
  DeactivateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserDetailsResponse,
  RemoveProfilePictureResponse,
} from '@/types/account.types';

function buildUpdateUserFormData(data: UpdateUserRequest): FormData {
  const formData = new FormData();
  formData.append('first_name', data.first_name);
  formData.append('last_name', data.last_name);
  formData.append('email', data.email);
  formData.append('mobile', data.mobile);
  formData.append('company', data.company ?? '');
  formData.append('website', data.website ?? '');
  formData.append('language', data.language);
  formData.append('bio', data.bio ?? '');

  if (data.profile_image) {
    formData.append('profile_image', data.profile_image);
  }

  return formData;
}

export async function getUserDetails(): Promise<UserDetailsResponse> {
  const response = await apiClient.get<UserDetailsResponse>('/v1/user-details');
  return response.data;
}

export async function updateUserDetails(
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> {
  const formData = buildUpdateUserFormData(data);
  const response = await apiClient.put<UpdateUserResponse>(
    '/v1/update-user-details',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
}

export async function updatePassword(
  data: UpdatePasswordRequest,
): Promise<UpdatePasswordResponse> {
  const response = await apiClient.put<UpdatePasswordResponse>(
    '/v1/update-password',
    data,
  );
  return response.data;
}

export async function activateAccount(
  data: ActivateAccountRequest,
): Promise<ActivateAccountResponse> {
  const response = await apiClient.put<ActivateAccountResponse>(
    '/v1/activate-account',
    data,
  );
  return response.data;
}

export async function deactivateAccount(): Promise<DeactivateAccountResponse> {
  const response = await apiClient.put<DeactivateAccountResponse>(
    '/v1/deactivate-account',
  );
  return response.data;
}

export async function deleteAccount(
  data: DeleteAccountRequest,
): Promise<DeleteAccountResponse> {
  const response = await apiClient.delete<DeleteAccountResponse>(
    '/v1/delete-account',
    { data },
  );
  return response.data;
}

export async function removeProfilePicture(): Promise<RemoveProfilePictureResponse> {
  const response = await apiClient.delete<RemoveProfilePictureResponse>(
    '/v1/remove-profile-picture',
  );
  return response.data;
}

export async function getUserLoginHistory(): Promise<UserLoginHistoryResponse> {
  const response = await apiClient.get<UserLoginHistoryResponse>(
    '/v1/user-details/login-history',
  );
  return response.data;
}

export async function getNotificationSettings(): Promise<NotificationSettingsResponse> {
  const response = await apiClient.get<NotificationSettingsResponse>(
    '/v1/notification/settings',
  );
  return response.data;
}

export async function updateNotificationSettings(
  data: UpdateNotificationSettingsRequest,
): Promise<UpdateNotificationSettingsResponse> {
  const response = await apiClient.put<UpdateNotificationSettingsResponse>(
    '/v1/notification/settings',
    data,
  );
  return response.data;
}

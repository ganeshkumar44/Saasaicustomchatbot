import { apiClient } from '@/api/axios';
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
} from '@/types/account.types';

export async function getUserDetails(): Promise<UserDetailsResponse> {
  const response = await apiClient.get<UserDetailsResponse>('/v1/user-details');
  return response.data;
}

export async function updateUserDetails(
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> {
  const response = await apiClient.put<UpdateUserResponse>(
    '/v1/update-user-details',
    data,
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

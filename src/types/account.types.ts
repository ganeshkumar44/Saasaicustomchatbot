export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string | null;
  role: string;
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  is_active: boolean;
  profile_image: string | null;
  company: string | null;
  website: string | null;
  language: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  profile_created_at: string;
  profile_updated_at: string;
}

export interface UserDetailsResponse {
  success: true;
  message: string;
  data: UserDetails;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  company: string | null;
  website: string | null;
  language: string;
  bio: string | null;
  profile_image?: File;
}

export interface UpdateUserResponse {
  success: true;
  message: string;
}

export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface UpdatePasswordResponse {
  success: true;
  message: string;
}

export interface DeleteAccountRequest {
  user_id: number;
}

export interface DeleteAccountResponse {
  success: true;
  message: string;
}

export interface DeactivateAccountRequest {
  user_id?: number;
}

export interface DeactivateAccountResponse {
  success: true;
  message: string;
}

export interface ActivateAccountRequest {
  user_id: number;
}

export interface ActivateAccountResponse {
  success: true;
  message: string;
}

export interface RemoveProfilePictureResponse {
  success: true;
  message: string;
}

export interface AccountSettingsState {
  userDetails: UserDetails | null;
  profileLoading: boolean;
  profileUpdating: boolean;
  passwordUpdating: boolean;
  removeProfilePictureLoading: boolean;
  activateLoading: boolean;
  deactivateLoading: boolean;
  deleteLoading: boolean;
  success: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  language: string;
  bio: string;
}

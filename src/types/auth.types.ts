export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}

export interface SignupUserData {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
}

export interface SignupResponse {
  success: true;
  message: string;
  data: SignupUserData;
}

export interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  registeredUser: SignupUserData | null;
  successMessage: string | null;
}

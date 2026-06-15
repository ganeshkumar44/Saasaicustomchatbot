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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  role: string;
  is_email_verified: boolean;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: AuthUser;
  access_token: string;
  token_type: string;
}

export interface VerificationRequest {
  email: string;
  verification_code: string;
}

export interface VerificationResponse {
  success: true;
  message: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: true;
  message: string;
}

export interface SignoutResponse {
  success: true;
  message: string;
}

export interface VerificationState {
  verificationLoading: boolean;
  verificationSuccess: boolean;
  verificationError: string | null;
  verificationSuccessMessage: string | null;
  resendLoading: boolean;
  resendSuccess: boolean;
  resendError: string | null;
  resendSuccessMessage: string | null;
  showResendLink: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
}

export interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  registeredUser: SignupUserData | null;
  registeredEmail: string | null;
  successMessage: string | null;
  verificationLoading: boolean;
  verificationSuccess: boolean;
  verificationError: string | null;
  verificationSuccessMessage: string | null;
  resendLoading: boolean;
  resendSuccess: boolean;
  resendError: string | null;
  resendSuccessMessage: string | null;
  showResendLink: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
  loginLoading: boolean;
  loginSuccess: boolean;
  loginError: string | null;
  loginSuccessMessage: string | null;
  signoutLoading: boolean;
  signoutSuccess: boolean;
  signoutError: string | null;
  signoutSuccessMessage: string | null;
}

export const ACCOUNT_NOT_VERIFIED_MESSAGE =
  'Please verify your account before signing in.';

export const INACTIVE_LOGOUT_MESSAGE =
  'You were signed out due to inactivity.';

export function isAccountNotVerifiedError(message: string): boolean {
  return message === ACCOUNT_NOT_VERIFIED_MESSAGE;
}

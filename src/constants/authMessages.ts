export const ACCOUNT_NOT_VERIFIED_MESSAGE =
  'Please verify your account before signing in.';

export function isAccountNotVerifiedError(message: string): boolean {
  return message === ACCOUNT_NOT_VERIFIED_MESSAGE;
}

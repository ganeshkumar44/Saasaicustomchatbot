import type { SignupRequest } from '@/types/auth.types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export type SignupValidationResult = ValidationResult;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VERIFICATION_CODE_REGEX = /^\d{6}$/;

export function isVerificationExpiredError(message: string): boolean {
  const lower = message.toLowerCase();
  return lower.includes('expired') || lower.includes('expire');
}

export function validateVerificationForm(
  email: string,
  verificationCode: string,
): ValidationResult {
  const errors: string[] = [];
  const trimmedEmail = email.trim();
  const trimmedCode = verificationCode.trim();

  if (!trimmedEmail) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.push('Please enter a valid email address.');
  }

  if (!trimmedCode) {
    errors.push('Verification code is required.');
  } else if (!VERIFICATION_CODE_REGEX.test(trimmedCode)) {
    errors.push('Verification code must be exactly 6 digits.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 100;

export function validateEmailForVerificationRedirect(
  email: string,
): ValidationResult {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return {
      isValid: false,
      errors: ['Please enter your email first.'],
    };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return {
      isValid: false,
      errors: ['Please enter a valid email address.'],
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}

export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: string[] = [];
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.push('Please enter a valid email address.');
  }

  if (!password) {
    errors.push('Password is required.');
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must contain at least ${PASSWORD_MIN_LENGTH} characters.`);
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

const MOBILE_REGEX = /^\d{10}$/;

export function validateSignupForm(data: SignupRequest): SignupValidationResult {
  const errors: string[] = [];

  const firstName = data.first_name.trim();
  const lastName = data.last_name.trim();
  const email = data.email.trim();
  const mobile = data.mobile.trim();

  if (!firstName) {
    errors.push('First name is required.');
  } else if (firstName.length > 50) {
    errors.push('First name must be at most 50 characters.');
  }

  if (!lastName) {
    errors.push('Last name is required.');
  } else if (lastName.length > 50) {
    errors.push('Last name must be at most 50 characters.');
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (!mobile) {
    errors.push('Mobile number is required.');
  } else if (!MOBILE_REGEX.test(mobile)) {
    errors.push('Mobile number must be exactly 10 digits.');
  }

  if (!data.password) {
    errors.push('Password is required.');
  }

  if (data.password !== data.confirm_password) {
    errors.push('Passwords do not match.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

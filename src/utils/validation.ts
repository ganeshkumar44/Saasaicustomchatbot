import type { SignupRequest } from '@/types/auth.types';

export interface SignupValidationResult {
  isValid: boolean;
  errors: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

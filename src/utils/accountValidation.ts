import type { UpdatePasswordRequest, UpdateUserRequest } from '@/types/account.types';
import type { ValidationResult } from '@/utils/validation';
import { validatePasswordPolicy } from '@/utils/validation';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const MOBILE_REGEX = /^\d{8,15}$/;
const WEBSITE_REGEX =
  /^https?:\/\/(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}(?:\/.*)?$/i;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const COMPANY_MAX_LENGTH = 150;
const BIO_MAX_LENGTH = 1000;

export function validateUpdateProfileForm(data: UpdateUserRequest): ValidationResult {
  const errors: string[] = [];
  const firstName = data.first_name.trim();
  const lastName = data.last_name.trim();
  const email = data.email.trim();
  const mobile = data.mobile.trim();
  const language = data.language.trim();
  const company = data.company?.trim() ?? '';
  const website = data.website?.trim() ?? '';
  const bio = data.bio?.trim() ?? '';

  if (!firstName) {
    errors.push('First name is required.');
  } else if (firstName.length < NAME_MIN_LENGTH) {
    errors.push('First name must be at least 2 characters long.');
  } else if (firstName.length > NAME_MAX_LENGTH) {
    errors.push('First name must not exceed 50 characters.');
  } else if (!NAME_REGEX.test(firstName)) {
    errors.push('First name must contain only alphabets.');
  }

  if (!lastName) {
    errors.push('Last name is required.');
  } else if (lastName.length < NAME_MIN_LENGTH) {
    errors.push('Last name must be at least 2 characters long.');
  } else if (lastName.length > NAME_MAX_LENGTH) {
    errors.push('Last name must not exceed 50 characters.');
  } else if (!NAME_REGEX.test(lastName)) {
    errors.push('Last name must contain only alphabets.');
  }

  if (!email) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email.toLowerCase())) {
    errors.push('Please enter a valid email address.');
  }

  if (!mobile) {
    errors.push('Mobile number is required.');
  } else if (!MOBILE_REGEX.test(mobile)) {
    errors.push('Mobile number must contain 8 to 15 digits only.');
  }

  if (website && !WEBSITE_REGEX.test(website)) {
    errors.push('Please enter a valid website URL.');
  }

  if (!language) {
    errors.push('Language is required.');
  }

  if (company.length > COMPANY_MAX_LENGTH) {
    errors.push('Company name must not exceed 150 characters.');
  }

  if (bio.length > BIO_MAX_LENGTH) {
    errors.push('Bio must not exceed 1000 characters.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUpdatePasswordForm(data: UpdatePasswordRequest): ValidationResult {
  const errors: string[] = [];

  if (!data.current_password) {
    errors.push('Current password is required.');
  }

  const passwordError = validatePasswordPolicy(data.new_password);
  if (passwordError) {
    errors.push(passwordError);
  }

  if (!data.confirm_new_password) {
    errors.push('Confirm new password is required.');
  } else if (data.new_password !== data.confirm_new_password) {
    errors.push('Password and confirm password do not match.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

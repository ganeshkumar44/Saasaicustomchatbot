import type { FeedbackFormErrors, FeedbackFormValues } from '@/types/feedback.types';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateFeedbackForm(
  values: FeedbackFormValues,
): FeedbackFormErrors {
  const errors: FeedbackFormErrors = {};

  if (!values.rating || values.rating < 1 || values.rating > 5) {
    errors.rating = 'Please select a rating from 1 to 5 stars.';
  }

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = values.phone_number.trim();
  if (phone.length > 20) {
    errors.phone_number = 'Phone number must not exceed 20 characters.';
  }

  if (values.message.trim().length > 2000) {
    errors.message = 'Feedback message must not exceed 2000 characters.';
  }

  return errors;
}

export function hasFeedbackFormErrors(errors: FeedbackFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

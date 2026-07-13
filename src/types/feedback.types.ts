export interface CreateFeedbackRequest {
  rating: number;
  name: string;
  email: string;
  phone_number?: string | null;
  message?: string | null;
}

export interface CreateFeedbackSuccessResponse {
  success: true;
  message: string;
}

export interface FeedbackFormValues {
  rating: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
}

export interface FeedbackFormErrors {
  rating?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  message?: string;
}

export interface FeedbackState {
  submitting: boolean;
  error: string | null;
  successMessage: string | null;
}

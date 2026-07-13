import { useEffect, useMemo, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { StarRatingInput } from '@/app/components/feedback/StarRatingInput';
import { useFeedback } from '@/hooks/useFeedback';
import type { FeedbackFormErrors, FeedbackFormValues } from '@/types/feedback.types';
import {
  hasFeedbackFormErrors,
  validateFeedbackForm,
} from '@/utils/feedbackValidation';

interface FeedbackModalProps {
  open: boolean;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  onClose: () => void;
}

const SUCCESS_CLOSE_DELAY_MS = 2000;

function buildInitialValues(
  name: string,
  email: string,
  phone: string,
): FeedbackFormValues {
  return {
    rating: 0,
    name,
    email,
    phone_number: phone,
    message: '',
  };
}

export function FeedbackModal({
  open,
  initialName,
  initialEmail,
  initialPhone,
  onClose,
}: FeedbackModalProps) {
  const { submitting, error, successMessage, submitFeedback, clearError, reset } =
    useFeedback();

  const prefills = useMemo(
    () => buildInitialValues(initialName, initialEmail, initialPhone),
    [initialEmail, initialName, initialPhone],
  );

  const [values, setValues] = useState<FeedbackFormValues>(prefills);
  const [fieldErrors, setFieldErrors] = useState<FeedbackFormErrors>({});

  useEffect(() => {
    if (!open) {
      return;
    }
    setValues(buildInitialValues(initialName, initialEmail, initialPhone));
    setFieldErrors({});
    clearError();
  }, [clearError, initialEmail, initialName, initialPhone, open]);

  useEffect(() => {
    if (!open || !successMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      reset();
      setValues(buildInitialValues(initialName, initialEmail, initialPhone));
      setFieldErrors({});
      onClose();
    }, SUCCESS_CLOSE_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    initialEmail,
    initialName,
    initialPhone,
    onClose,
    open,
    reset,
    successMessage,
  ]);

  if (!open) {
    return null;
  }

  const updateField = <K extends keyof FeedbackFormValues>(
    key: K,
    value: FeedbackFormValues[K],
  ) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      if (!previous[key]) {
        return previous;
      }
      const next = { ...previous };
      delete next[key];
      return next;
    });
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || successMessage) {
      return;
    }

    const errors = validateFeedbackForm(values);
    setFieldErrors(errors);
    if (hasFeedbackFormErrors(errors)) {
      return;
    }

    await submitFeedback({
      rating: values.rating,
      name: values.name.trim(),
      email: values.email.trim(),
      phone_number: values.phone_number.trim() || null,
      message: values.message.trim() || null,
    });
  };

  const handleCancel = () => {
    if (submitting) {
      return;
    }
    reset();
    setFieldErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3
            id="feedback-modal-title"
            className="text-lg font-semibold dark:text-white"
          >
            Share your feedback
          </h3>
          <button
            type="button"
            onClick={handleCancel}
            disabled={submitting}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
            aria-label="Close feedback form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(event) => void handleSubmit(event)} className="flex flex-col min-h-0">
          <div className="px-5 py-4 space-y-4 overflow-y-auto">
            {successMessage ? (
              <div
                role="status"
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
              >
                Thank you for your valuable feedback.
              </div>
            ) : null}

            {error && !successMessage ? (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              >
                {error}
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <StarRatingInput
                value={values.rating}
                onChange={(rating) => updateField('rating', rating)}
                disabled={submitting || Boolean(successMessage)}
                error={fieldErrors.rating}
              />
            </div>

            <div>
              <label
                htmlFor="feedback-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                value={values.name}
                onChange={(event) => updateField('name', event.target.value)}
                disabled={submitting || Boolean(successMessage)}
                maxLength={100}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              {fieldErrors.name ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                value={values.email}
                onChange={(event) => updateField('email', event.target.value)}
                disabled={submitting || Boolean(successMessage)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              {fieldErrors.email ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="feedback-phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="feedback-phone"
                type="tel"
                value={values.phone_number}
                onChange={(event) => updateField('phone_number', event.target.value)}
                disabled={submitting || Boolean(successMessage)}
                maxLength={20}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              {fieldErrors.phone_number ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.phone_number}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="feedback-message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Feedback Message
              </label>
              <textarea
                id="feedback-message"
                value={values.message}
                onChange={(event) => updateField('message', event.target.value)}
                disabled={submitting || Boolean(successMessage)}
                rows={4}
                maxLength={2000}
                placeholder="Tell us how we can improve NexGenChat..."
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-y min-h-[96px]"
              />
              {fieldErrors.message ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || Boolean(successMessage)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

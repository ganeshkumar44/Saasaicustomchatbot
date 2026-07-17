import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { LandingButton } from '@/app/components/landing/LandingButton';
import { useLandingContact } from '@/hooks/useLandingContact';

interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone_number: string;
  subject: string;
  message: string;
  website: string;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  phone_number: '',
  subject: 'Book a demo',
  message: '',
  website: '',
};

function validate(values: ContactFormValues): string | null {
  if (!values.name.trim()) return 'Please enter your name.';
  if (!values.email.trim()) return 'Please enter your email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return 'Please enter a valid email address.';
  }
  if (!values.company.trim()) return 'Please enter your company.';
  if (!values.subject.trim()) return 'Please enter a subject.';
  if (!values.message.trim()) return 'Please enter a message.';
  if (values.message.trim().length < 10) {
    return 'Message should be at least 10 characters.';
  }
  return null;
}

export function ContactForm() {
  const { submit, submitting, error, successMessage, reset } = useLandingContact();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const validationError = validate(values);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const result = await submit({
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      phone_number: values.phone_number.trim() || undefined,
      subject: values.subject.trim(),
      message: values.message.trim(),
      website: values.website,
    });

    if (result) {
      setValues(INITIAL_VALUES);
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Name"
          name="name"
          value={values.name}
          onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
          autoComplete="name"
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          value={values.email}
          onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Company"
          name="company"
          value={values.company}
          onChange={(value) => setValues((prev) => ({ ...prev, company: value }))}
          autoComplete="organization"
          required
        />
        <Field
          label="Phone (optional)"
          name="phone_number"
          type="tel"
          value={values.phone_number}
          onChange={(value) => setValues((prev) => ({ ...prev, phone_number: value }))}
          autoComplete="tel"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        value={values.subject}
        onChange={(value) => setValues((prev) => ({ ...prev, subject: value }))}
        required
      />

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
          placeholder="Tell us about your website and use case"
        />
      </div>

      {/* Honeypot — keep hidden from humans */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, website: event.target.value }))
          }
        />
      </div>

      {(localError || error) && (
        <p className="text-sm text-rose-600" role="alert">
          {localError ?? error}
        </p>
      )}

      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p>{successMessage}</p>
          <button
            type="button"
            className="mt-2 font-semibold underline"
            onClick={() => reset()}
          >
            Send another message
          </button>
        </div>
      ) : null}

      <LandingButton type="submit" variant="primary" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </LandingButton>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

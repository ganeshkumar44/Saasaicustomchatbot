import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { validateForgotPasswordEmail } from '@/utils/validation';

export function ForgotPasswordEmailStep() {
  const navigate = useNavigate();
  const { sendVerificationCode, loading, error, clearError } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateForgotPasswordEmail(email);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    void sendVerificationCode(email);
  };

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </button>

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold">Forgot Password?</h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-center">No worries, we'll send you reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>
        </div>

        {validationErrors.length > 0 && (
          <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
            {validationErrors.map((validationError) => (
              <p key={validationError} className="text-sm text-red-600 dark:text-red-400">
                {validationError}
              </p>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#003A96] text-white rounded-lg font-medium hover:bg-[#002d75] transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          disabled={loading}
        >
          Remember your password?{' '}
          <span className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium">Sign in</span>
        </button>
      </div>
    </>
  );
}

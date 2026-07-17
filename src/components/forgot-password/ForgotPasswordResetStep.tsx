import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { PasswordValidationBox } from '@/components/auth/PasswordValidationBox';
import { validateResetPasswordForm } from '@/utils/validation';

export function ForgotPasswordResetStep() {
  const navigate = useNavigate();
  const { resetPassword, loading, error, clearError, goToStep } = useForgotPassword();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const inputClass =
    'w-full pl-10 pr-12 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateResetPasswordForm(newPassword, confirmPassword);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    void resetPassword(newPassword, confirmPassword);
  };

  return (
    <>
      <button
        onClick={() => goToStep('otp')}
        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] mb-6 transition-colors text-sm"
        disabled={loading}
      >
        Back
      </button>

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-center">Create a new password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter your new password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
              disabled={loading}
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Confirm your new password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <PasswordValidationBox
            password={newPassword}
            confirmPassword={confirmPassword}
            showMatchCheck
          />
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
              Resetting...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/signin')}
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

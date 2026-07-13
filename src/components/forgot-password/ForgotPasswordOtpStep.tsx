import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Loader2 } from 'lucide-react';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import { useResendCountdown } from '@/hooks/useResendCountdown';
import { validateForgotPasswordCode } from '@/utils/validation';

export function ForgotPasswordOtpStep() {
  const navigate = useNavigate();
  const {
    email,
    verifyCode,
    resendCode,
    loading,
    error,
    resendLoading,
    resendError,
    resendSuccess,
    clearError,
    clearResendError,
  } = useForgotPassword();

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { secondsRemaining, canResend, restart } = useResendCountdown();

  const isProcessing = loading || resendLoading;

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      document.getElementById(`forgot-code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`forgot-code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    clearError();
    clearResendError();

    const code = verificationCode.join('');
    const validation = validateForgotPasswordCode(code);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    void verifyCode(code);
  };

  const handleResend = () => {
    if (!canResend || resendLoading) return;

    clearError();
    clearResendError();
    setValidationErrors([]);
    setVerificationCode(['', '', '', '', '', '']);
    document.getElementById('forgot-code-0')?.focus();

    void resendCode();
  };

  useEffect(() => {
    document.getElementById('forgot-code-0')?.focus();
  }, []);

  useEffect(() => {
    if (resendSuccess) {
      restart();
    }
  }, [resendSuccess, restart]);

  if (!email) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#003A96] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Verify Your Account</h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-center">We've sent a verification code to your email</p>
        <p className="text-indigo-500 dark:text-indigo-400 font-medium mt-1">{email}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 text-center">
            Enter Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`forgot-code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isProcessing}
                className="w-12 h-14 text-center text-2xl font-bold rounded-lg bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:opacity-40"
              />
            ))}
          </div>
        </div>

        {validationErrors.length > 0 && (
          <div className="rounded-lg border border-red-200 dark:border-red-800 p-3 space-y-1">
            {validationErrors.map((validationError) => (
              <p key={validationError} className="text-sm text-red-600 dark:text-red-400 text-center">
                {validationError}
              </p>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        )}

        {resendError && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{resendError}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={verificationCode.join('').length !== 6 || isProcessing}
          className="w-full py-3 bg-[#003A96] text-white rounded-lg font-medium hover:bg-[#002d75] transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Account'
          )}
        </button>
      </div>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-[var(--color-text-secondary)]">
          <button
            onClick={handleResend}
            disabled={!canResend || resendLoading}
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {resendLoading
              ? 'Sending...'
              : canResend
                ? 'Resend Code'
                : `Resend Code (${secondsRemaining}s)`}
          </button>
        </p>
        <button
          onClick={() => navigate('/')}
          disabled={isProcessing}
          className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors disabled:opacity-40"
        >
          Back to Login
        </button>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Loader2 } from 'lucide-react';
import { AuthBackground } from '@/app/components/AuthBackground';
import { useVerification } from '@/hooks/useVerification';
import { validateVerificationForm } from '@/utils/validation';

export function VerifyAccount() {
  const navigate = useNavigate();
  const {
    registeredEmail,
    verify,
    resendVerification,
    verificationLoading,
    verificationSuccess,
    verificationError,
    resendLoading,
    resendError,
    showResendLink,
    clearVerificationErrors,
  } = useVerification();

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isProcessing = verificationLoading || resendLoading;

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    if (!registeredEmail) return;

    clearVerificationErrors();

    const code = verificationCode.join('');
    const validation = validateVerificationForm(registeredEmail, code);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    verify({
      email: registeredEmail,
      verification_code: code,
    });
  };

  const handleResend = () => {
    if (!registeredEmail || resendLoading) return;

    clearVerificationErrors();
    setValidationErrors([]);
    setVerificationCode(['', '', '', '', '', '']);
    document.getElementById('code-0')?.focus();

    resendVerification({ email: registeredEmail });
  };

  useEffect(() => {
    document.getElementById('code-0')?.focus();
  }, []);

  if (!registeredEmail) {
    return null;
  }

  return (
    <AuthBackground>
      {!verificationSuccess ? (
        <>
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold">Verify Your Account</h1>
            <p className="text-[var(--color-text-secondary)] mt-2 text-center">We've sent a verification code to your email</p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium mt-1">{registeredEmail}</p>
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
                    id={`code-${index}`}
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

            {verificationError && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{verificationError}</p>
            )}

            {resendError && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{resendError}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={verificationCode.join('').length !== 6 || isProcessing}
              className="w-full py-3 bg-[#003A96] text-white rounded-lg font-medium hover:bg-[#002d75] transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {verificationLoading ? (
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
            {showResendLink && (
              <p className="text-sm text-[var(--color-text-secondary)]">
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {resendLoading ? 'Sending...' : 'Resend Verification Code'}
                </button>
              </p>
            )}
            <button
              onClick={() => navigate('/signin')}
              disabled={isProcessing}
              className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors disabled:opacity-40"
            >
              Back to Login
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-lg animate-bounce">
            <CheckCircle className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Account Verified!</h1>
          <p className="text-[var(--color-text-secondary)] text-center">Your account has been successfully verified.</p>
          <p className="text-[var(--color-text-tertiary)] text-center mt-2 text-sm">Redirecting to login…</p>
          <div className="mt-6">
            <Loader2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-spin" />
          </div>
        </div>
      )}
    </AuthBackground>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { AuthBackground } from '../components/AuthBackground';

export function VerifyAccount() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
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
    if (verificationCode.join('').length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }, 1500);
    }
  };

  const handleResend = () => {
    setVerificationCode(['', '', '', '', '', '']);
    document.getElementById('code-0')?.focus();
  };

  useEffect(() => {
    document.getElementById('code-0')?.focus();
  }, []);

  return (
    <AuthBackground>
      {!isVerified ? (
        <>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Verify Your Account</h1>
            <p className="text-[var(--color-text-secondary)] mt-2 text-center">We've sent a verification code to your email</p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium mt-1">john@example.com</p>
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
                    className="w-12 h-14 text-center text-2xl font-bold rounded-lg bg-[var(--color-surface)] border-2 border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={verificationCode.join('').length !== 6 || isVerifying}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
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
              Didn't receive the code?{' '}
              <button onClick={handleResend} className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">
                Resend Code
              </button>
            </p>
            <button onClick={() => navigate('/')} className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
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
          <p className="text-[var(--color-text-tertiary)] text-center mt-2 text-sm">Redirecting to dashboard…</p>
          <div className="mt-6">
            <Loader2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-spin" />
          </div>
        </div>
      )}
    </AuthBackground>
  );
}

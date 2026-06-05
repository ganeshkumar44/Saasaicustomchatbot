import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthBackground } from '../components/AuthBackground';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthBackground>
      {!submitted ? (
        <>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
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
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
              Remember your password?{' '}
              <span className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium">Sign in</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Check Your Email</h1>
            <p className="text-[var(--color-text-secondary)] mt-2 text-center">We've sent password reset instructions to</p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium mt-1">{email}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl"
            >
              Continue to Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg font-medium hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Back to Login
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Didn't receive the email?{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Click to resend
              </button>
            </p>
          </div>
        </>
      )}
    </AuthBackground>
  );
}

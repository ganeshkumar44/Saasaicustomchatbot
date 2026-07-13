import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AuthBackground } from '@/app/components/AuthBackground';
import { isAccountNotVerifiedError } from '@/constants/authMessages';
import { useAuth } from '@/hooks/useAuth';
import { useVerifyAccountRedirect } from '@/hooks/useVerifyAccountRedirect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetLoginState } from '@/store/authSlice';
import { selectThemeInitialized } from '@/store/themeSelectors';
import { validateLoginForm } from '@/utils/validation';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    login,
    loginLoading,
    loginError,
    loginSuccess,
    loginSuccessMessage,
    isAuthenticated,
    clearError,
  } = useAuth();
  const themeInitialized = useAppSelector(selectThemeInitialized);
  const { redirectToVerifyAccount } = useVerifyAccountRedirect();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    dispatch(resetLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && themeInitialized) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, themeInitialized, navigate]);

  useEffect(() => {
    if (loginSuccess && loginSuccessMessage) {
      toast.success(loginSuccessMessage);
    }
  }, [loginSuccess, loginSuccessMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    login({
      email: email.trim(),
      password,
    });
  };

  const handleVerifyAccountClick = () => {
    const validation = redirectToVerifyAccount(email);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
    }
  };

  return (
    <AuthBackground>
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-[#003A96] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
              disabled={loginLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              disabled={loginLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
              disabled={loginLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-border)] text-indigo-500 focus:ring-indigo-500" />
            <span className="text-sm text-[var(--color-text-secondary)]">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            disabled={loginLoading}
          >
            Forgot password?
          </button>
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

        {loginError && (
          <div className="text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
            {isAccountNotVerifiedError(loginError) && (
              <button
                type="button"
                onClick={handleVerifyAccountClick}
                disabled={loginLoading}
                className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors mt-1"
              >
                Verify Account
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-3 bg-[#003A96] text-white rounded-lg font-medium hover:bg-[#002d75] transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loginLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-[var(--color-text-secondary)]">Don't have an account? </span>
        <button
          onClick={() => navigate('/register')}
          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
          disabled={loginLoading}
        >
          Sign up
        </button>
      </div>
    </AuthBackground>
  );
}

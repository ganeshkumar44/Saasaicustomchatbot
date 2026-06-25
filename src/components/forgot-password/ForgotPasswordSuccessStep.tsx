import { CheckCircle, Loader2 } from 'lucide-react';

export function ForgotPasswordSuccessStep() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-lg animate-bounce">
        <CheckCircle className="w-11 h-11 text-white" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Password Reset!</h1>
      <p className="text-[var(--color-text-secondary)] text-center">Your password has been successfully reset.</p>
      <p className="text-[var(--color-text-tertiary)] text-center mt-2 text-sm">Redirecting to login…</p>
      <div className="mt-6">
        <Loader2 className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-spin" />
      </div>
    </div>
  );
}

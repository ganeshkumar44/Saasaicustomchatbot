import { useEffect } from 'react';
import { AuthBackground } from '@/app/components/AuthBackground';
import { ForgotPasswordEmailStep } from '@/components/forgot-password/ForgotPasswordEmailStep';
import { ForgotPasswordOtpStep } from '@/components/forgot-password/ForgotPasswordOtpStep';
import { ForgotPasswordResetStep } from '@/components/forgot-password/ForgotPasswordResetStep';
import { ForgotPasswordSuccessStep } from '@/components/forgot-password/ForgotPasswordSuccessStep';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export function ForgotPassword() {
  const { currentStep, resetFlow } = useForgotPassword();

  useEffect(() => {
    return () => {
      resetFlow();
    };
  }, [resetFlow]);

  return (
    <AuthBackground>
      {currentStep === 'email' && <ForgotPasswordEmailStep />}
      {currentStep === 'otp' && <ForgotPasswordOtpStep />}
      {currentStep === 'reset' && <ForgotPasswordResetStep />}
      {currentStep === 'success' && <ForgotPasswordSuccessStep />}
    </AuthBackground>
  );
}

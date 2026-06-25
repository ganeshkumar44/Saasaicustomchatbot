import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store/hooks';
import { resetVerificationFlow, setRegisteredEmail } from '@/store/authSlice';
import type { ValidationResult } from '@/utils/validation';
import { validateEmailForVerificationRedirect } from '@/utils/validation';

export function useVerifyAccountRedirect() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const redirectToVerifyAccount = useCallback(
    (email: string): ValidationResult => {
      const validation = validateEmailForVerificationRedirect(email);

      if (!validation.isValid) {
        return validation;
      }

      const trimmedEmail = email.trim();
      dispatch(resetVerificationFlow());
      dispatch(setRegisteredEmail(trimmedEmail));
      navigate('/verify-account');

      return validation;
    },
    [dispatch, navigate],
  );

  return { redirectToVerifyAccount };
}

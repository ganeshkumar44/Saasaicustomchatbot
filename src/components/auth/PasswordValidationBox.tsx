import {
  arePasswordRequirementsMet,
  getPasswordRequirementChecks,
  getPasswordStrength,
  PASSWORD_REQUIREMENT_SUMMARY,
  type PasswordStrength,
} from '@/utils/validation';

interface PasswordValidationBoxProps {
  password: string;
  confirmPassword?: string;
  showMatchCheck?: boolean;
}

interface RequirementItemProps {
  met: boolean;
  label: string;
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <li
      className={`text-sm ${
        met
          ? 'text-green-600 dark:text-green-400'
          : 'text-[var(--color-text-tertiary)]'
      }`}
    >
      <span className="mr-2">{met ? '•' : '•'}</span>
      {label}
    </li>
  );
}

function getStrengthBarClass(strength: PasswordStrength): string {
  if (strength === 'strong') {
    return 'bg-green-500';
  }

  if (strength === 'medium') {
    return 'bg-orange-500';
  }

  return 'bg-red-500';
}

function getStrengthLabelClass(strength: PasswordStrength): string {
  if (strength === 'strong') {
    return 'text-green-600 dark:text-green-400';
  }

  if (strength === 'medium') {
    return 'text-orange-600 dark:text-orange-400';
  }

  return 'text-red-600 dark:text-red-400';
}

function getStrengthWidth(strength: PasswordStrength): string {
  if (strength === 'strong') {
    return 'w-full';
  }

  if (strength === 'medium') {
    return 'w-2/3';
  }

  return 'w-1/4';
}

export function PasswordValidationBox({
  password,
  confirmPassword = '',
  showMatchCheck = false,
}: PasswordValidationBoxProps) {
  const checks = getPasswordRequirementChecks(password);
  const strength = getPasswordStrength(password);
  const passwordsMatch =
    showMatchCheck && confirmPassword.length > 0 && password === confirmPassword;
  const showMismatch =
    showMatchCheck && confirmPassword.length > 0 && password !== confirmPassword;
  const showSummary = password.length > 0 && !arePasswordRequirementsMet(password);

  return (
    <div className="mt-3 space-y-3">
      {password.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getStrengthBarClass(strength)} ${getStrengthWidth(strength)}`}
            />
          </div>
          <span className={`text-sm font-medium capitalize ${getStrengthLabelClass(strength)}`}>
            {strength}
          </span>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
          Password must contain:
        </p>
        <ul className="space-y-1">
          <RequirementItem met={checks.minLength} label="At least 8 characters" />
          <RequirementItem met={checks.uppercase} label="One uppercase letter" />
          <RequirementItem met={checks.lowercase} label="One lowercase letter" />
          <RequirementItem met={checks.digit} label="One number" />
          {showMatchCheck && (
            <RequirementItem
              met={passwordsMatch}
              label="Passwords match"
            />
          )}
        </ul>
      </div>

      {showSummary && (
        <p className="text-sm text-red-600 dark:text-red-400">{PASSWORD_REQUIREMENT_SUMMARY}</p>
      )}

      {showMismatch && (
        <p className="text-sm text-red-600 dark:text-red-400">Passwords do not match.</p>
      )}
    </div>
  );
}

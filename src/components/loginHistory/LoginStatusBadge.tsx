import type { LoginStatus } from '@/types/loginHistory.types';
import {
  getLoginStatusBadgeClassName,
  getLoginStatusLabel,
} from '@/utils/loginHistory';

interface LoginStatusBadgeProps {
  status: LoginStatus;
}

export function LoginStatusBadge({ status }: LoginStatusBadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getLoginStatusBadgeClassName(status)}`}
    >
      {getLoginStatusLabel(status)}
    </span>
  );
}

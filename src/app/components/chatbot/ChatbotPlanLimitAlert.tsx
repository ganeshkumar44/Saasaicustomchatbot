import { Info } from 'lucide-react';

interface ChatbotPlanLimitAlertProps {
  message: string;
  className?: string;
}

export function ChatbotPlanLimitAlert({
  message,
  className = '',
}: ChatbotPlanLimitAlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 ${className}`}
    >
      <div className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>{message}</span>
      </div>
    </div>
  );
}

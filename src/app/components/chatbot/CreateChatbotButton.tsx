import type { ReactNode } from 'react';
import { Loader2, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { useUserPlan } from '@/hooks/useUserPlan';

interface CreateChatbotButtonProps {
  onClick: () => void;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
  /** When true, label/tooltip reflect resuming an existing draft. */
  hasDraft?: boolean;
}

const defaultClassName =
  'px-4 py-2 bg-[#003A96] text-white rounded-lg hover:bg-[#002d75] transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed';

export function CreateChatbotButton({
  onClick,
  loading = false,
  className = defaultClassName,
  children,
  showIcon = true,
  hasDraft = false,
}: CreateChatbotButtonProps) {
  const {
    canCreateChatbot,
    chatbotLimitTooltip,
    chatbotResumeDraftTooltip,
  } = useUserPlan(hasDraft);

  const label =
    children
    ?? (hasDraft ? 'Continue Draft' : 'Create Chatbot');

  const button = (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={className}
      aria-label={typeof label === 'string' ? label : undefined}
      title={typeof label === 'string' ? label : undefined}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        showIcon && <Plus className="w-5 h-5" />
      )}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const tooltipText = hasDraft
    ? chatbotResumeDraftTooltip
    : !canCreateChatbot
      ? chatbotLimitTooltip
      : null;

  if (tooltipText) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{button}</span>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

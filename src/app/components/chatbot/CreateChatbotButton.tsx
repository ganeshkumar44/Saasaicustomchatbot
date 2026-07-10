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
  'px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed';

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
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        showIcon && <Plus className="w-5 h-5" />
      )}
      {label}
    </button>
  );

  if (hasDraft && chatbotResumeDraftTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{button}</span>
        </TooltipTrigger>
        <TooltipContent>{chatbotResumeDraftTooltip}</TooltipContent>
      </Tooltip>
    );
  }

  if (!canCreateChatbot && !hasDraft && chatbotLimitTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{button}</span>
        </TooltipTrigger>
        <TooltipContent>
          {chatbotLimitTooltip} If you have an unfinished draft, click to continue it.
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

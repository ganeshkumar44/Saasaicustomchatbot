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
}

const defaultClassName =
  'px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed';

export function CreateChatbotButton({
  onClick,
  loading = false,
  className = defaultClassName,
  children = 'Create Chatbot',
  showIcon = true,
}: CreateChatbotButtonProps) {
  const { canCreateChatbot, chatbotLimitTooltip } = useUserPlan();
  const isDisabled = loading || !canCreateChatbot;

  const button = (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={className}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        showIcon && <Plus className="w-5 h-5" />
      )}
      {children}
    </button>
  );

  if (!canCreateChatbot && chatbotLimitTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{button}</span>
        </TooltipTrigger>
        <TooltipContent>{chatbotLimitTooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

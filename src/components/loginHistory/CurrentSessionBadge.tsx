interface CurrentSessionBadgeProps {
  className?: string;
}

export function CurrentSessionBadge({ className = '' }: CurrentSessionBadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400 ${className}`}
    >
      Current Session
    </span>
  );
}

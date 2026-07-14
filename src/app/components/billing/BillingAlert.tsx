interface BillingAlertProps {
  variant?: 'info' | 'success' | 'warning';
  title: string;
  description: string;
}

export function BillingAlert({
  variant = 'info',
  title,
  description,
}: BillingAlertProps) {
  const styles =
    variant === 'success'
      ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300'
      : variant === 'warning'
        ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
        : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300';

  return (
    <div className={`rounded-xl border px-4 py-3 ${styles}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-sm mt-1 opacity-90">{description}</p>
    </div>
  );
}

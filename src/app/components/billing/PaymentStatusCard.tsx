import { CheckCircle2, XCircle, Clock3 } from 'lucide-react';
import { Link } from 'react-router';

export type PaymentStatusVariant = 'success' | 'pending' | 'failed';

interface PaymentStatusCardProps {
  variant: PaymentStatusVariant;
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const VARIANT_STYLES: Record<
  PaymentStatusVariant,
  { icon: typeof CheckCircle2; iconClass: string; ringClass: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-green-600 dark:text-green-400',
    ringClass: 'bg-green-50 dark:bg-green-950/40',
  },
  pending: {
    icon: Clock3,
    iconClass: 'text-amber-600 dark:text-amber-400',
    ringClass: 'bg-amber-50 dark:bg-amber-950/40',
  },
  failed: {
    icon: XCircle,
    iconClass: 'text-red-600 dark:text-red-400',
    ringClass: 'bg-red-50 dark:bg-red-950/40',
  },
};

export function PaymentStatusCard({
  variant,
  title,
  description,
  details = [],
  primaryHref = '/dashboard/billing',
  primaryLabel = 'Back to Billing',
  secondaryHref,
  secondaryLabel,
}: PaymentStatusCardProps) {
  const style = VARIANT_STYLES[variant];
  const Icon = style.icon;

  return (
    <div className="max-w-lg w-full mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6 sm:p-8">
      <div className={`mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center ${style.ringClass}`}>
        <Icon className={`w-8 h-8 ${style.iconClass}`} />
      </div>
      <h1 className="text-2xl font-bold text-center dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {details.length > 0 ? (
        <dl className="mt-6 space-y-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 px-4 py-4">
          {details.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="flex justify-between gap-4 text-sm"
            >
              <dt className="text-gray-500 dark:text-gray-400">{item.label}</dt>
              <dd className="font-medium text-right break-all dark:text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          to={primaryHref}
          className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-[#003A96] text-white hover:bg-[#002d75]"
        >
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link
            to={secondaryHref}
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

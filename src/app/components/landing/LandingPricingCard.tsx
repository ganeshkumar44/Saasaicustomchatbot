import { Check } from 'lucide-react';
import { LandingButton } from '@/app/components/landing/LandingButton';
import type { LandingPlan } from '@/types/landing.types';

interface LandingPricingCardProps {
  plan: LandingPlan;
}

export function LandingPricingCard({ plan }: LandingPricingCardProps) {
  const to = plan.id === 'plan-enterprise' ? '#contact' : '/register';

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-6 bg-white shadow-sm transition-shadow hover:shadow-lg ${
        plan.recommended
          ? 'border-[#2563EB] ring-1 ring-[#2563EB]/30 shadow-blue-500/10'
          : 'border-slate-200'
      }`}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      ) : null}

      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
      <p className="mt-5 text-sm font-medium text-slate-500">
        Pricing available after sign-up
      </p>

      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map((feature) => (
          <li key={`${plan.id}-${feature}`} className="flex items-start gap-2 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {to.startsWith('#') ? (
        <LandingButton
          href={to}
          variant={plan.recommended ? 'primary' : 'outline'}
          className="mt-8 w-full"
        >
          {plan.ctaLabel}
        </LandingButton>
      ) : (
        <LandingButton
          to={to}
          variant={plan.recommended ? 'primary' : 'outline'}
          className="mt-8 w-full"
        >
          {plan.ctaLabel}
        </LandingButton>
      )}
    </article>
  );
}

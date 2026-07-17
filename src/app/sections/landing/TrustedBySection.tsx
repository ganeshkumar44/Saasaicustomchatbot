import {
  BriefcaseBusiness,
  CloudCog,
  GraduationCap,
  HeartPulse,
  Rocket,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { LANDING_AUDIENCES } from '@/constants/landing';

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  BriefcaseBusiness,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  CloudCog,
};

export function TrustedBySection() {
  return (
    <section
      className="relative overflow-hidden py-16 border-y border-blue-100/70 bg-gradient-to-br from-blue-50/80 via-white to-violet-50/70"
      aria-labelledby="perfect-for-heading"
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(37,99,235,0.18) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />
      <div
        className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-200/35 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-violet-200/35 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p
            id="perfect-for-heading"
            className="text-center text-lg font-semibold uppercase tracking-[0.18em] text-[#2563EB]"
          >
            Perfect for
          </p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LANDING_AUDIENCES.map((audience) => {
              const Icon = ICON_MAP[audience.icon] ?? Rocket;
              return (
                <li
                  key={audience.id}
                  className="group flex items-start gap-4 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-blue-200 hover:bg-white/95 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">
                      {audience.name}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                      {audience.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

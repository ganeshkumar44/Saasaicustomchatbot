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
    <section className="py-16 border-y border-slate-100 bg-white" aria-labelledby="perfect-for-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
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

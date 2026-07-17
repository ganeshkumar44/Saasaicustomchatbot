import { Reveal } from '@/app/components/landing/Reveal';
import { LANDING_LOGOS } from '@/constants/landing';

export function TrustedBySection() {
  return (
    <section className="py-12 border-y border-slate-100 bg-white" aria-labelledby="trusted-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p id="trusted-heading" className="text-center text-sm font-medium text-slate-500">
            Trusted by teams building modern customer experiences
          </p>
          <p className="mt-1 text-center text-xs text-slate-400">
            Logo placeholders for demonstration
          </p>
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {LANDING_LOGOS.map((logo) => (
              <li
                key={logo.id}
                className="flex h-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold tracking-wide text-slate-500"
              >
                {logo.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

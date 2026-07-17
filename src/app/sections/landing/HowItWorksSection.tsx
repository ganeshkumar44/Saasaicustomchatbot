import { ArrowDown } from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_STEPS } from '@/constants/landing';

export function HowItWorksSection() {
  return (
    <section id="solutions" className="py-20 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From blank slate to live chatbot"
            description="A clear five-step flow that gets your AI assistant answering visitors quickly."
          />
        </Reveal>

        <ol className="mt-14 max-w-3xl mx-auto space-y-4">
          {LANDING_STEPS.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.05}>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white text-sm font-bold">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              </Reveal>
              {index < LANDING_STEPS.length - 1 ? (
                <div className="flex justify-center py-2 text-slate-300" aria-hidden>
                  <ArrowDown className="h-5 w-5" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm font-semibold text-[#2563EB]">
            Start answering visitors
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowRight, Clock3, Code2, Headphones, PlayCircle } from 'lucide-react';
import { LandingButton } from '@/app/components/landing/LandingButton';
import { HeroMockup } from '@/app/components/landing/HeroMockup';
import { Reveal } from '@/app/components/landing/Reveal';
import { LANDING_TAGLINE } from '@/constants/landing';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-10 sm:pt-16 sm:pb-28">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" aria-hidden />
      <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
              {LANDING_TAGLINE}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl xl:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Build{' '}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                AI Chatbots
              </span>{' '}
              for Any Website in Minutes
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Train intelligent assistants on your documents and website content, embed a
              branded widget anywhere, and deliver always-on support that feels human —
              without hiring a larger team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <LandingButton to="/register" variant="primary">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </LandingButton>
              <LandingButton href="#contact" variant="outline">
                <PlayCircle className="h-4 w-4" />
                Book Demo
              </LandingButton>
            </div>
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
              {[
                {
                  label: 'Setup time',
                  value: '< 10 min',
                  icon: Clock3,
                  color: 'bg-blue-100 text-blue-600',
                },
                {
                  label: 'Always available',
                  value: '24/7 AI',
                  icon: Headphones,
                  color: 'bg-violet-100 text-violet-600',
                },
                {
                  label: 'Easy install',
                  value: '1 snippet',
                  icon: Code2,
                  color: 'bg-cyan-100 text-cyan-600',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group rounded-2xl border border-white/80 bg-white/75 p-3.5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>
                  <dt className="mt-3 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-base font-bold text-slate-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <HeroMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

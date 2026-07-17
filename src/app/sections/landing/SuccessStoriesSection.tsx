import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';

const STORIES = [
  {
    metric: '62%',
    label: 'Fewer repetitive tickets',
    detail: 'Support teams deflect FAQ volume with grounded AI answers.',
  },
  {
    metric: '3×',
    label: 'Faster first response',
    detail: 'Visitors get help instantly instead of waiting in a queue.',
  },
  {
    metric: '24/7',
    label: 'Always-on coverage',
    detail: 'Keep your website helpful after hours and across time zones.',
  },
] as const;

export function SuccessStoriesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Customer success"
            title="Outcomes teams care about"
            description="Illustrative success metrics. Swap in verified customer results when available."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {STORIES.map((story, index) => (
            <Reveal key={story.label} delay={index * 0.06}>
              <article className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/60 p-6">
                <p className="text-4xl font-bold text-[#2563EB]">{story.metric}</p>
                <h3 className="mt-3 font-semibold text-slate-900">{story.label}</h3>
                <p className="mt-2 text-sm text-slate-600">{story.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

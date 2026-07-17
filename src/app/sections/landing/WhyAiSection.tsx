import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';

const REASONS = [
  {
    title: 'Reduce repetitive tickets',
    description: 'Answer common questions instantly so agents focus on complex work.',
  },
  {
    title: 'Convert more visitors',
    description: 'Guide prospects through product questions before they bounce.',
  },
  {
    title: 'Scale without headcount',
    description: 'Support traffic spikes without expanding your support roster overnight.',
  },
] as const;

export function WhyAiSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why AI chatbots?"
            title="Meet customers where they already are"
            description="Modern buyers expect instant answers. An AI chatbot keeps your website helpful every hour of the day."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06}>
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{reason.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

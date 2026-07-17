import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_INTEGRATIONS } from '@/constants/landing';

export function IntegrationsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Integrations"
            title="Fits the websites you already run"
            description="Deploy on marketing sites, docs portals, and product apps without rebuilding your stack."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LANDING_INTEGRATIONS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_API_SNIPPET, LANDING_EMBED_SNIPPET } from '@/constants/landing';

export function DevelopersSection() {
  return (
    <section id="developers" className="py-20 sm:py-24 bg-slate-950 text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Developer friendly"
            title="API-ready and embed-first"
            description="Ship quickly with a one-line widget, then extend with authenticated REST APIs when you need deeper control."
            tone="dark"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-cyan-300">Embed example</h3>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/40 p-4 text-xs leading-relaxed text-slate-200">
                <code>{LANDING_EMBED_SNIPPET}</code>
              </pre>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold text-violet-300">API example</h3>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/40 p-4 text-xs leading-relaxed text-slate-200">
                <code>{LANDING_API_SNIPPET}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

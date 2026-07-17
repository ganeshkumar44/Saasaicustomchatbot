import {
  BookOpen,
  Brain,
  Cpu,
  FileCode2,
  MessagesSquare,
  Search,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_CAPABILITIES } from '@/constants/landing';

const ICON_MAP: Record<string, LucideIcon> = {
  MessagesSquare,
  FileCode2,
  Brain,
  Zap,
  Cpu,
  Search,
  Wand2,
  BookOpen,
};

export function AiCapabilitiesSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="AI capabilities"
            title="Built for natural, grounded conversations"
            description="Multi-model flexibility, vector search, and smart prompting help your chatbot answer with speed and accuracy."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LANDING_CAPABILITIES.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <Reveal key={item.id} delay={Math.min(index * 0.04, 0.2)}>
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-5">
                  <Icon className="h-5 w-5 text-[#7C3AED]" />
                  <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['Gemini', 'GPT', 'Claude', 'Llama'].map((model) => (
              <span
                key={model}
                className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
              >
                {model}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

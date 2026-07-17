import {
  BarChart3,
  Clock,
  Code2,
  Database,
  FileText,
  Globe,
  Languages,
  MessageSquare,
  Palette,
  Shield,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_FEATURES } from '@/constants/landing';

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Globe,
  MessageSquare,
  Languages,
  UserPlus,
  BarChart3,
  Palette,
  Code2,
  Shield,
  Database,
  Sparkles,
  Clock,
};

const ICON_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-violet-50 text-violet-600',
  'bg-cyan-50 text-cyan-600',
  'bg-emerald-50 text-emerald-600',
  'bg-amber-50 text-amber-600',
  'bg-rose-50 text-rose-600',
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to launch AI support"
            description="From knowledge training to analytics and branded embeds — a complete chatbot platform for modern websites."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LANDING_FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon] ?? Sparkles;
            const iconColor = ICON_COLORS[index % ICON_COLORS.length];
            return (
              <Reveal key={feature.id} delay={Math.min(index * 0.04, 0.24)}>
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

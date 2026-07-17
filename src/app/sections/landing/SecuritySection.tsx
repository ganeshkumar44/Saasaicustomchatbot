import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';

const ITEMS = [
  {
    icon: Lock,
    title: 'Authenticated access',
    description: 'Dashboard actions require signed-in users with protected API routes.',
  },
  {
    icon: KeyRound,
    title: 'Secure embed keys',
    description: 'Public keys isolate widget traffic from privileged account operations.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware controls',
    description: 'Admins and owners manage chatbots according to existing permission rules.',
  },
] as const;

export function SecuritySection() {
  return (
    <section id="security" className="py-20 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Security"
            title="Designed with practical safeguards"
            description="Protect operator access while keeping the website widget easy to deploy."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="rounded-3xl border border-slate-200 bg-white p-6">
                <item.icon className="h-5 w-5 text-[#2563EB]" />
                <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

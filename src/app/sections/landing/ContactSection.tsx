import { Mail, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/app/components/landing/ContactForm';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Book a demo or talk to us"
              description="Tell us about your website, support volume, and goals. We’ll follow up with next steps."
            />
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <Mail className="mt-0.5 h-4 w-4 text-[#2563EB]" />
                Prefer email? Reach us at hello@nexgenchat.com
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MessageCircle className="mt-0.5 h-4 w-4 text-[#7C3AED]" />
                Demo requests usually receive a response within one business day.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

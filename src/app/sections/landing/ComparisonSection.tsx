import { Check, X } from 'lucide-react';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_COMPARISON } from '@/constants/landing';

export function ComparisonSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose NexGenChat"
            title="Traditional chatbots vs NexGenChat"
            description="Replace brittle rule trees with grounded AI that understands your content."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">Capability</th>
                  <th className="px-5 py-4 font-semibold">Traditional Chatbot</th>
                  <th className="px-5 py-4 font-semibold text-[#2563EB]">NexGenChat</th>
                </tr>
              </thead>
              <tbody>
                {LANDING_COMPARISON.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-5 py-4 text-slate-500">
                      <span className="inline-flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-800">
                      <span className="inline-flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {row.nexgen}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

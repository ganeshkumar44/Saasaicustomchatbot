import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_TESTIMONIALS } from '@/constants/landing';

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by product and support teams"
            description="Sample stories for demonstration. Replace with customer quotes when approved."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {LANDING_TESTIMONIALS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <figure className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-sm font-bold text-white"
                    aria-hidden
                  >
                    {item.initials}
                  </div>
                  <div>
                    <figcaption className="font-semibold text-slate-900">{item.name}</figcaption>
                    <p className="text-xs text-slate-500">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4 text-sm text-slate-600 leading-relaxed">
                  “{item.quote}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

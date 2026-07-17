import { Reveal } from '@/app/components/landing/Reveal';
import { LandingPricingCard } from '@/app/components/landing/LandingPricingCard';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_PLANS } from '@/constants/landing';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Plans that grow with your team"
            description="Explore Free, Starter, Professional, and Enterprise. Pricing details unlock after you create an account."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {LANDING_PLANS.map((plan, index) => (
            <Reveal key={plan.id} delay={Math.min(index * 0.05, 0.2)}>
              <LandingPricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

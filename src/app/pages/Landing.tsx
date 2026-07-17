import { useEffect } from 'react';
import { LandingFooter } from '@/app/components/landing/LandingFooter';
import { LandingHeader } from '@/app/components/landing/LandingHeader';
import { AiCapabilitiesSection } from '@/app/sections/landing/AiCapabilitiesSection';
import { ComparisonSection } from '@/app/sections/landing/ComparisonSection';
import { ContactSection } from '@/app/sections/landing/ContactSection';
import { DashboardPreviewSection } from '@/app/sections/landing/DashboardPreviewSection';
import { DevelopersSection } from '@/app/sections/landing/DevelopersSection';
import { FaqSection } from '@/app/sections/landing/FaqSection';
import { FeaturesSection } from '@/app/sections/landing/FeaturesSection';
import { FinalCtaSection } from '@/app/sections/landing/FinalCtaSection';
import { HeroSection } from '@/app/sections/landing/HeroSection';
import { HowItWorksSection } from '@/app/sections/landing/HowItWorksSection';
import { IntegrationsSection } from '@/app/sections/landing/IntegrationsSection';
import { PricingSection } from '@/app/sections/landing/PricingSection';
import { SecuritySection } from '@/app/sections/landing/SecuritySection';
import { SuccessStoriesSection } from '@/app/sections/landing/SuccessStoriesSection';
import { TestimonialsSection } from '@/app/sections/landing/TestimonialsSection';
import { TrustedBySection } from '@/app/sections/landing/TrustedBySection';
import { WhyAiSection } from '@/app/sections/landing/WhyAiSection';
import { usePageSeo } from '@/hooks/usePageSeo';
import {
  LANDING_PRODUCT_NAME,
  LANDING_TAGLINE,
} from '@/constants/landing';

export function Landing() {
  usePageSeo({
    title: `${LANDING_PRODUCT_NAME} | ${LANDING_TAGLINE}`,
    description:
      'Build AI chatbots for any website in minutes. Train on PDFs and site content, embed a branded widget, and deliver 24/7 support with NexGenChat.',
  });

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <LandingHeader />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardPreviewSection />
        <AiCapabilitiesSection />
        <WhyAiSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <ComparisonSection />
        <PricingSection />
        <SuccessStoriesSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
}

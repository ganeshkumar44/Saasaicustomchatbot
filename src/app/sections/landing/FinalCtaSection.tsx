import { ArrowRight } from 'lucide-react';
import { LandingButton } from '@/app/components/landing/LandingButton';
import { Reveal } from '@/app/components/landing/Reveal';

export function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2563EB] via-[#3b5bdb] to-[#7C3AED] px-6 py-14 sm:px-12 text-center text-white shadow-2xl">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 0%, white 0, transparent 30%)',
            }} aria-hidden />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to build your AI chatbot?
              </h2>
              <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                Start free today, train on your content, and embed a branded assistant on any website.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <LandingButton
                  to="/register"
                  className="bg-white text-[#2563EB] hover:bg-blue-50 shadow-none"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </LandingButton>
                <LandingButton
                  href="#contact"
                  className="border border-white/40 bg-transparent text-white hover:bg-white/10 shadow-none"
                >
                  Book Demo
                </LandingButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

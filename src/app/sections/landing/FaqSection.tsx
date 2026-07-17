import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Reveal } from '@/app/components/landing/Reveal';
import { SectionHeading } from '@/app/components/landing/SectionHeading';
import { LANDING_FAQS } from '@/constants/landing';

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common questions"
            description="Everything you need to know before launching your first AI chatbot."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10 rounded-3xl border border-slate-200 bg-white px-5 shadow-sm">
            {LANDING_FAQS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-sm sm:text-base text-slate-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

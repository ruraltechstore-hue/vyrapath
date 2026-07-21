import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/data/site";
import { JsonLd } from "./JsonLd";
import { faqPageSchema } from "@/lib/structured-data";

type FaqSectionProps = {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
  includeSchema?: boolean;
};

export function FaqSection({
  title = "Frequently asked questions",
  subtitle,
  faqs,
  includeSchema = true,
}: FaqSectionProps) {
  return (
    <section className="section-y bg-surface">
      {includeSchema && <JsonLd data={faqPageSchema(faqs)} />}
      <div className="container-page max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

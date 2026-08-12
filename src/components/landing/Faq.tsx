import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  { q: "Will reminders annoy my clients?", a: "You set the tone and cadence, and chasing stops the second an invoice is paid." },
  { q: "Which channels does it use?", a: "Email, WhatsApp and SMS — any combination, per client." },
  { q: "How do clients pay?", a: "Every reminder carries a pay link: UPI and Razorpay in India, Stripe and PayPal globally." },
  { q: "Does it handle GST?", a: "Yes, plus sales tax and VAT-style rates elsewhere." },
  { q: "What does it cost during beta?", a: "Free. No card required." },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-border section-y">
      <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <h2 id="faq-heading" className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Questions, answered.
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-5 text-left text-base tracking-tight hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

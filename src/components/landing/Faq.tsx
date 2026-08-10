import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  { q: "Will reminders annoy my clients?", a: "Tone and frequency are yours to set, and chasing stops the second an invoice is paid." },
  { q: "Which channels does it use?", a: "Email, WhatsApp and SMS. Pick any combination per client." },
  { q: "How do clients pay?", a: "A pay link on every reminder — UPI and Razorpay in India, Stripe and PayPal globally." },
  { q: "Does it handle GST?", a: "Yes. GST for India, sales tax and VAT-style rates elsewhere." },
  { q: "What does it cost during beta?", a: "Free while we're in private beta. No card required." },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-b border-border py-24 sm:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <h2 id="faq-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left text-base tracking-tight hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

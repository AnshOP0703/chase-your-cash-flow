import { cn } from "@/lib/utils";
import { useInView, useCountUp } from "./usePointer";
import { MagneticCta } from "./MagneticCta";

const plans = [
  { name: "Free", price: 0, blurb: "For your first few invoices.", features: ["3 invoices / month", "Email reminders"] },
  { name: "Pro", price: 799, blurb: "For freelancers and consultants.", features: ["Unlimited invoices", "Email, WhatsApp & SMS", "Client payment scores"], featured: true },
  { name: "Business", price: 1999, blurb: "For agencies and teams.", features: ["Everything in Pro", "5 team members", "Recurring invoices"] },
];

function Price({ amount, start }: { amount: number; start: boolean }) {
  const v = useCountUp(amount, start, 900);
  return <span className="num">₹{v.toLocaleString("en-IN")}</span>;
}

export function Pricing() {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2 id="pricing-heading" className="max-w-lg text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          Simple pricing.
          <span className="block text-muted-foreground">Less chasing.</span>
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                "group rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:card-lift",
                p.featured
                  ? "border-foreground/15 bg-surface card-lift"
                  : "border-border bg-surface-2 hover:border-foreground/15 hover:bg-surface",
              )}
              style={{ animation: inView ? `slide-in-up 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both` : undefined }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium tracking-tight">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-soft px-2.5 py-1 text-[0.7rem] text-deep">Most popular</span>
                )}
              </div>
              <p className="mt-6 text-4xl font-semibold tracking-[-0.03em]">
                <Price amount={p.price} start={inView} />
                <span className="ml-1 text-sm font-normal text-muted-foreground">/ month</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-7 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted-foreground">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticCta
                  href="#early-access"
                  size="sm"
                  variant={p.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  Get early access
                </MagneticCta>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Free", price: "₹0", note: "3 invoices / month", points: ["Email reminders", "1 client"] },
  {
    name: "Pro",
    price: "₹799",
    suffix: "/mo",
    note: "Unlimited invoices",
    points: ["Email + WhatsApp + SMS", "Custom chase schedules", "Client payment scores"],
    featured: true,
  },
  { name: "Business", price: "₹1,999", suffix: "/mo", note: "For teams", points: ["5 seats", "Recurring invoices", "Priority support"] },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 border-b border-border py-24 sm:py-32">
      <div className="container-page">
        <h2 id="pricing-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Simple pricing. <span className="text-muted-foreground">Less chasing.</span>
        </h2>
        <ul className="mt-14 grid items-center gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <li
              key={p.name}
              className={cn(
                "rounded-xl border p-7 transition-colors",
                p.featured
                  ? "border-primary/60 bg-surface md:scale-[1.04] md:py-10"
                  : "border-border bg-background hover:bg-surface",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{p.name}</p>
                {p.featured && (
                  <span className="rounded bg-primary px-2 py-0.5 text-[0.7rem] font-semibold text-primary-foreground">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight tabular-nums">
                {p.price}
                {p.suffix && <span className="text-base font-normal text-muted-foreground">{p.suffix}</span>}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <Check aria-hidden="true" strokeWidth={2} className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#early-access"
                className={cn(
                  "mt-8 flex h-11 items-center justify-center rounded-md text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  p.featured
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border hover:border-foreground/40",
                )}
              >
                Get early access
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

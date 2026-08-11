import { useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";

const stages = [
  {
    n: "01",
    title: "Send",
    copy: "Create your invoice.",
    render: (on: boolean) => (
      <div className="space-y-2.5">
        {["Client", "Amount", "Due date"].map((f, i) => (
          <div
            key={f}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-xs transition-all duration-500"
            style={{ transitionDelay: `${i * 90}ms`, opacity: on ? 1 : 0.45, transform: on ? "none" : "translateY(6px)" }}
          >
            <span className="text-muted-foreground">{f}</span>
            <span className={cn("num font-medium", i === 1 && "text-foreground")}>
              {["Northline Creative", "₹48,000", "14 March"][i]}
            </span>
          </div>
        ))}
        <div
          className={cn(
            "mt-3 rounded-lg bg-foreground px-3 py-2.5 text-center text-xs font-medium text-background transition-all duration-500",
            on ? "opacity-100" : "translate-y-1 opacity-40",
          )}
        >
          Send invoice
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "Chase",
    copy: "Tagada follows up automatically.",
    render: (on: boolean) => (
      <div className="space-y-2.5">
        {[
          { c: "Email", t: "Day 7" },
          { c: "WhatsApp", t: "Day 14" },
          { c: "SMS", t: "Day 21" },
        ].map((m, i) => (
          <div
            key={m.c}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-3 text-xs transition-all duration-700"
            style={{
              transitionDelay: `${i * 220}ms`,
              opacity: on ? 1 : 0.3,
              transform: on ? "none" : "translateX(-8px)",
            }}
          >
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="flex-1 font-medium">{m.c} reminder</span>
            <span className="num text-muted-foreground">{m.t}</span>
          </div>
        ))}
        <p className="pt-1 text-[0.7rem] text-muted-foreground">Tone and cadence are yours to set.</p>
      </div>
    ),
  },
  {
    n: "03",
    title: "Get paid",
    copy: "The moment payment arrives, everything stops.",
    render: (on: boolean) => (
      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="eyebrow">Invoice #0042</p>
        <p className={cn("num mt-3 text-3xl font-semibold transition-colors duration-700", on ? "text-primary" : "text-foreground")}>
          ₹48,000
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="grid size-5 place-items-center rounded-full bg-soft text-deep">
            {on && (
              <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
                <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-30")}>
            Paid · Reminders stopped
          </span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="how-heading"
      className="scroll-mt-20 border-t border-border py-24 sm:py-36"
    >
      <div className="container-page">
        <h2 id="how-heading" className="max-w-xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          Three steps.
          <span className="block text-muted-foreground">Then you&rsquo;re done.</span>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => {
            const on = inView && (hover === null || hover === i);
            return (
              <div
                key={s.n}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "group rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-500 sm:p-7",
                  hover === i ? "-translate-y-1 border-foreground/15 bg-surface card-lift" : "card-soft",
                )}
                style={{ animation: inView ? `slide-in-up 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both` : undefined }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="num text-xs text-muted-foreground">{s.n}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-2 min-h-[2.5rem] text-sm text-muted-foreground">{s.copy}</p>
                <div className="mt-6">{s.render(on)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

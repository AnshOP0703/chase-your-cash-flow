import { useState } from "react";
import { cn } from "@/lib/utils";

function SendUI({ live }: { live: boolean }) {
  return (
    <div className="space-y-2 text-xs">
      {["Design retainer — March", "Line item · ₹40,000", "GST 18% · ₹8,000"].map((r, i) => (
        <div
          key={r}
          className={cn(
            "flex items-center justify-between rounded border border-border bg-surface-2 px-3 py-2 transition-all duration-300",
            live && "translate-x-0",
          )}
          style={{ transitionDelay: `${i * 60}ms`, opacity: live ? 1 : 0.55 }}
        >
          <span className="text-muted-foreground">{r}</span>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1">
        <span className="text-muted-foreground">Total</span>
        <span className="font-semibold tabular-nums">₹48,000</span>
      </div>
      <div
        className={cn(
          "mt-2 rounded bg-primary py-2 text-center text-xs font-semibold text-primary-foreground transition-transform duration-300",
          live && "-translate-y-0.5",
        )}
      >
        Send invoice
      </div>
    </div>
  );
}

function ChaseUI({ live }: { live: boolean }) {
  const rows = [
    { d: "Day 7", t: "Gentle reminder" },
    { d: "Day 14", t: "WhatsApp nudge" },
    { d: "Day 21", t: "Firm follow-up" },
  ];
  return (
    <div className="space-y-3 text-xs">
      {rows.map((r, i) => (
        <div key={r.d} className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-muted-foreground tabular-nums">{r.d}</span>
          <span className="relative h-px flex-1 bg-border">
            <span
              className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-700 ease-out"
              style={{ width: live ? "100%" : "0%", transitionDelay: `${i * 140}ms` }}
            />
          </span>
          <span className="w-28 shrink-0 text-right text-muted-foreground">{r.t}</span>
        </div>
      ))}
      <p className="pt-2 text-muted-foreground">Auto-stops the moment it's paid.</p>
    </div>
  );
}

function PaidUI({ live }: { live: boolean }) {
  return (
    <div className="text-xs">
      <div
        className={cn(
          "rounded border border-border bg-surface-2 p-4 transition-all duration-500",
          live ? "translate-y-0 opacity-100" : "translate-y-1 opacity-70",
        )}
      >
        <p className="text-muted-foreground">Payment received</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">₹48,000</p>
        <p className="mt-1 text-muted-foreground">Northline Creative · Invoice #0042</p>
        <span className="mt-3 inline-block rounded bg-success px-2 py-0.5 text-[0.7rem] font-semibold text-success-foreground">
          PAID
        </span>
      </div>
      <p className="mt-3 text-muted-foreground">Reconciled automatically. Chasing stops.</p>
    </div>
  );
}

const steps = [
  { n: "01", title: "Send", line: "Create and send an invoice.", UI: SendUI },
  { n: "02", title: "Chase", line: "Tagada follows up automatically.", UI: ChaseUI },
  { n: "03", title: "Get paid", line: "Payment lands. Chasing stops.", UI: PaidUI },
];

export function HowItWorks() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 border-b border-border py-24 sm:py-32">
      <div className="container-page">
        <h2 id="how-heading" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Three steps. Then you're done.
        </h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "group flex flex-col bg-background p-7 transition-colors duration-300",
                hover === i && "bg-surface",
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.line}</p>
              <div className="mt-8 flex-1">
                <s.UI live={hover === i} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

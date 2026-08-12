import { useState } from "react";
import { cn } from "@/lib/utils";
import { INVOICE } from "./story";

const points = [40, 32, 46, 30, 52, 36, 58, 44, 66, 50, 74, 62];

const systems = [
  {
    id: "Invoicing",
    line: "Recurring invoices create and send themselves.",
    render: () => (
      <div className="w-full max-w-xs space-y-2.5">
        {["#0042", "#0043", "#0044"].map((n, i) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm"
            style={{ animation: `chip-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms both` }}
          >
            <span className="num text-muted-foreground">{n}</span>
            <span className="num font-medium">{INVOICE.amount}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "Collections",
    line: "Email, WhatsApp and SMS, on your cadence.",
    render: () => (
      <div className="w-full max-w-sm space-y-2.5">
        {[
          ["Email", "Day 7"],
          ["WhatsApp", "Day 14"],
          ["SMS", "Day 21"],
        ].map(([c, d], i) => (
          <div
            key={c}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm"
            style={{ animation: `chip-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms both` }}
          >
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="flex-1">{c} reminder</span>
            <span className="num text-xs text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "Reconciliation",
    line: "Payments match themselves to the right invoice.",
    render: () => (
      <div className="flex w-full max-w-sm flex-col items-center gap-5">
        <div className="flex w-full items-center gap-3 text-sm">
          <span
            className="num flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-center font-medium"
            style={{ animation: "chip-in 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {INVOICE.amount}
          </span>
          <span className="h-px flex-1 bg-primary" style={{ animation: "chip-in 0.7s 0.2s both" }} />
          <span
            className="num flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-center font-medium"
            style={{ animation: "chip-in 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            {INVOICE.number}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-2 rounded-full bg-soft px-3.5 py-1.5 text-xs text-deep"
          style={{ animation: "chip-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}
        >
          <svg viewBox="0 0 24 24" className="draw-check size-3" fill="none" aria-hidden="true">
            <path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Matched
        </span>
      </div>
    ),
  },
  {
    id: "Client memory",
    line: "Tagada remembers how each client behaves.",
    render: () => (
      <div className="w-full max-w-sm space-y-2.5 text-sm">
        {["Pays after 2 reminders", "Prefers WhatsApp", "Never pays on a Friday"].map((t, i) => (
          <p
            key={t}
            className="rounded-lg border border-border bg-surface px-4 py-3 text-muted-foreground"
            style={{ animation: `chip-in 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 150}ms both` }}
          >
            {t}
          </p>
        ))}
      </div>
    ),
  },
  {
    id: "Cash flow",
    line: "See what lands, and when.",
    render: () => (
      <svg viewBox="0 0 300 90" className="h-[110px] w-full max-w-sm" fill="none" aria-hidden="true">
        <path
          d={points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 294 + 3} ${86 - p * 1.05}`).join(" ")}
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray: 420, animation: "draw-line 1.3s cubic-bezier(0.16,1,0.3,1) both" }}
        />
      </svg>
    ),
  },
];

export function Features() {
  const [i, setI] = useState(0);
  const activeSystem = systems[i]!;

  return (
    <section aria-labelledby="features-heading" className="border-t border-border section-y">
      <div className="container-page">
        <h2 id="features-heading" className="max-w-xl text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
          The boring part
          <span className="block font-normal text-muted-foreground">happens automatically.</span>
        </h2>

        <div className="mt-12 grid gap-6 overflow-hidden rounded-2xl border border-border bg-surface-2 lg:grid-cols-[0.8fr_1.2fr] lg:gap-0">
          <ul className="divide-y divide-border border-b border-border lg:border-r lg:border-b-0">
            {systems.map((s, n) => (
              <li key={s.id}>
                <button
                  type="button"
                  onMouseEnter={() => setI(n)}
                  onFocus={() => setI(n)}
                  onClick={() => setI(n)}
                  aria-pressed={i === n}
                  className={cn(
                    "w-full px-6 py-5 text-left transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    i === n ? "bg-surface" : "hover:bg-surface/60",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium tracking-tight transition-colors",
                      i === n ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.id}
                  </span>
                  <span
                    className={cn(
                      "block text-sm text-muted-foreground transition-all duration-500",
                      i === n ? "mt-1 max-h-10 opacity-100" : "max-h-0 overflow-hidden opacity-0",
                    )}
                  >
                    {s.line}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div key={activeSystem.id} className="grid min-h-[300px] place-items-center bg-surface p-8">
            {activeSystem.render()}
          </div>
        </div>
      </div>
    </section>
  );
}

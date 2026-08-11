import { useState } from "react";
import { cn } from "@/lib/utils";

const points = [40, 32, 46, 30, 52, 36, 58, 44, 66, 50, 74, 62];

const features = [
  {
    title: "Automatic invoicing",
    copy: "Recurring invoices generate and send themselves.",
    render: (on: boolean) => (
      <div className="space-y-2">
        {["#0042", "#0043", "#0044"].map((n, i) => (
          <div
            key={n}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-xs transition-all duration-500"
            style={{ transitionDelay: `${i * 120}ms`, opacity: on ? 1 : 0.35, transform: on ? "none" : "translateY(8px)" }}
          >
            <span className="num text-muted-foreground">{n}</span>
            <span className="num font-medium">₹48,000</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Auto-reconciliation",
    copy: "Payments match themselves to the right invoice.",
    render: (on: boolean) => (
      <div className="flex items-center gap-3 text-xs">
        <span className="num rounded-lg border border-border bg-surface px-3 py-2 font-medium">₹48,000</span>
        <span
          className={cn("h-px flex-1 transition-all duration-700", on ? "bg-primary" : "bg-border")}
        />
        <span className={cn("num rounded-lg border px-3 py-2 font-medium transition-colors duration-700", on ? "border-transparent bg-soft text-deep" : "border-border bg-surface")}>
          #0042
        </span>
      </div>
    ),
  },
  {
    title: "Client memory",
    copy: "Tagada remembers how each client behaves.",
    render: (on: boolean) => (
      <div className="space-y-2 text-xs">
        {["Pays after 2 reminders", "Prefers WhatsApp", "Never pays on a Friday"].map((t, i) => (
          <p
            key={t}
            className="rounded-lg bg-surface px-3 py-2 text-muted-foreground transition-all duration-500"
            style={{ transitionDelay: `${i * 110}ms`, opacity: on ? 1 : 0.3, transform: on ? "none" : "translateX(-6px)" }}
          >
            {t}
          </p>
        ))}
      </div>
    ),
  },
  {
    title: "Cash flow",
    copy: "See what lands, and when.",
    render: (on: boolean) => (
      <svg viewBox="0 0 220 70" className="h-[70px] w-full" fill="none" aria-hidden="true">
        <path
          d={points.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 216 + 2} ${68 - p * 0.85}`).join(" ")}
          stroke="var(--primary)"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{ strokeDasharray: 320, strokeDashoffset: on ? 0 : 320, transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
    ),
  },
];

export function Features() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section aria-labelledby="features-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page">
        <h2 id="features-heading" className="max-w-lg text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          Quietly doing
          <span className="block text-muted-foreground">the boring part.</span>
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "rounded-2xl border border-border bg-surface-2 p-7 transition-all duration-500",
                hover === i ? "-translate-y-1 border-foreground/15 bg-surface card-lift" : "card-soft",
              )}
            >
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.copy}</p>
              <div className="mt-7">{f.render(hover === i)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

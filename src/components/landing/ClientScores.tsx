import { useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";

const clients = [
  { name: "Northline Creative", days: 3, score: "On time", detail: ["3 day average", "Rarely needs a reminder", "Low payment risk"] },
  { name: "Vertex Labs", days: 9, score: "On time", detail: ["9 day average", "Usually needs 1 reminder", "Low payment risk"] },
  { name: "Patel & Sons", days: 24, score: "Slow", detail: ["24 day average", "Usually needs 2 reminders", "Medium payment risk"] },
  { name: "Mira Interiors", days: 41, score: "Risky", detail: ["41 day average", "Usually needs 3 reminders", "High payment risk"] },
];

export function ClientScores() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} aria-labelledby="scores-heading" className="border-t border-border py-24 sm:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="scores-heading" className="text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
            Know who
            <span className="block text-muted-foreground">pays late.</span>
          </h2>
          <p className="mt-6 max-w-xs text-muted-foreground">Tagada learns how your clients pay.</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 border-b border-border pb-3 text-xs text-muted-foreground">
            <span>Client</span>
            <span className="text-right">Avg. days</span>
            <span className="w-20 text-right">Score</span>
          </div>
          {clients.map((c, i) => (
            <div
              key={c.name}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              className={cn(
                "relative grid cursor-default grid-cols-[1fr_auto_auto] items-center gap-x-6 border-b border-border py-4 transition-colors duration-300",
                open === i ? "bg-surface-2" : "",
              )}
              style={{ animation: inView ? `row-in 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both` : undefined }}
            >
              <span className="text-sm font-medium tracking-tight">{c.name}</span>
              <span className="num text-right text-sm text-muted-foreground">{c.days}</span>
              <span
                className={cn(
                  "w-20 text-right text-xs",
                  c.score === "On time" ? "text-deep" : c.score === "Slow" ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {c.score}
              </span>

              {open === i && (
                <div
                  className="absolute top-1/2 right-0 z-10 hidden w-56 -translate-y-1/2 translate-x-[calc(100%+16px)] rounded-xl border border-border bg-surface p-4 card-lift xl:block"
                  style={{ animation: "slide-in-up 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
                >
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {c.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

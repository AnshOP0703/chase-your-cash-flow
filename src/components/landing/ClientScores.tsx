import { useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./usePointer";
import { INVOICE } from "./story";

const clients = [
  { name: INVOICE.client, days: 3, score: "On time", risk: "Low", reminders: "Rarely needs one", channel: "Email" },
  { name: "Vertex Labs", days: 9, score: "On time", risk: "Low", reminders: "1 reminder", channel: "Email" },
  { name: "Patel & Sons", days: 24, score: "Slow", risk: "Medium", reminders: "2 reminders", channel: "WhatsApp" },
  { name: "Mira Interiors", days: 41, score: "Risky", risk: "High", reminders: "3 reminders", channel: "WhatsApp" },
];

export function ClientScores() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} aria-labelledby="scores-heading" className="border-t border-border section-y">
      <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <h2 id="scores-heading" className="text-3xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem]">
            Know who
            <span className="block font-normal text-muted-foreground">pays late.</span>
          </h2>
          <p className="mt-5 max-w-xs text-muted-foreground">Tagada learns how every client behaves.</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-[1fr_auto_5rem] gap-x-6 border-b border-border pb-3 text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
            <span>Client</span>
            <span className="text-right">Avg. days</span>
            <span className="text-right">Score</span>
          </div>

          {clients.map((c, i) => {
            const on = open === i;
            return (
              <div
                key={c.name}
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(i)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
                className={cn(
                  "relative grid cursor-default grid-cols-[1fr_auto_5rem] items-center gap-x-6 border-b border-border py-4 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  on && "bg-surface-2",
                )}
                style={{ animation: inView ? `row-in 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both` : undefined }}
              >
                <span className="text-sm font-medium tracking-tight">{c.name}</span>
                <span className="num text-right text-sm text-muted-foreground">{c.days}</span>
                <span
                  className={cn(
                    "text-right text-xs",
                    c.score === "On time" ? "text-deep" : c.score === "Slow" ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {c.score}
                </span>

                {/* intelligence panel */}
                <div
                  className={cn(
                    "col-span-3 grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden",
                    on ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-3 gap-3 rounded-xl bg-surface p-4 text-xs">
                      <p>
                        <span className="block text-muted-foreground">Average</span>
                        <span className="num">{c.days} days</span>
                      </p>
                      <p>
                        <span className="block text-muted-foreground">Needs</span>
                        {c.reminders}
                      </p>
                      <p>
                        <span className="block text-muted-foreground">Risk</span>
                        {c.risk}
                      </p>
                    </div>
                  </div>
                </div>

                {on && (
                  <div
                    className="absolute top-1/2 right-0 z-10 hidden w-60 -translate-y-1/2 translate-x-[calc(100%+20px)] rounded-xl border border-border bg-surface p-4 card-lift xl:block"
                    style={{ animation: "slide-in-up 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
                  >
                    <p className="num text-2xl font-semibold">{c.days} days</p>
                    <p className="text-xs text-muted-foreground">average time to pay</p>
                    <dl className="mt-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Usually needs</dt>
                        <dd>{c.reminders}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Best channel</dt>
                        <dd>{c.channel}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Payment risk</dt>
                        <dd className={cn(c.risk === "Low" ? "text-deep" : "text-foreground")}>{c.risk}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
